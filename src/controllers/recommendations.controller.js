import Topic from '../models/Topic.js';
import Progress from '../models/Progress.js';

/**
 * Get personalized topic recommendations for the user
 * Based on their progress and learning patterns
 */
export const getRecommendations = async (req, res) => {
    try {
        const userId = req.user ? req.user.id : (req.headers['x-session-id'] || 'default-user');

        // Get all topics
        const allTopics = await Topic.find({}).select('slug name description icon').lean();

        // Get user's progress
        const userProgress = await Progress.find({ userId }).select('topicId sectionId').lean();

        // Calculate progress per topic
        const topicProgress = {};
        userProgress.forEach(prog => {
            const topicId = prog.topicId.toString();
            if (!topicProgress[topicId]) {
                topicProgress[topicId] = { completed: 0, total: 0 };
            }
            topicProgress[topicId].total++;
            if (prog.sectionId) topicProgress[topicId].completed++;
        });

        // Define learning paths (prerequisites)
        const learningPaths = {
            'javascript': { difficulty: 1, prereqs: [] },
            'mongodb': { difficulty: 2, prereqs: ['javascript'] },
            'express': { difficulty: 2, prereqs: ['mongodb', 'javascript'] },
            'react': { difficulty: 2, prereqs: ['javascript'] },
            'node': { difficulty: 2, prereqs: ['javascript'] },
            'dsa': { difficulty: 3, prereqs: ['javascript'] },
            'os': { difficulty: 2, prereqs: [] },
            'networking': { difficulty: 2, prereqs: [] },
            'system-design': { difficulty: 4, prereqs: ['mongodb', 'express', 'react', 'node'] }
        };

        // Score topics
        const scoredTopics = allTopics.map(topic => {
            const topicId = topic._id.toString();
            const progress = topicProgress[topicId];
            const progressPercent = progress ? (progress.completed / progress.total) * 100 : 0;

            // Skip completed topics (>80% done) and in-progress topics
            if (progressPercent > 0) return null;

            const pathInfo = learningPaths[topic.slug] || { difficulty: 2, prereqs: [] };
            
            // Check if prerequisites are met
            const prereqsMet = pathInfo.prereqs.every(prereq => {
                const prereqTopic = allTopics.find(t => t.slug === prereq);
                if (!prereqTopic) return true;
                const prereqProgress = topicProgress[prereqTopic._id.toString()];
                const prereqPercent = prereqProgress ? (prereqProgress.completed / prereqProgress.total) * 100 : 0;
                return prereqPercent > 50; // At least 50% done
            });

            if (!prereqsMet) return null;

            // Calculate score (higher = better recommendation)
            let score = 100;
            score -= pathInfo.difficulty * 10; // Prefer easier topics
            score += prereqsMet ? 30 : 0; // Boost if prereqs met
            score += pathInfo.prereqs.length * 5; // Slight boost for topics with prerequisites (shows progression)

            return {
                ...topic,
                score,
                reason: getRecommendationReason(topic, pathInfo, prereqsMet)
            };
        }).filter(Boolean);

        // Sort by score and take top 3
        const recommendations = scoredTopics
            .sort((a, b) => b.score - a.score)
            .slice(0, 3)
            .map(({ _id, slug, name, description, icon, reason }) => ({
                _id,
                slug,
                name,
                description,
                icon,
                reason
            }));

        res.json(recommendations);
    } catch (error) {
        console.error('Get recommendations error:', error);
        res.status(500).json({ message: 'Failed to get recommendations' });
    }
};

const getRecommendationReason = (topic, pathInfo, prereqsMet) => {
    const reasons = [];

    if (pathInfo.difficulty === 1) {
        reasons.push('Perfect for beginners');
    } else if (pathInfo.difficulty === 2) {
        reasons.push('Great next step');
    }

    if (prereqsMet && pathInfo.prereqs.length > 0) {
        reasons.push('You\'ve completed the prerequisites');
    }

    if (topic.slug === 'react' || topic.slug === 'mongodb') {
        reasons.push('Highly in-demand skill');
    }

    if (topic.slug === 'dsa') {
        reasons.push('Essential for interviews');
    }

    return reasons.join(' • ') || 'Recommended for you';
};
