// Add these new functions to the end of progress.controller.js

/**
 * Start a study session for a section
 */
export const startStudySession = async (req, res) => {
    try {
        const { topicSlug, sectionSlug } = req.body;
        
        let userId;
        if (req.user) {
            userId = req.user._id.toString();
        } else {
            userId = req.headers['x-session-id'] || 'default-user';
        }

        // Find the section
        const section = await Section.findOne({ slug: sectionSlug });
        if (!section) {
            return res.status(404).json({ message: 'Section not found' });
        }

        // Find or create progress
        let progress = await Progress.findOne({ userId, sectionId: section._id });
        
        if (!progress) {
            progress = new Progress({
                userId,
                sectionId: section._id,
                sessionStart: new Date(),
                lastStudiedAt: new Date()
            });
        } else {
            progress.sessionStart = new Date();
            progress.lastStudiedAt = new Date();
        }

        await progress.save();

        res.json({ success: true, sessionStart: progress.sessionStart });
    } catch (error) {
        console.error('Error starting study session:', error);
        res.status(500).json({ message: 'Failed to start session' });
    }
};

/**
 * End a study session and record time spent
 */
export const endStudySession = async (req, res) => {
    try {
        const { topicSlug, sectionSlug, duration } = req.body; // duration in seconds
        
        let userId;
        if (req.user) {
            userId = req.user._id.toString();
        } else {
            userId = req.headers['x-session-id'] || 'default-user';
        }

        // Find the section
        const section = await Section.findOne({ slug: sectionSlug });
        if (!section) {
            return res.status(404).json({ message: 'Section not found' });
        }

        // Find progress
        const progress = await Progress.findOne({ userId, sectionId: section._id });
        
        if (!progress) {
            return res.status(404).json({ message: 'No active session found' });
        }

        // Convert duration from seconds to minutes and add to timeSpent
        const minutesToAdd = Math.ceil(duration / 60);
        progress.timeSpent = (progress.timeSpent || 0) + minutesToAdd;
        progress.lastStudiedAt = new Date();
        progress.sessionStart = null; // Clear the session

        await progress.save();

        res.json({ 
            success: true, 
            totalTimeSpent: progress.timeSpent,
            sessionDuration: minutesToAdd
        });
    } catch (error) {
        console.error('Error ending study session:', error);
        res.status(500).json({ message: 'Failed to end session' });
    }
};

/**
 * Get study time breakdown by topic
 */
export const getStudyTimeByTopic = async (req, res) => {
    try {
        let userId;
        if (req.user) {
            userId = req.user._id.toString();
        } else {
            userId = req.headers['x-session-id'] || req.params.userId || 'default-user';
        }

        // Get all progress records for this user
        const progressRecords = await Progress.find({ userId }).populate('sectionId');

        // Get all topics
        const topics = await Topic.find({});

        // Group time by topic
        const timeByTopic = {};
        
        for (const record of progressRecords) {
            if (!record.sectionId) continue;
            
            const section = await Section.findById(record.sectionId);
            if (!section) continue;

            const topicId = section.topicId.toString();
            
            if (!timeByTopic[topicId]) {
                timeByTopic[topicId] = {
                    totalMinutes: 0,
                    sections: 0
                };
            }
            
            timeByTopic[topicId].totalMinutes += (record.timeSpent || 0);
            timeByTopic[topicId].sections += 1;
        }

        // Format response
        const result = await Promise.all(topics.map(async (topic) => {
            const topicId = topic._id.toString();
            const timeData = timeByTopic[topicId] || { totalMinutes: 0, sections: 0 };
            
            return {
                topicId: topic._id,
                topicSlug: topic.slug,
                topicName: topic.name,
                totalMinutes: timeData.totalMinutes,
                hours: Math.floor(timeData.totalMinutes / 60),
                minutes: timeData.totalMinutes % 60,
                sectionsStudied: timeData.sections
            };
        }));

        // Calculate total time across all topics
        const totalMinutes = Object.values(timeByTopic).reduce((sum, data) => sum + data.totalMinutes, 0);

        res.json({
            topics: result.filter(t => t.totalMinutes > 0), // Only show topics with study time
            total: {
                minutes: totalMinutes,
                hours: Math.floor(totalMinutes / 60),
                formatted: `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`
            }
        });
    } catch (error) {
        console.error('Error getting study time:', error);
        res.status(500).json({ message: 'Failed to get study time' });
    }
};
