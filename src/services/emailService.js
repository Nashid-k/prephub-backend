import { sendEmail } from '../config/email.js';
import { weeklySummaryTemplate, welcomeTemplate } from '../templates/emailTemplates.js';
import User from '../models/User.js';
import Progress from '../models/Progress.js';
import { getStreakData } from '../utils/streakHelper.js';

/**
 * Calculate user's weekly statistics
 */
const getUserWeekly Stats = async (userId) => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Get progress from last week
    const weeklyProgress = await Progress.find({
        userId,
        updatedAt: { $gte: oneWeekAgo }
    }).populate('sectionId');

    const sectionsCompleted = weeklyProgress.filter(p => p.completed).length;
    const minutesStudied = weeklyProgress.reduce((sum, p) => sum + (p.timeSpent || 0), 0);
    
    // Get unique topics started
    const topicsStarted = new Set(
        weeklyProgress
            .filter(p => p.sectionId)
            .map(p => p.sectionId.topicId?.toString())
    ).size;

    // Get streak data (would need to implement streak helper)
    const streakDays = 0; // Placeholder - implement with actual streak logic

    return {
        sectionsCompleted,
        minutesStudied,
        hoursStudied: Math.floor(minutesStudied / 60),
        topicsStarted,
        streakDays
    };
};

/**
 * Send weekly summary email to a user
 */
export const sendWeeklySummaryToUser = async (user) => {
    try {
        if (!user.email || !user.emailPreferences?.weeklySummary) {
            return false;
        }

        const stats = await getUserWeeklyStats(user._id);

        // Only send if user has some activity
        if (stats.sectionsCompleted === 0 && stats.minutesStudied === 0) {
            console.log(`⏭️  Skipping email for ${user.email} (no activity)`);
            return false;
        }

        const html = weeklySummaryTemplate({
            userName: user.name || user.email.split('@')[0],
            sectionsCompleted: stats.sectionsCompleted,
            hoursStudied: stats.hoursStudied,
            minutesStudied: stats.minutesStudied % 60,
            streakDays: stats.streakDays,
            topicsStarted: stats.topicsStarted,
            dashboardUrl: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard`,
            unsubscribeUrl: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/unsubscribe?token=${user.emailPreferences?.unsubscribeToken || ''}`
        });

        const success = await sendEmail(
            user.email,
            '🎯 Your Weekly Study Summary - PrepHub',
            html
        );

        if (success) {
            // Update last email sent date
            user.emailPreferences.lastEmailSent = new Date();
            await user.save();
        }

        return success;
    } catch (error) {
        console.error(`Error sending weekly summary to ${user.email}:`, error);
        return false;
    }
};

/**
 * Send weekly summaries to all opted-in users
 */
export const sendWeeklySummaries = async () => {
    try {
        console.log('📧 Starting weekly email batch...');

        const users = await User.find({
            email: { $exists: true, $ne: null },
            'emailPreferences.weeklySummary': true
        }).limit(500); // Gmail free tier limit

        console.log(`📊 Found ${users.length} users to email`);

        let sent = 0;
        let skipped = 0;
        let failed = 0;

        for (const user of users) {
            const result = await sendWeeklySummaryToUser(user);
            if (result) {
                sent++;
            } else {
                skipped++;
            }
            
            // Rate limiting: wait 100ms between emails
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        console.log(`✅ Weekly email batch complete: ${sent} sent, ${skipped} skipped, ${failed} failed`);
        
        return { sent, skipped, failed };
    } catch (error) {
        console.error('❌ Error in weekly summary batch:', error);
        throw error;
    }
};

/**
 * Send welcome email to new user
 */
export const sendWelcomeEmail = async (user) => {
    try {
        if (!user.email) return false;

        const html = welcomeTemplate({
            userName: user.name || user.email.split('@')[0],
            dashboardUrl: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard`
        });

        return await sendEmail(
            user.email,
            '🎉 Welcome to PrepHub!',
            html
        );
    } catch (error) {
        console.error(`Error sending welcome email to ${user.email}:`, error);
        return false;
    }
};

export default {
    sendWeeklySummaryToUser,
    sendWeeklySummaries,
    sendWelcomeEmail
};
