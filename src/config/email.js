import { Resend } from 'resend';

/**
 * Email configuration using Resend
 * Uses HTTP API instead of SMTP to bypass cloud platform port restrictions
 */

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// Verify configuration on startup
if (!process.env.RESEND_API_KEY) {
    console.warn('⚠️  RESEND_API_KEY not set - emails will not be sent');
} else {
    console.log('✅ Resend email service initialized');
}

/**
 * Send email helper function
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} htmlContent - HTML email content
 * @returns {Promise<boolean>} Success status
 */
export const sendEmail = async (to, subject, htmlContent) => {
    try {
        if (!process.env.RESEND_API_KEY) {
            console.warn('⚠️  Email not sent (no RESEND_API_KEY)');
            return false;
        }

        const { data, error } = await resend.emails.send({
            from: process.env.EMAIL_FROM || 'PrepHub <onboarding@resend.dev>',
            to: [to],
            subject,
            html: htmlContent,
        });

        if (error) {
            console.error(`❌ Error sending email to ${to}:`, error);
            return false;
        }

        console.log(`✅ Email sent to ${to}: ${data.id}`);
        return true;
    } catch (error) {
        console.error(`❌ Error sending email to ${to}:`, error);
        return false;
    }
};

/**
 * Test email configuration
 */
export const testEmailConfig = async () => {
    try {
        const testEmail = process.env.EMAIL_USERNAME || 'test@example.com';
        
        await sendEmail(
            testEmail,
            '✅ PrepHub Email Test',
            '<h1>Email configuration is working!</h1><p>Your weekly summaries will be sent successfully.</p>'
        );
        console.log('✅ Test email sent successfully');
    } catch (error) {
        console.error('❌ Test email failed:', error);
    }
};

export default { sendEmail, testEmailConfig };
