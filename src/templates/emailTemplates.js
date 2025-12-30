/**
 * Email HTML Templates
 * Professional, styled templates for PrepHub emails
 */

/**
 * Base email template wrapper
 */
const baseTemplate = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
            background: #f5f5f7;
            padding: 20px;
            line-height: 1.6;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #5e5ce6 0%, #0a84ff 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
        }
        .header h1 {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
        }
        .header p {
            font-size: 16px;
            opacity: 0.95;
        }
        .content {
            padding: 40px 30px;
        }
        .greeting {
            font-size: 18px;
            color: #1d1d1f;
            margin-bottom: 20px;
        }
        .stat-grid {
            display: table;
            width: 100%;
            margin: 30px 0;
        }
        .stat-card {
            background: linear-gradient(135deg, #f5f5f7 0%, #ffffff 100%);
            border-radius: 12px;
            padding: 24px;
            margin: 12px 0;
            border-left: 4px solid #5e5ce6;
        }
        .stat-number {
            font-size: 42px;
            font-weight: 700;
            color: #5e5ce6;
            line-height: 1;
            margin-bottom: 8px;
        }
        .stat-label {
            font-size: 14px;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .button {
            display: inline-block;
            background: linear-gradient(135deg, #0a84ff 0%, #5e5ce6 100%);
            color: white !important;
            padding: 14px 32px;
            border-radius: 24px;
            text-decoration: none;
            font-weight: 600;
            margin: 20px 0;
            box-shadow: 0 4px 12px rgba(10, 132, 255, 0.3);
        }
        .button:hover {
            box-shadow: 0 6px 16px rgba(10, 132, 255, 0.4);
        }
        .message {
            font-size: 16px;
            color: #666;
            margin: 20px 0;
            padding: 20px;
            background: #f9f9f9;
            border-radius: 8px;
        }
        .footer {
            text-align: center;
            padding: 30px;
            background: #f5f5f7;
            color: #999;
            font-size: 13px;
        }
        .footer a {
            color: #0a84ff;
            text-decoration: none;
        }
        .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, #e0e0e0, transparent);
            margin: 30px 0;
        }
    </style>
</head>
<body>
    ${content}
</body>
</html>
`;

/**
 * Weekly Summary Email Template
 */
export const weeklySummaryTemplate = (data) => {
    const {
        userName = 'Student',
        sectionsCompleted = 0,
        hoursStudied = 0,
        minutesStudied = 0,
        streakDays = 0,
        topicsStarted = 0,
        dashboardUrl = '#',
        unsubscribeUrl = '#'
    } = data;

    const totalMinutes = hoursStudied * 60 + minutesStudied;
    const displayHours = Math.floor(totalMinutes / 60);
    const displayMinutes = totalMinutes % 60;

    const content = `
    <div class="email-container">
        <div class="header">
            <h1>🎯 Your Weekly Study Summary</h1>
            <p>Great progress this week, ${userName}!</p>
        </div>
        
        <div class="content">
            <div class="greeting">
                Hey ${userName} 👋
            </div>
            
            <p style="color: #666; margin-bottom: 20px;">
                Here's what you accomplished this week on PrepHub:
            </p>
            
            <div class="stat-grid">
                <div class="stat-card">
                    <div class="stat-number">${sectionsCompleted}</div>
                    <div class="stat-label">Sections Completed 📚</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-number">${displayHours}h ${displayMinutes}m</div>
                    <div class="stat-label">Time Studied ⏱️</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-number">${streakDays}</div>
                    <div class="stat-label">Day Streak 🔥</div>
                </div>
                
                ${topicsStarted > 0 ? `
                <div class="stat-card">
                    <div class="stat-number">${topicsStarted}</div>
                    <div class="stat-label">Topics Started 🚀</div>
                </div>
                ` : ''}
            </div>
            
            <div class="divider"></div>
            
            <div class="message">
                <strong>💪 Keep up the momentum!</strong><br>
                You're making excellent progress toward mastering the MERN stack. 
                ${streakDays >= 7 ? 'Your consistent study habit is paying off!' : 'Try to study every day to build a streak!'}
            </div>
            
            <center>
                <a href="${dashboardUrl}" class="button">Continue Learning →</a>
            </center>
        </div>
        
        <div class="footer">
            <p><strong>PrepHub</strong> - Your MERN Learning Companion</p>
            <p style="margin-top: 10px;">
                <a href="${dashboardUrl}">Dashboard</a> • 
                <a href="${unsubscribeUrl}">Unsubscribe</a>
            </p>
            <p style="margin-top: 15px; color: #ccc;">
                © ${new Date().getFullYear()} PrepHub. All rights reserved.
            </p>
        </div>
    </div>
    `;

    return baseTemplate(content);
};

/**
 * Welcome Email Template
 */
export const welcomeTemplate = (data) => {
    const { userName = 'Student', dashboardUrl = '#' } = data;

    const content = `
    <div class="email-container">
        <div class="header">
            <h1>🎉 Welcome to PrepHub!</h1>
            <p>Your MERN learning journey starts now</p>
        </div>
        
        <div class="content">
            <div class="greeting">
                Hey ${userName}! 👋
            </div>
            
            <p style="color: #666; margin-bottom: 20px;">
                Welcome to PrepHub! We're excited to help you master the MERN stack.
            </p>
            
            <div class="message">
                <strong>🚀 What's included:</strong><br><br>
                ✅ Comprehensive MERN curriculum<br>
                ✅ AI-powered explanations<br>
                ✅ Interactive code compiler<br>
                ✅ Progress tracking & analytics<br>
                ✅ Spaced repetition for better retention<br>
            </div>
            
            <center>
                <a href="${dashboardUrl}" class="button">Start Learning →</a>
            </center>
        </div>
        
        <div class="footer">
            <p><strong>PrepHub</strong> - Your MERN Learning Companion</p>
            <p style="margin-top: 15px; color: #ccc;">
                © ${new Date().getFullYear()} PrepHub. All rights reserved.
            </p>
        </div>
    </div>
    `;

    return baseTemplate(content);
};

export default {
    weeklySummaryTemplate,
    welcomeTemplate
};
