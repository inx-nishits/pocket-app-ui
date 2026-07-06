const fs = require('fs');

const path = 'quiz.html';
const content = fs.readFileSync(path, 'utf8');

const startMarker = '<h1 class="header-title">My Progress</h1>\\s*</div>\\s*</div>\\s*</div>';
const endMarker = '<!-- Screen 7: Quiz Analytics -->';

const regex = new RegExp(`(${startMarker})[\\s\\S]*?(?=\\s*${endMarker})`);

const newHTML = `
            <div class="view-content" style="padding-top: 16px; padding-bottom: 120px;">

                <!-- Settings Header / Toggles -->
                <div class="format-card" style="padding: 16px; margin-bottom: 16px; background: white; border-radius: 16px; border: 1.5px solid rgba(15, 23, 42, 0.04);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                        <span style="font-size: 15px; font-weight: 700; color: #0f172a; display: flex; align-items: center; gap: 8px;">
                            <span style="background: #fff7ed; width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center;">🔥</span>
                            Study Streak Tracker
                        </span>
                        <label class="toggle-switch">
                            <input type="checkbox" checked id="toggle-streak">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 15px; font-weight: 700; color: #0f172a; display: flex; align-items: center; gap: 8px;">
                            <span style="background: #eff6ff; width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center;">🔔</span>
                            Study Reminders
                        </span>
                        <label class="toggle-switch">
                            <input type="checkbox" checked id="toggle-notifications">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                </div>

                <!-- Exam Readiness -->
                <div class="format-card" style="padding: 24px 20px; text-align: center; margin-bottom: 16px; background: white; border-radius: 16px; border: 1.5px solid rgba(15, 23, 42, 0.04);">
                    <h3 style="font-size: 14px; font-weight: 700; color: #64748b; margin: 0 0 20px 0; text-transform: uppercase; letter-spacing: 0.5px;">Sergeant Exam Readiness</h3>
                    <div style="position: relative; width: 140px; height: 140px; margin: 0 auto 24px auto;">
                        <svg viewBox="0 0 36 36" style="width: 100%; height: 100%; transform: rotate(-90deg);">
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f1f5f9" stroke-width="3"></path>
                            <path id="readiness-gauge" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10b981" stroke-width="3.5" stroke-dasharray="68, 100" stroke-linecap="round"></path>
                        </svg>
                        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                            <span id="readiness-score" style="font-size: 32px; font-weight: 800; color: #0f172a; line-height: 1; margin-bottom: 4px;">68%</span>
                            <span id="readiness-status" style="font-size: 12px; font-weight: 700; color: #10b981; background: #ecfdf5; padding: 2px 8px; border-radius: 12px;">Developing</span>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: center; gap: 32px;">
                        <div style="text-align: center;">
                            <div style="font-size: 12px; font-weight: 600; color: #64748b; margin-bottom: 6px; text-transform: uppercase;">Current Target</div>
                            <div style="font-size: 18px; font-weight: 800; color: #0f172a;">75%</div>
                        </div>
                        <div style="width: 1px; background: #e2e8f0;"></div>
                        <div style="text-align: center;">
                            <div style="font-size: 12px; font-weight: 600; color: #64748b; margin-bottom: 6px; text-transform: uppercase;">Current Gap</div>
                            <div id="readiness-gap" style="font-size: 18px; font-weight: 800; color: #ef4444;">-7%</div>
                        </div>
                    </div>
                </div>

                <!-- Progress Chart -->
                <div class="format-card" style="padding: 20px; margin-bottom: 16px; background: white; border-radius: 16px; border: 1.5px solid rgba(15, 23, 42, 0.04);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h3 style="font-size: 17px; font-weight: 700; color: #0f172a; margin: 0; display: flex; align-items: center; gap: 8px;">
                            <span style="background: #eff6ff; width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center;">📈</span>
                            Performance Trend
                        </h3>
                        
                        <div style="background: #f1f5f9; padding: 4px; border-radius: 8px; display: flex;">
                            <button id="chart-btn-recent" onclick="QuizEngine.toggleChartMode('recent')" style="padding: 6px 12px; font-size: 12px; font-weight: 600; border-radius: 6px; border: none; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1); color: #0f172a; cursor: pointer; transition: all 0.2s;">Recent</button>
                            <button id="chart-btn-all" onclick="QuizEngine.toggleChartMode('all')" style="padding: 6px 12px; font-size: 12px; font-weight: 600; border-radius: 6px; border: none; background: transparent; color: #64748b; cursor: pointer; transition: all 0.2s;">All</button>
                        </div>
                    </div>
                    
                    <div style="position: relative; height: 220px; width: 100%;">
                        <canvas id="progressChart"></canvas>
                    </div>
                </div>

                <!-- AI Focus Topic Revision -->
                <div class="format-card" style="padding: 20px; margin-bottom: 16px; background: linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%); border-radius: 16px; border: 1.5px solid rgba(59, 130, 246, 0.2);">
                    <h3 style="font-size: 17px; font-weight: 700; color: #0f172a; margin: 0 0 12px 0; display: flex; align-items: center; gap: 8px;">
                        <span style="background: #dbeafe; width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px;">🤖</span>
                        AI Focus Tutor
                    </h3>
                    <p style="font-size: 13px; color: #475569; margin: 0 0 16px 0; line-height: 1.5;">Based on your recent mock exams, our AI has identified your weakest subjects. Target these now to maximize score improvement.</p>
                    
                    <div id="ai-weak-subjects-container" style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px;">
                        <!-- Injected via JS -->
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <div style="font-size: 12px; font-weight: 600; color: #64748b; margin-bottom: 10px;">Select Practice Length:</div>
                        <div style="display: flex; gap: 8px;">
                            <button class="ai-count-btn selected" onclick="QuizEngine.setAiCount(10)" data-count="10" style="flex: 1; padding: 10px 0; border-radius: 10px; border: 2px solid #3b82f6; background: #eff6ff; color: #466ba9; font-weight: 700; font-size: 13px; cursor: pointer; transition: all 0.2s;">10 Qs</button>
                            <button class="ai-count-btn" onclick="QuizEngine.setAiCount(20)" data-count="20" style="flex: 1; padding: 10px 0; border-radius: 10px; border: 2px solid #e2e8f0; background: white; color: #64748b; font-weight: 600; font-size: 13px; cursor: pointer; transition: all 0.2s;">20 Qs</button>
                            <button class="ai-count-btn" onclick="QuizEngine.setAiCount(30)" data-count="30" style="flex: 1; padding: 10px 0; border-radius: 10px; border: 2px solid #e2e8f0; background: white; color: #64748b; font-weight: 600; font-size: 13px; cursor: pointer; transition: all 0.2s;">30 Qs</button>
                        </div>
                    </div>

                    <button onclick="QuizEngine.startAiPractice()" style="background: #466ba9; color: white; width: 100%; padding: 16px; border-radius: 12px; font-size: 15px; font-weight: 700; border: none; cursor: pointer; box-shadow: 0 4px 12px rgba(70, 107, 169, 0.25); transition: background 0.2s;">
                        Start AI Focus Session
                    </button>
                </div>

                <!-- Topic Performance Breakdown -->
                <div class="format-card" style="padding: 20px; margin-bottom: 16px; background: white; border-radius: 16px; border: 1.5px solid rgba(15, 23, 42, 0.04);">
                    <h3 style="font-size: 17px; font-weight: 700; color: #0f172a; margin: 0 0 20px 0; display: flex; align-items: center; gap: 8px;">
                        <span style="background: #eff6ff; width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center;">📚</span>
                        Topic Performance Breakdown
                    </h3>
                    <div id="topic-performance-list" style="display: flex; flex-direction: column; gap: 20px;">
                        <!-- Injected via JS -->
                    </div>
                </div>

                <!-- Focus Areas -->
                <div class="format-card" style="padding: 20px; margin-bottom: 16px; background: white; border-radius: 16px; border: 1.5px solid rgba(15, 23, 42, 0.04);">
                    <h3 style="font-size: 17px; font-weight: 700; color: #0f172a; margin: 0 0 8px 0; display: flex; align-items: center; gap: 8px;">
                        <span style="background: #fef2f2; width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center;">⚠️</span>
                        Deep Dive Focus Areas
                    </h3>
                    <p style="font-size: 13px; color: #64748b; margin: 0 0 20px 0;">Tap a card to jump directly to specific topic revision.</p>
                    <div id="focus-areas-list" style="display: flex; flex-direction: column; gap: 12px;">
                        <!-- Injected via JS -->
                    </div>
                </div>

                <!-- Statistics & Activity -->
                <div class="format-card" style="padding: 20px; margin-bottom: 16px; background: white; border-radius: 16px; border: 1.5px solid rgba(15, 23, 42, 0.04);">
                    <h3 style="font-size: 17px; font-weight: 700; color: #0f172a; margin: 0 0 20px 0; display: flex; align-items: center; gap: 8px;">
                        <span style="background: #eff6ff; width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center;">📊</span>
                        Statistics & Study Activity
                    </h3>

                    <div style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">Accuracy Metrics</div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px;">
                        <div style="background: #f8fafc; padding: 16px; border-radius: 12px; border: 1px solid rgba(15,23,42,0.02); display: flex; flex-direction: column; justify-content: center;">
                            <div style="font-size: 11px; color: #64748b; font-weight: 600; margin-bottom: 4px;">Overall Accuracy</div>
                            <div style="font-size: 20px; font-weight: 800; color: #0f172a;">74%</div>
                        </div>
                        <div style="background: #f8fafc; padding: 16px; border-radius: 12px; border: 1px solid rgba(15,23,42,0.02); display: flex; flex-direction: column; justify-content: center;">
                            <div style="font-size: 11px; color: #64748b; font-weight: 600; margin-bottom: 4px;">Avg Response Time</div>
                            <div style="font-size: 20px; font-weight: 800; color: #0f172a;">14 sec</div>
                        </div>
                        <div style="background: #f8fafc; padding: 16px; border-radius: 12px; border: 1px solid rgba(15,23,42,0.02); display: flex; flex-direction: column; justify-content: center;">
                            <div style="font-size: 11px; color: #64748b; font-weight: 600; margin-bottom: 4px;">Questions Attempted</div>
                            <div style="font-size: 20px; font-weight: 800; color: #0f172a;">2,450</div>
                        </div>
                        <div style="background: #f8fafc; padding: 16px; border-radius: 12px; border: 1px solid rgba(15,23,42,0.02); display: flex; flex-direction: column; justify-content: center;">
                            <div style="font-size: 11px; color: #64748b; font-weight: 600; margin-bottom: 4px;">Correct Answers</div>
                            <div style="font-size: 20px; font-weight: 800; color: #10b981;">1,813</div>
                        </div>
                    </div>

                    <div style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">Study Activity</div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
                        <div style="background: #f8fafc; padding: 12px 8px; border-radius: 12px; border: 1px solid rgba(15,23,42,0.02); text-align: center;">
                            <div style="font-size: 11px; color: #64748b; font-weight: 600; margin-bottom: 6px;">Days Active</div>
                            <div style="font-size: 18px; font-weight: 800; color: #0f172a;">23</div>
                        </div>
                        <div style="background: #f8fafc; padding: 12px 8px; border-radius: 12px; border: 1px solid rgba(15,23,42,0.02); text-align: center;">
                            <div style="font-size: 11px; color: #64748b; font-weight: 600; margin-bottom: 6px;">Streak</div>
                            <div style="font-size: 18px; font-weight: 800; color: #e11d48;">8 Days</div>
                        </div>
                        <div style="background: #f8fafc; padding: 12px 8px; border-radius: 12px; border: 1px solid rgba(15,23,42,0.02); text-align: center;">
                            <div style="font-size: 11px; color: #64748b; font-weight: 600; margin-bottom: 6px;">Hours Studied</div>
                            <div style="font-size: 18px; font-weight: 800; color: #466ba9; white-space: nowrap;">18.5h</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
`;

if (content.match(regex)) {
    const updated = content.replace(regex, '$1\\n' + newHTML);
    fs.writeFileSync(path, updated);
    console.log('HTML Replaced Successfully!');
} else {
    console.error('Regex did not match.');
}
