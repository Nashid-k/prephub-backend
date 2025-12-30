import { generateWithGemini } from '../controllers/ai.controller.js';

/**
 * AI-Powered Tip Generation Service
 * Uses Gemini to generate personalized study tips
 */

/**
 * Generate AI-powered improvement tips for weak areas
 * @param {Array} weakAreas - Array of weak topic objects
 * @param {Object} userStats - User statistics
 * @returns {Array} Array of tip objects
 */
export const generateImprovementTips = async (weakAreas, userStats = {}) => {
    try {
        // Create prompt for AI
        const weakAreasText = weakAreas.map(area => 
            `${area.topicName} (${area.percentage}% complete, ${area.sectionsLeft} sections remaining)`
        ).join(', ');

        const prompt = `
You are an expert programming mentor helping a student learn the MERN stack.

The student is struggling with these topics:
${weakAreasText}

Student's overall progress: ${userStats.overallProgress || 0}%
Study time this week: ${userStats.hoursThisWeek || 0} hours
Current streak: ${userStats.streakDays || 0} days

Generate 3 personalized, actionable study tips to help them improve in these weak areas.
Each tip should:
1. Be specific and actionable
2. Focus on practical learning strategies
3. Be encouraging but realistic
4. Reference the MERN stack topics they're learning

Return ONLY a valid JSON array with this exact structure:
[
  {
    "title": "Tip title (max 50 chars)",
    "description": "Detailed actionable advice (max 200 chars)",
    "priority": "high|medium|low"
  }
]

Return only the JSON array, no other text.
`;

        const aiResponse = await generateWithGemini(prompt);
        
        // Parse AI response
        let tips = [];
        try {
            // Extract JSON from response
            const jsonMatch = aiResponse.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                tips = JSON.parse(jsonMatch[0]);
            }
        } catch (parseError) {
            console.error('Error parsing AI tips:', parseError);
            // Fallback to default tips
            tips = getDefaultTips(weakAreas);
        }

        // Validate and limit to 3 tips
        tips = tips.slice(0, 3).map((tip, idx) => ({
            title: tip.title || `Tip #${idx + 1}`,
            description: tip.description || 'Focus on consistent daily practice.',
            priority: tip.priority || 'medium'
        }));

        return tips;
    } catch (error) {
        console.error('Error generating AI tips:', error);
        return getDefaultTips(weakAreas);
    }
};

/**
 * Fallback tips if AI generation fails
 */
const getDefaultTips = (weakAreas) => {
    const tips = [
        {
            title: 'Break It Down',
            description: 'Focus on one weak topic at a time. Complete 2-3 sections daily instead of jumping between topics.',
            priority: 'high'
        },
        {
            title: 'Practice with Real Projects',
            description: 'Build a mini-project using the concepts you\'re struggling with. Learning by doing is 3x more effective.',
            priority: 'high'
        },
        {
            title: 'Use Spaced Repetition',
            description: 'Review completed sections using our spaced repetition system. Retention improves by 200% with regular reviews.',
            priority: 'medium'
        }
    ];

    // Customize first tip based on weakest area
    if (weakAreas && weakAreas.length > 0) {
        const weakest = weakAreas[0];
        tips[0].description = `Focus on ${weakest.topicName} first. Complete just one section today to build momentum.`;
    }

    return tips;
};

/**
 * Generate personalized study plan based on weak areas
 */
export const generateStudyPlan = async (weakAreas, availableHoursPerWeek = 5) => {
    try {
        const prompt = `
You are a study planner for MERN stack learning.

Student's weak areas: ${weakAreas.map(a => a.topicName).join(', ')}
Available study time: ${availableHoursPerWeek} hours per week

Create a focused 1-week study plan to improve these weak areas.
Return ONLY valid JSON with this structure:
{
  "weeklyGoal": "Main goal for the week",
  "dailyTasks": [
    {"day": "Monday", "task": "Task description", "duration": "30 min"},
    ...
  ]
}

Return only the JSON, no other text.
`;

        const aiResponse = await generateWithGemini(prompt);
        const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
        
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
    } catch (error) {
        console.error('Error generating study plan:', error);
    }

    return null;
};

export default {
    generateImprovementTips,
    generateStudyPlan
};
