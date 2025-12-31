import UserActivity from '../models/userActivity.model.js';
import { updateUserPreferences } from '../services/ranking.service.js';

/**
 * Track user activity
 */
export const trackActivity = async (req, res) => {
    try {
        const { topicSlug, activityType, duration = 0, metadata = {} } = req.body;
        const userId = req.user.id;

        // Validate activity type
        const validTypes = ['view', 'practice', 'complete', 'quiz'];
        if (!validTypes.includes(activityType)) {
            return res.status(400).json({ error: 'Invalid activity type' });
        }

        // Create activity record
        await UserActivity.create({
            userId,
            topicSlug,
            activityType,
            duration,
            metadata,
            timestamp: new Date()
        });

        // Update user preferences asynchronously (don't wait)
        // Ensure immediate feedback for all meaningful interactions
        setImmediate(() => updateUserPreferences(userId));

        res.json({ success: true });
    } catch (error) {
        console.error('Error tracking activity:', error);
        res.status(500).json({ error: 'Failed to track activity' });
    }
};

/**
 * Get user activity summary
 */
export const getActivitySummary = async (req, res) => {
    try {
        const userId = req.user.id;
        const { days = 7 } = req.query;

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - parseInt(days));

        const activities = await UserActivity.find({
            userId,
            timestamp: { $gte: startDate }
        }).sort({ timestamp: -1 });

        const summary = {
            totalActivities: activities.length,
            byType: {},
            topTopics: {},
            totalTimeSpent: 0
        };

        activities.forEach(activity => {
            // Count by type
            summary.byType[activity.activityType] = (summary.byType[activity.activityType] || 0) + 1;

            // Count by topic
            summary.topTopics[activity.topicSlug] = (summary.topTopics[activity.topicSlug] || 0) + 1;

            // Total time
            summary.totalTimeSpent += activity.duration;
        });

        res.json(summary);
    } catch (error) {
        console.error('Error getting activity summary:', error);
        res.status(500).json({ error: 'Failed to get activity summary' });
    }
};

export default {
    trackActivity,
    getActivitySummary
};
