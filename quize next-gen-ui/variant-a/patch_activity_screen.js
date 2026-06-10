const fs = require('fs');

let html = fs.readFileSync('quiz.html', 'utf8');

// 1. Update the "View All Activity" button click handler
const oldOnClick = `onclick="QuizEngine.showToast('Activity History (Coming Soon)')"`;
const newOnClick = `onclick="QuizEngine.navigate('view-activity')"`;
html = html.replace(oldOnClick, newOnClick);

// 2. Insert the new #view-activity screen
const activityScreenHtml = `

    <!-- Screen: Activity History -->
    <div id="view-activity" class="quiz-view" style="background-color: var(--bg-color); font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;">
        <div class="header-wrapper">
            <div class="header-inner" style="padding-bottom: 16px;">
                <div class="header-left">
                    <button class="back-btn" onclick="QuizEngine.navigateBack()">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 19l-7-7 7-7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <h1 class="header-title">Activity History</h1>
                </div>
            </div>
        </div>

        <div class="view-content" style="padding: 24px 20px 100px;">
            <div class="card premium-card" style="padding: 0; overflow: hidden;">
                
                <!-- Activity 1 -->
                <div style="display: flex; align-items: center; padding: 20px; border-bottom: 1px solid rgba(0,0,0,0.05); gap: 16px;">
                    <div style="width: 48px; height: 48px; border-radius: 14px; background: rgba(70, 107, 169, 0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f4dd.png" style="width: 24px; height: 24px; object-fit: contain;">
                    </div>
                    <div style="flex: 1;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                            <span style="font-size: 15px; font-weight: 700; color: var(--text-primary); line-height: 1.2;">Completed Traffic Law Quiz</span>
                            <span style="font-size: 12px; font-weight: 600; color: var(--text-dim); flex-shrink: 0; padding-left: 12px;">2h ago</span>
                        </div>
                        <div style="font-size: 13px; font-weight: 500; color: var(--text-secondary);">
                            Scored 90% <span style="margin: 0 4px; color: var(--text-dim);">•</span> <span style="color: var(--accent-blue); font-weight: 700;">+45 XP</span>
                        </div>
                    </div>
                </div>

                <!-- Activity 2 -->
                <div style="display: flex; align-items: center; padding: 20px; border-bottom: 1px solid rgba(0,0,0,0.05); gap: 16px;">
                    <div style="width: 48px; height: 48px; border-radius: 14px; background: rgba(52, 199, 89, 0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/2694-fe0f.png" style="width: 24px; height: 24px; object-fit: contain;">
                    </div>
                    <div style="flex: 1;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                            <span style="font-size: 15px; font-weight: 700; color: var(--text-primary); line-height: 1.2;">Won Challenge</span>
                            <span style="font-size: 12px; font-weight: 600; color: var(--text-dim); flex-shrink: 0; padding-left: 12px;">Yesterday</span>
                        </div>
                        <div style="font-size: 13px; font-weight: 500; color: var(--text-secondary);">
                            vs Officer Jenkins <span style="margin: 0 4px; color: var(--text-dim);">•</span> <span style="color: var(--success); font-weight: 700;">+100 XP</span>
                        </div>
                    </div>
                </div>

                <!-- Activity 3 -->
                <div style="display: flex; align-items: center; padding: 20px; border-bottom: 1px solid rgba(0,0,0,0.05); gap: 16px;">
                    <div style="width: 48px; height: 48px; border-radius: 14px; background: rgba(245, 158, 11, 0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f3c5.png" style="width: 24px; height: 24px; object-fit: contain;">
                    </div>
                    <div style="flex: 1;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                            <span style="font-size: 15px; font-weight: 700; color: var(--text-primary); line-height: 1.2;">Earned Sharpshooter</span>
                            <span style="font-size: 12px; font-weight: 600; color: var(--text-dim); flex-shrink: 0; padding-left: 12px;">2d ago</span>
                        </div>
                        <div style="font-size: 13px; font-weight: 500; color: var(--text-secondary);">
                            10 Perfect Quizzes
                        </div>
                    </div>
                </div>
                
                <!-- Activity 4 -->
                <div style="display: flex; align-items: center; padding: 20px; border-bottom: 1px solid rgba(0,0,0,0.05); gap: 16px;">
                    <div style="width: 48px; height: 48px; border-radius: 14px; background: rgba(70, 107, 169, 0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f4dd.png" style="width: 24px; height: 24px; object-fit: contain;">
                    </div>
                    <div style="flex: 1;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                            <span style="font-size: 15px; font-weight: 700; color: var(--text-primary); line-height: 1.2;">Completed Evidence Law Quiz</span>
                            <span style="font-size: 12px; font-weight: 600; color: var(--text-dim); flex-shrink: 0; padding-left: 12px;">3d ago</span>
                        </div>
                        <div style="font-size: 13px; font-weight: 500; color: var(--text-secondary);">
                            Scored 85% <span style="margin: 0 4px; color: var(--text-dim);">•</span> <span style="color: var(--accent-blue); font-weight: 700;">+40 XP</span>
                        </div>
                    </div>
                </div>
                
                <!-- Activity 5 -->
                <div style="display: flex; align-items: center; padding: 20px; border-bottom: 1px solid rgba(0,0,0,0.05); gap: 16px;">
                    <div style="width: 48px; height: 48px; border-radius: 14px; background: rgba(139, 92, 246, 0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f31f.png" style="width: 24px; height: 24px; object-fit: contain;">
                    </div>
                    <div style="flex: 1;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                            <span style="font-size: 15px; font-weight: 700; color: var(--text-primary); line-height: 1.2;">Reached Level 11</span>
                            <span style="font-size: 12px; font-weight: 600; color: var(--text-dim); flex-shrink: 0; padding-left: 12px;">4d ago</span>
                        </div>
                        <div style="font-size: 13px; font-weight: 500; color: var(--text-secondary);">
                            Promoted to Senior <span style="margin: 0 4px; color: var(--text-dim);">•</span> <span style="color: #8b5cf6; font-weight: 700;">+500 XP</span>
                        </div>
                    </div>
                </div>
                
                <!-- Activity 6 -->
                <div style="display: flex; align-items: center; padding: 20px; border-bottom: 1px solid rgba(0,0,0,0.05); gap: 16px;">
                    <div style="width: 48px; height: 48px; border-radius: 14px; background: rgba(239, 68, 68, 0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f525.png" style="width: 24px; height: 24px; object-fit: contain;">
                    </div>
                    <div style="flex: 1;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                            <span style="font-size: 15px; font-weight: 700; color: var(--text-primary); line-height: 1.2;">7-Day Streak Achieved</span>
                            <span style="font-size: 12px; font-weight: 600; color: var(--text-dim); flex-shrink: 0; padding-left: 12px;">1w ago</span>
                        </div>
                        <div style="font-size: 13px; font-weight: 500; color: var(--text-secondary);">
                            Consistency Bonus <span style="margin: 0 4px; color: var(--text-dim);">•</span> <span style="color: #ef4444; font-weight: 700;">+50 XP</span>
                        </div>
                    </div>
                </div>
                
                <!-- Activity 7 -->
                <div style="display: flex; align-items: center; padding: 20px; gap: 16px;">
                    <div style="width: 48px; height: 48px; border-radius: 14px; background: rgba(100, 116, 139, 0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/2694-fe0f.png" style="width: 24px; height: 24px; object-fit: contain; filter: grayscale(100%) opacity(0.8);">
                    </div>
                    <div style="flex: 1;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                            <span style="font-size: 15px; font-weight: 700; color: var(--text-primary); line-height: 1.2;">Lost Challenge</span>
                            <span style="font-size: 12px; font-weight: 600; color: var(--text-dim); flex-shrink: 0; padding-left: 12px;">1w ago</span>
                        </div>
                        <div style="font-size: 13px; font-weight: 500; color: var(--text-secondary);">
                            vs Officer Davies <span style="margin: 0 4px; color: var(--text-dim);">•</span> <span style="color: var(--text-dim); font-weight: 700;">+10 XP</span>
                        </div>
                    </div>
                </div>

            </div>
            
            <div style="text-align: center; margin-top: 24px;">
                <span style="font-size: 13px; font-weight: 600; color: var(--text-dim);">End of recent history</span>
            </div>
        </div>
    </div>
`;

// Insert it right before the last closing </div> of the app or before script tags
const insertionPoint = html.lastIndexOf('</div>\n\n<script src="quiz.js"></script>');
if (insertionPoint !== -1) {
    html = html.substring(0, insertionPoint) + activityScreenHtml + html.substring(insertionPoint);
} else {
    // fallback
    html = html.replace('</body>', activityScreenHtml + '\n</body>');
}

fs.writeFileSync('quiz.html', html, 'utf8');
console.log("Activity screen added successfully.");
