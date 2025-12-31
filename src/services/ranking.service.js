import UserActivity from '../models/userActivity.model.js';
import UserPreferences from '../models/userPreferences.model.js';

/**
 * Calculate personalized topic rankings for a user
 * @param {String} userId - User ID
 * @returns {Object} - Map of topicSlug to score
 */
export const calculateTopicRankings = async (userId) => {
    // Get last 100 activities (or all if less)
    const activities = await UserActivity.find({ userId })
        .sort({ timestamp: -1 })
        .limit(100)
        .lean();

    if (activities.length === 0) {
        return {};
    }

    const scores = {};
    const stats = {}; // Track additional stats
    const now = Date.now();

    activities.forEach(activity => {
        const topicSlug = activity.topicSlug;
        const ageInDays = (now - new Date(activity.timestamp).getTime()) / (1000 * 60 * 60 * 24);

        // Recency score: exponential decay over 7 days
        const recencyScore = Math.exp(-ageInDays / 7);

        // Activity type weights
        const typeWeight = {
            'complete': 10,
            'practice': 7,
            'quiz': 5,
            'view': 1
        }[activity.activityType] || 1;

        // Duration score (capped at 10 points for 10+ minutes)
        const durationScore = Math.min(activity.duration / 60, 10);

        // Combined activity score
        const activityScore = (typeWeight + durationScore) * recencyScore;

        // Accumulate scores
        scores[topicSlug] = (scores[topicSlug] || 0) + activityScore;

        // Track stats
        if (!stats[topicSlug]) {
            stats[topicSlug] = {
                accessCount: 0,
                totalTimeSpent: 0,
                lastAccessed: activity.timestamp
            };
        }
        stats[topicSlug].accessCount++;
        stats[topicSlug].totalTimeSpent += activity.duration;
        if (new Date(activity.timestamp) > new Date(stats[topicSlug].lastAccessed)) {
            stats[topicSlug].lastAccessed = activity.timestamp;
        }
    });

    return { scores, stats };
};

/**
 * Update user preferences based on recent activities
 * @param {String} userId - User ID
 */
export const updateUserPreferences = async (userId) => {
    try {
        const { scores, stats } = await calculateTopicRankings(userId);

        if (Object.keys(scores).length === 0) {
            return; // No activities yet
        }

        // Convert to topicRankings array
        const topicRankings = Object.entries(scores).map(([topicSlug, score]) => ({
            topicSlug,
            score: Math.round(score * 100) / 100, // Round to 2 decimals
            lastAccessed: stats[topicSlug].lastAccessed,
            accessCount: stats[topicSlug].accessCount,
            totalTimeSpent: stats[topicSlug].totalTimeSpent
        }));

        // Detect learning path based on top topics
        const topTopics = topicRankings
            .sort((a, b) => b.score - a.score)
            .slice(0, 3)
            .map(r => r.topicSlug);

        const learningPath = detectLearningPath(topTopics);
        
        // Generate AI Suggestion (if enough data)
        let aiSuggestion = null;
        if (topTopics.length > 0) {
            try {
                // Get available topics (could be passed in or fetched, for now simplified)
                // ideally we fetch all topics here, but to avoid circular dep we'll use a hardcoded list or assume common ones
                const commonTopics = ['react', 'nodejs', 'mongodb', 'python', 'dsa', 'system-design']; 
                
                // Lazy load AI service to avoid circular dependency if any
                const { generateLearningPathRecommendation } = await import('./gemini.service.js');
                
                // Construct simple history object
                const history = {
                   userId,
                   topTopics,
                   recentActivity: activities.slice(0, 5) // Last 5 activities
                };
                
                aiSuggestion = await generateLearningPathRecommendation(history, commonTopics);
            } catch (err) {
                console.error('Failed to generate AI suggestion:', err);
            }
        }

        // Update or create preferences
        const updateData = {
                topicRankings,
                learningPath,
                lastUpdated: new Date()
        };
        
        if (aiSuggestion) {
            updateData.aiSuggestion = aiSuggestion;
        }

        await UserPreferences.findOneAndUpdate(
            { userId },
            updateData,
            { upsert: true, new: true }
        );

        console.log(`✅ Updated preferences for user ${userId}`);
    } catch (error) {
        console.error('Error updating user preferences:', error);
    }
};

/**
 * Detect user's learning path based on top topics
 * @param {Array} topTopics - Array of topic slugs
 * @returns {String} - Learning path
 */
const detectLearningPath = (topTopics) => {
    const webTopics = ['react', 'javascript', 'typescript', 'nextjs', 'angular', 'vue'];
    const mobileTopics = ['flutter', 'dart', 'react-native'];
    const backendTopics = ['nodejs', 'mongodb', 'express', 'django', 'python'];
    const dsaTopics = ['dsa', 'algorithms', 'data-structures', 'blind-75'];

    const webCount = topTopics.filter(t => webTopics.includes(t)).length;
    const mobileCount = topTopics.filter(t => mobileTopics.includes(t)).length;
    const backendCount = topTopics.filter(t => backendTopics.includes(t)).length;
    const dsaCount = topTopics.filter(t => dsaTopics.includes(t)).length;

    if (dsaCount >= 2) return 'dsa';
    if (mobileCount >= 2) return 'mobile';
    if (webCount >= 2 && backendCount >= 1) return 'fullstack';
    if (webCount >= 2) return 'web';
    
    return 'mixed';
};

export default {
    calculateTopicRankings,
    updateUserPreferences,
    detectLearningPath
};
