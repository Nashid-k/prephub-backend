import cron from 'node-cron';
import { sendWeeklySummaries } from '../services/emailService.js';

/**
 * Email Scheduler using node-cron
 * Sends weekly study summary emails to users
 */

/**
 * Schedule weekly email summary
 * Runs every Sunday at 9:00 AM
 */
export const scheduleWeeklyEmails = () => {
    // Cron format: minute hour day-of-month month day-of-week
    // '0 9 * * 0' = Every Sunday at 9:00 AM
    const schedule = '0 9 * * 0';

    cron.schedule(schedule, async () => {
        console.log('⏰ Weekly email cron job triggered');
        console.log(`📅 ${new Date().toLocaleString()}`);

        try {
            await sendWeeklySummaries();
        } catch (error) {
            console.error('❌ Weekly email cron job failed:', error);
        }
    }, {
        scheduled: true,
        timezone: 'Asia/Kolkata' // IST timezone
    });

    console.log('✅ Weekly email scheduler initialized (Sundays 9:00 AM IST)');
};

/**
 * For testing - send emails immediately
 * DO NOT use in production
 */
export const sendTestEmails = async () => {
    console.log('🧪 Sending test emails now...');
    try {
        const result = await sendWeeklySummaries();
        console.log('✅ Test emails sent:', result);
        return result;
    } catch (error) {
        console.error('❌ Test email failed:', error);
        throw error;
    }
};

export default {
    scheduleWeeklyEmails,
    sendTestEmails
};
