/**
 * Advanced Email Templates for PrepHub
 * Includes: Welcome, Inactivity, Weak Areas + AI Tips, Excellence
 */

const baseTemplate = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
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
        .header h1 { font-size: 28px; font-weight: 700; margin-bottom: 8px; }
        .header p { font-size: 16px; opacity: 0.95; }
        .content { padding: 40px 30px; }
        .greeting { font-size: 18px; color: #1d1d1f; margin-bottom: 20px; }
        .stat-card {
            background: linear-gradient(135deg, #f5f5f7 0%, #ffffff 100%);
            border-radius: 12px;
            padding: 24px;
            margin: 12px 0;
            border-left: 4px solid #5e5ce6;
        }
        .stat-number { font-size: 42px; font-weight: 700; color: #5e5ce6; margin-bottom: 8px; }
        .stat-label { font-size: 14px; color: #666; text-transform: uppercase; }
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
        .tip-box {
            background: #f0f9ff;
            border-left: 4px solid #0a84ff;
            padding: 20px;
            margin: 15px 0;
            border-radius: 8px;
        }
        .tip-box strong { color: #0a84ff; }
        .warning-box {
            background: #fff3cd;
            border-left: 4px solid #ff9f0a;
            padding: 20px;
            margin: 15px 0;
            border-radius: 8px;
        }
        .success-box {
            background: #d4edda;
            border-left: 4px solid #30d158;
            padding: 20px;
            margin: 15px 0;
            border-radius: 8px;
        }
        .footer {
            text-align: center;
            padding: 30px;
            background: #f5f5f7;
            color: #999;
            font-size: 13px;
        }
        .footer a { color: #0a84ff; text-decoration: none; }
    </style>
</head>
<body>${content}</body>
</html>
`;

/**
 * 1. Welcome Email (On Google Signup)
 */
export const welcomeEmailTemplate = (data) => {
    const { userName, userEmail, dashboardUrl = '#', profilePicture } = data;

    return baseTemplate(`
    <div class="email-container">
        <div class="header">
            <h1>🎉 Welcome to PrepHub!</h1>
            <p>Your MERN mastery journey starts now</p>
        </div>
        
        <div class="content">
            ${profilePicture ? `<center><img src="${profilePicture}" style="width:80px; height:80px; border-radius:50%; margin-bottom:20px;" alt="Profile"></center>` : ''}
            
            <div class="greeting">Hey ${userName}! 👋</div>
            
            <p style="color: #666; margin-bottom: 20px;">
                Welcome to PrepHub! We're thrilled to have you join our learning community. 
                Your account (<strong>${userEmail}</strong>) is all set up and ready to go!
            </p>
            
            <div class="success-box">
                <strong>🚀 What's included in PrepHub:</strong><br><br>
                ✅ Complete MERN stack curriculum<br>
                ✅ AI-powered explanations & help<br>
                ✅ Interactive code compiler<br>
                ✅ Progress tracking & analytics<br>
                ✅ Spaced repetition system<br>
                ✅ Weekly personalized insights
            </div>
            
            <div class="tip-box">
                <strong>💡 Pro Tip:</strong> Study for just 30 minutes daily to build a learning streak! 
                Consistency beats intensity.
            </div>
            
            <center>
                <a href="${dashboardUrl}" class="button">Start Learning Now →</a>
            </center>
            
            <p style="margin-top: 30px; color: #999; font-size: 14px;">
                Questions? Reply to this email anytime. We're here to help! 🤝
            </p>
        </div>
        
        <div class="footer">
            <p><strong>PrepHub</strong> - Master MERN, Build Your Future</p>
            <p style="margin-top: 15px;">© ${new Date().getFullYear()} PrepHub. All rights reserved.</p>
        </div>
    </div>
    `);
};

/**
 * 2. Inactivity Reminder (2+ days inactive)
 */
export const inactivityReminderTemplate = (data) => {
    const { userName, daysInactive, lastTopic, continueUrl = '#', dashboardUrl = '#' } = data;

    return baseTemplate(`
    <div class="email-container">
        <div class="header">
            <h1>👋 We Miss You!</h1>
            <p>Your learning journey is waiting</p>
        </div>
        
        <div class="content">
            <div class="greeting">Hey ${userName},</div>
            
            <p style="color: #666; margin-bottom: 20px;">
                We noticed you haven't studied in <strong>${daysInactive} days</strong>. 
                Don't let your momentum fade – even 10 minutes can make a difference! 💪
            </p>
            
            <div class="warning-box">
                <strong>⚠️ Your streak is at risk!</strong><br>
                Keep it alive by studying today. Remember: consistency builds expertise.
            </div>
            
            ${lastTopic ? `
            <div class="stat-card">
                <strong>📚 Continue where you left off:</strong><br>
                <div style="margin-top:10px; font-size:18px; color:#5e5ce6;">${lastTopic}</div>
                <a href="${continueUrl}" style="color:#0a84ff; text-decoration:none; font-size:14px;">Resume learning →</a>
            </div>
            ` : ''}
            
            <div class="tip-box">
                <strong>💡 Quick Win:</strong> Complete just ONE section today. Small progress compounds into big results!
            </div>
            
            <center>
                <a href="${dashboardUrl}" class="button">Resume Learning →</a>
            </center>
        </div>
        
        <div class="footer">
            <p><strong>PrepHub</strong> - Your Success Partner</p>
            <p style="margin-top: 10px;"><a href="#">Adjust email preferences</a></p>
        </div>
    </div>
    `);
};

/**
 * 3. Weak Areas + AI Improvement Tips (Weekly)
 */
export const weakAreasWithTipsTemplate = (data) => {
    const { 
        userName, 
        weakAreas = [], 
        aiTips = [], 
        overallProgress,
        dashboardUrl = '#' 
    } = data;

    return baseTemplate(`
    <div class="email-container">
        <div class="header">
            <h1>📊 Your Weekly Insights</h1>
            <p>Personalized tips to accelerate your growth</p>
        </div>
        
        <div class="content">
            <div class="greeting">Hey ${userName},</div>
            
            <p style="color: #666; margin-bottom: 20px;">
                Here's your personalized learning report with AI-powered insights to help you improve faster! 🚀
            </p>
            
            <div class="stat-card">
                <div class="stat-number">${overallProgress}%</div>
                <div class="stat-label">Overall Progress</div>
            </div>
            
            ${weakAreas.length > 0 ? `
            <h3 style="margin: 30px 0 15px; color: #1d1d1f;">🎯 Areas to Focus On</h3>
            ${weakAreas.map(area => `
                <div class="warning-box">
                    <strong>${area.topicName}</strong><br>
                    <div style="margin-top:8px; color: #666;">
                        Completion: ${area.percentage}% • 
                        ${area.sectionsLeft} sections remaining
                    </div>
                </div>
            `).join('')}
            ` : ''}
            
            <h3 style="margin: 30px 0 15px; color: #1d1d1f;">🤖 AI-Powered Tips for You</h3>
            ${aiTips.map((tip, idx) => `
                <div class="tip-box">
                    <strong>Tip #${idx + 1}: ${tip.title}</strong><br>
                    <p style="margin-top:10px; color:#666;">${tip.description}</p>
                    ${tip.actionUrl ? `<a href="${tip.actionUrl}" style="color:#0a84ff; font-size:14px;">Take action →</a>` : ''}
                </div>
            `).join('')}
            
            <div class="success-box">
                <strong>💪 Keep Going!</strong><br>
                Every expert was once a beginner. Your dedication is building real skills that matter.
            </div>
            
            <center>
                <a href="${dashboardUrl}" class="button">Continue Learning →</a>
            </center>
        </div>
        
        <div class="footer">
            <p><strong>PrepHub</strong> - AI-Powered Learning</p>
        </div>
    </div>
    `);
};

/**
 * 4. Excellence Celebration (Weekly high performers)
 */
export const excellenceCelebrationTemplate = (data) => {
    const {
        userName,
        achievementStats = {},
        streakDays,
        completionRate,
        hoursThisWeek,
        dashboardUrl = '#'
    } = data;

    return baseTemplate(`
    <div class="email-container">
        <div class="header" style="background: linear-gradient(135deg, #30d158 0%, #00c853 100%);">
            <h1>🏆 You're Crushing It!</h1>
            <p>Outstanding performance this week</p>
        </div>
        
        <div class="content">
            <div class="greeting">Hey ${userName}! 🌟</div>
            
            <p style="color: #666; margin-bottom: 20px;">
                WOW! Your dedication this week has been absolutely incredible. 
                You're not just learning – you're excelling! 💎
            </p>
            
            <div class="success-box">
                <strong>🎉 This Week's Achievements:</strong><br><br>
                ${streakDays >= 7 ? `🔥 <strong>${streakDays}-day study streak!</strong><br>` : ''}
                ⏱️ <strong>${hoursThisWeek} hours</strong> of focused study<br>
                ✅ <strong>${completionRate}%</strong> section completion rate<br>
                ${achievementStats.topicsCompleted ? `📚 <strong>${achievementStats.topicsCompleted}</strong> topics mastered<br>` : ''}
            </div>
            
            <div class="stat-card" style="border-left-color: #30d158;">
                <div class="stat-number" style="color: #30d158;">Top 10%</div>
                <div class="stat-label">Among PrepHub learners 🚀</div>
            </div>
            
            <div class="tip-box">
                <strong>💡 You're on Fire!</strong><br>
                At this pace, you'll complete the entire MERN curriculum ahead of schedule. 
                Keep this momentum – you're building career-changing skills!
            </div>
            
            <p style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <strong>🎯 Challenge:</strong> Try teaching what you've learned to someone else. 
                Teaching is the ultimate test of understanding!
            </p>
            
            <center>
                <a href="${dashboardUrl}" class="button">Keep Going →</a>
            </center>
            
            <p style="margin-top: 30px; text-align: center; color: #999;">
                Share your progress on LinkedIn! Use #PrepHub #MERNStack
            </p>
        </div>
        
        <div class="footer">
            <p><strong>PrepHub</strong> - Where Dedication Meets Success</p>
        </div>
    </div>
    `);
};

export default {
    welcomeEmailTemplate,
    inactivityReminderTemplate,
    weakAreasWithTipsTemplate,
    excellenceCelebrationTemplate
};
