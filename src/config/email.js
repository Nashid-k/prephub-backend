import nodemailer from 'nodemailer';

/**
 * Email configuration using Gmail with App Password
 * Credentials from environment variables
 */

// Create transporter with Gmail using explicit SMTP configuration
export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, // SSL port (more likely to work on cloud platforms)
    secure: true, // Use SSL
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    },
    // Additional options for better reliability
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
});

// Verify connection on startup
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ Email configuration error:', error);
    } else {
        console.log('✅ Email server ready to send messages');
    }
});

/**
 * Send email helper function
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} htmlContent - HTML email content
 * @returns {Promise<boolean>} Success status
 */
export const sendEmail = async (to, subject, htmlContent) => {
    try {
        const info = await transporter.sendMail({
            from: `PrepHub <${process.env.EMAIL_FROM || process.env.EMAIL_USERNAME}>`,
            to,
            subject,
            html: htmlContent
        });

        console.log(`✅ Email sent to ${to}: ${info.messageId}`);
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
        await sendEmail(
            process.env.EMAIL_USERNAME,
            '✅ PrepHub Email Test',
            '<h1>Email configuration is working!</h1><p>Your weekly summaries will be sent successfully.</p>'
        );
        console.log('✅ Test email sent successfully');
    } catch (error) {
        console.error('❌ Test email failed:', error);
    }
};

export default { transporter, sendEmail, testEmailConfig };
