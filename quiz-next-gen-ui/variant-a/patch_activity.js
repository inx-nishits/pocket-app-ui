const fs = require('fs');

let html = fs.readFileSync('quiz.html', 'utf8');

const targetStr = `<!-- SECTION 07: RECENT ACTIVITY -->
            <div class="section-title-wrapper flex-between" style="margin-bottom: 16px;">
                <h2 class="section-title">Recent Activity</h2>
                <button class="text-btn" onclick="QuizEngine.showToast('Activity History (Coming Soon)')">View All</button>
            </div>
            <div style="padding-left: 8px;">
                <!-- Activity 1 -->
                <div style="display: flex; gap: 16px; margin-bottom: 24px; position: relative;">
                    <div style="position: absolute; left: 23px; top: 48px; bottom: -24px; width: 2px; background: rgba(0,0,0,0.05);"></div>
                    <div style="width: 48px; height: 48px; border-radius: 14px; background: rgba(70, 107, 169, 0.1); display: flex; align-items: center; justify-content: center; z-index: 1; flex-shrink: 0;">
                        <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f4dd.png" style="width: 24px; height: 24px; object-fit: contain;">
                    </div>
                    <div class="card premium-card" style="flex: 1; padding: 16px 20px; margin: 0;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                            <h4 style="margin: 0; font-size: 15px; font-weight: 700; color: var(--text-primary);">Completed Traffic Law Quiz</h4>
                            <span style="font-size: 11px; font-weight: 600; color: var(--text-dim); flex-shrink: 0;">2h ago</span>
                        </div>
                        <p style="margin: 0; font-size: 14px; color: var(--text-secondary); font-weight: 500;">Scored 90% • <span style="color: var(--accent-blue); font-weight: 700;">+45 XP</span></p>
                    </div>
                </div>

                <!-- Activity 2 -->
                <div style="display: flex; gap: 16px; margin-bottom: 24px; position: relative;">
                    <div style="position: absolute; left: 23px; top: 48px; bottom: -24px; width: 2px; background: rgba(0,0,0,0.05);"></div>
                    <div style="width: 48px; height: 48px; border-radius: 14px; background: rgba(52, 199, 89, 0.1); display: flex; align-items: center; justify-content: center; z-index: 1; flex-shrink: 0;">
                        <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/2694-fe0f.png" style="width: 24px; height: 24px; object-fit: contain;">
                    </div>
                    <div class="card premium-card" style="flex: 1; padding: 16px 20px; margin: 0;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                            <h4 style="margin: 0; font-size: 15px; font-weight: 700; color: var(--text-primary);">Won Challenge</h4>
                            <span style="font-size: 11px; font-weight: 600; color: var(--text-dim); flex-shrink: 0;">Yesterday</span>
                        </div>
                        <p style="margin: 0; font-size: 14px; color: var(--text-secondary); font-weight: 500;">vs Officer Jenkins • <span style="color: var(--success); font-weight: 700;">+100 XP</span></p>
                    </div>
                </div>

                <!-- Activity 3 -->
                <div style="display: flex; gap: 16px;">
                    <div style="width: 48px; height: 48px; border-radius: 14px; background: rgba(245, 158, 11, 0.1); display: flex; align-items: center; justify-content: center; z-index: 1; flex-shrink: 0;">
                        <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f3c5.png" style="width: 24px; height: 24px; object-fit: contain;">
                    </div>
                    <div class="card premium-card" style="flex: 1; padding: 16px 20px; margin: 0;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                            <h4 style="margin: 0; font-size: 15px; font-weight: 700; color: var(--text-primary);">Earned Sharpshooter</h4>
                            <span style="font-size: 11px; font-weight: 600; color: var(--text-dim); flex-shrink: 0;">2d ago</span>
                        </div>
                        <p style="margin: 0; font-size: 14px; color: var(--text-secondary); font-weight: 500;">10 Perfect Quizzes</p>
                    </div>
                </div>
            </div>`;

const replacementStr = `<!-- SECTION 07: RECENT ACTIVITY -->
            <div class="section-title-wrapper" style="margin-bottom: 16px;">
                <h2 class="section-title">Recent Activity</h2>
            </div>
            
            <div class="card premium-card" style="margin-bottom: 32px; padding: 0; overflow: hidden;">
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
                
                <!-- View All Row -->
                <div onclick="QuizEngine.showToast('Activity History (Coming Soon)')" style="padding: 16px; text-align: center; cursor: pointer; transition: background 0.2s; background: transparent;" onmouseover="this.style.background='rgba(0,0,0,0.02)'" onmouseout="this.style.background='transparent'">
                    <span style="font-size: 14px; font-weight: 700; color: var(--accent-blue);">View All Activity</span>
                </div>
            </div>`;

html = html.replace(targetStr, replacementStr);

fs.writeFileSync('quiz.html', html, 'utf8');
console.log("Recent Activity redesigned successfully.");
