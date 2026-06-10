const fs = require('fs');

let html = fs.readFileSync('quiz.html', 'utf8');

const startIndex = html.indexOf('<div class="view-content"', html.indexOf('id="view-profile"'));
const endIndex = html.indexOf('</div>\n    </div>\n\n</div>\n\n<script src="quiz.js"></script>');

if (startIndex === -1 || endIndex === -1) {
    console.error('Could not find start or end index.');
    process.exit(1);
}

const replacement = `<div class="view-content" style="padding: 16px 20px 100px; background: var(--bg-color);">
            
            <!-- SECTION 01: PROFILE HERO AREA -->
            <div class="card premium-card" style="text-align: center; padding: 32px 20px 24px; position: relative; margin-bottom: 24px;">
                <div style="position: absolute; top: 16px; right: 16px;">
                    <button class="icon-btn" style="background: rgba(0,0,0,0.04); border: none; padding: 8px; border-radius: 12px; cursor: pointer; transition: background 0.2s;" onclick="QuizEngine.showToast('Edit Profile (Coming Soon)')">
                        <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px;"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                </div>
                <div style="width: 100px; height: 100px; margin: 0 auto 16px; border-radius: 50%; padding: 4px; background: linear-gradient(135deg, var(--accent-blue), #60a5fa);">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200" alt="Officer Smith" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover; border: 3px solid #ffffff;">
                </div>
                <h2 style="font-size: 24px; font-weight: 800; color: var(--text-primary); margin: 0 0 4px; font-family: 'Poppins', sans-serif;">Officer Smith</h2>
                <p style="font-size: 14px; font-weight: 500; color: var(--text-secondary); margin: 0 0 24px;">Traffic Division • Senior Officer</p>
                
                <div style="display: flex; justify-content: center; gap: 24px; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 20px;">
                    <div style="display: flex; flex-direction: column; align-items: center;">
                        <span style="font-size: 11px; font-weight: 700; color: var(--text-dim); text-transform: uppercase; margin-bottom: 4px; letter-spacing: 0.5px;">Level</span>
                        <span style="font-size: 20px; font-weight: 800; color: var(--text-primary);">12</span>
                    </div>
                    <div style="width: 1px; background: rgba(0,0,0,0.05);"></div>
                    <div style="display: flex; flex-direction: column; align-items: center;">
                        <span style="font-size: 11px; font-weight: 700; color: var(--text-dim); text-transform: uppercase; margin-bottom: 4px; letter-spacing: 0.5px;">XP</span>
                        <span style="font-size: 20px; font-weight: 800; color: var(--accent-blue);">4,500</span>
                    </div>
                    <div style="width: 1px; background: rgba(0,0,0,0.05);"></div>
                    <div style="display: flex; flex-direction: column; align-items: center;">
                        <span style="font-size: 11px; font-weight: 700; color: var(--text-dim); text-transform: uppercase; margin-bottom: 4px; letter-spacing: 0.5px;">Rank</span>
                        <span style="font-size: 20px; font-weight: 800; color: var(--text-primary);">#4</span>
                    </div>
                </div>
            </div>

            <!-- SECTION 02: PROGRESS JOURNEY CARD -->
            <div class="card premium-card" style="margin-bottom: 32px; padding: 24px 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                    <h3 style="font-size: 16px; font-weight: 700; color: var(--text-primary); margin: 0;">Level 12 Journey</h3>
                    <span style="font-size: 14px; font-weight: 700; color: var(--accent-blue);">4,500 / 6,000 XP</span>
                </div>
                <div style="background: rgba(0,0,0,0.04); height: 12px; border-radius: 6px; overflow: hidden; margin-bottom: 24px; position: relative; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);">
                    <div style="background: var(--accent-blue); width: 75%; height: 100%; border-radius: 6px; transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);"></div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 20px; border-top: 1px solid rgba(0,0,0,0.05);">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 32px; height: 32px; border-radius: 10px; background: rgba(245, 158, 11, 0.1); display: flex; align-items: center; justify-content: center;">
                            <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f31f.png" style="width: 16px; height: 16px; object-fit: contain;">
                        </div>
                        <div style="display: flex; flex-direction: column;">
                            <span style="font-size: 11px; font-weight: 700; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px;">Upcoming Reward</span>
                            <span style="font-size: 13px; font-weight: 700; color: var(--text-primary);">Gold Badge Unlock</span>
                        </div>
                    </div>
                    <span style="font-size: 13px; font-weight: 600; color: var(--text-secondary);">1,500 XP Left</span>
                </div>
            </div>

            <!-- SECTION 03: QUIZ PERFORMANCE OVERVIEW -->
            <div class="section-title-wrapper mb-3" style="margin-bottom: 16px;">
                <h2 class="section-title">Performance Overview</h2>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                <div class="card premium-card" style="padding: 20px 16px; display: flex; align-items: center; gap: 16px;">
                    <div style="width: 48px; height: 48px; border-radius: 14px; background: rgba(52, 199, 89, 0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f4c8.png" style="width: 24px; height: 24px; object-fit: contain;">
                    </div>
                    <div>
                        <span style="display: block; font-size: 12px; font-weight: 600; color: var(--text-dim); margin-bottom: 4px;">Win Rate</span>
                        <span style="font-size: 24px; font-weight: 800; color: var(--text-primary);">68%</span>
                    </div>
                </div>
                <div class="card premium-card" style="padding: 20px 16px; display: flex; align-items: center; gap: 16px;">
                    <div style="width: 48px; height: 48px; border-radius: 14px; background: rgba(70, 107, 169, 0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f3af.png" style="width: 24px; height: 24px; object-fit: contain;">
                    </div>
                    <div>
                        <span style="display: block; font-size: 12px; font-weight: 600; color: var(--text-dim); margin-bottom: 4px;">Accuracy</span>
                        <span style="font-size: 24px; font-weight: 800; color: var(--text-primary);">84%</span>
                    </div>
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 32px;">
                <div class="card premium-card" style="padding: 16px 12px; text-align: center; display: flex; flex-direction: column; align-items: center;">
                    <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f3c6.png" style="width: 20px; height: 20px; object-fit: contain; margin-bottom: 8px;">
                    <span style="display: block; font-size: 11px; font-weight: 700; color: var(--text-dim); text-transform: uppercase; margin-bottom: 4px; letter-spacing: 0.5px;">Wins</span>
                    <span style="font-size: 20px; font-weight: 800; color: var(--text-primary);">42</span>
                </div>
                <div class="card premium-card" style="padding: 16px 12px; text-align: center; display: flex; flex-direction: column; align-items: center;">
                    <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f525.png" style="width: 20px; height: 20px; object-fit: contain; margin-bottom: 8px;">
                    <span style="display: block; font-size: 11px; font-weight: 700; color: var(--text-dim); text-transform: uppercase; margin-bottom: 4px; letter-spacing: 0.5px;">Streak</span>
                    <span style="font-size: 20px; font-weight: 800; color: var(--text-primary);">24</span>
                </div>
                <div class="card premium-card" style="padding: 16px 12px; text-align: center; display: flex; flex-direction: column; align-items: center;">
                    <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f4dd.png" style="width: 20px; height: 20px; object-fit: contain; margin-bottom: 8px;">
                    <span style="display: block; font-size: 11px; font-weight: 700; color: var(--text-dim); text-transform: uppercase; margin-bottom: 4px; letter-spacing: 0.5px;">Quizzes</span>
                    <span style="font-size: 20px; font-weight: 800; color: var(--text-primary);">142</span>
                </div>
            </div>

            <!-- SECTION 04: ACHIEVEMENTS SHOWCASE -->
            <div class="section-title-wrapper mb-3 flex-between" style="margin-bottom: 16px;">
                <h2 class="section-title">Achievements</h2>
                <button class="text-btn" onclick="QuizEngine.navigate('view-achievements')">View All</button>
            </div>
            <div class="card premium-card" style="margin-bottom: 32px; padding: 16px;">
                <div style="display: flex; gap: 12px;">
                    <div style="flex: 1; text-align: center; padding: 16px 8px; background: rgba(0,0,0,0.02); border-radius: 16px;">
                        <span style="display: block; font-size: 11px; font-weight: 700; color: var(--text-dim); text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.5px;">Recent</span>
                        <div style="width: 56px; height: 56px; margin: 0 auto; background: #ffffff; border-radius: 16px; box-shadow: var(--shadow-sm); display: flex; align-items: center; justify-content: center;">
                            <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f3af.png" style="width: 32px; height: 32px; object-fit: contain;">
                        </div>
                    </div>
                    <div style="flex: 1; text-align: center; padding: 16px 8px; background: rgba(245, 158, 11, 0.05); border: 1px solid rgba(245, 158, 11, 0.2); border-radius: 16px;">
                        <span style="display: block; font-size: 11px; font-weight: 700; color: #d97706; text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.5px;">Valuable</span>
                        <div style="width: 56px; height: 56px; margin: 0 auto; background: #ffffff; border-radius: 16px; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2); display: flex; align-items: center; justify-content: center;">
                            <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f3c6.png" style="width: 32px; height: 32px; object-fit: contain;">
                        </div>
                    </div>
                    <div style="flex: 1; text-align: center; padding: 16px 8px; background: rgba(0,0,0,0.02); border-radius: 16px;">
                        <span style="display: block; font-size: 11px; font-weight: 700; color: var(--text-dim); text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.5px;">Next Up</span>
                        <div style="width: 56px; height: 56px; margin: 0 auto; background: transparent; border: 2px dashed #cbd5e1; border-radius: 16px; display: flex; align-items: center; justify-content: center;">
                            <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f512.png" style="width: 24px; height: 24px; object-fit: contain; opacity: 0.4;">
                        </div>
                    </div>
                </div>
            </div>

            <!-- SECTION 05: LEADERBOARD STATUS -->
            <div class="section-title-wrapper" style="margin-bottom: 16px;">
                <h2 class="section-title">Leaderboard Status</h2>
            </div>
            <div class="card premium-card" onclick="QuizEngine.navigate('view-leaderboard')" style="cursor: pointer; margin-bottom: 32px; padding: 0;">
                <!-- Team Rank Row -->
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px; border-bottom: 1px solid rgba(0,0,0,0.05);">
                    <div style="display: flex; align-items: center; gap: 16px;">
                        <div style="width: 48px; height: 48px; border-radius: 14px; background: rgba(70, 107, 169, 0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                            <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f465.png" style="width: 24px; height: 24px; object-fit: contain;">
                        </div>
                        <div>
                            <span style="display: block; font-size: 15px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">Team Rank</span>
                            <span style="font-size: 13px; font-weight: 500; color: var(--text-secondary);">Top 5% of Department</span>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <span style="display: block; font-size: 24px; font-weight: 800; color: var(--text-primary); margin-bottom: 4px;">#4</span>
                        <span style="font-size: 12px; font-weight: 700; color: var(--success); display: flex; align-items: center; justify-content: flex-end; gap: 4px;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="width: 12px; height: 12px;"><polyline points="18 15 12 9 6 15"></polyline></svg> 2 Spots</span>
                    </div>
                </div>
                
                <!-- National Rank Row -->
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px;">
                    <div style="display: flex; align-items: center; gap: 16px;">
                        <div style="width: 48px; height: 48px; border-radius: 14px; background: rgba(148, 163, 184, 0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                            <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f30e.png" style="width: 24px; height: 24px; object-fit: contain;">
                        </div>
                        <div>
                            <span style="display: block; font-size: 15px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">National Rank</span>
                            <span style="font-size: 13px; font-weight: 500; color: var(--text-secondary);">Out of 12,000 officers</span>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <span style="display: block; font-size: 24px; font-weight: 800; color: var(--text-primary); margin-bottom: 4px;">#142</span>
                        <span style="font-size: 12px; font-weight: 700; color: var(--success); display: flex; align-items: center; justify-content: flex-end; gap: 4px;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="width: 12px; height: 12px;"><polyline points="18 15 12 9 6 15"></polyline></svg> 12 Spots</span>
                    </div>
                </div>
            </div>

            <!-- SECTION 06: MASTERY PROGRESS -->
            <div class="section-title-wrapper" style="margin-bottom: 16px;">
                <h2 class="section-title">Mastery Progress</h2>
            </div>
            <div class="card premium-card" style="margin-bottom: 32px; padding: 24px 20px;">
                <div style="margin-bottom: 24px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f6a8.png" style="width: 18px; height: 18px; object-fit: contain;">
                            <span style="font-size: 14px; font-weight: 700; color: var(--text-primary);">Traffic Law</span>
                        </div>
                        <span style="font-size: 15px; font-weight: 800; color: var(--text-primary);">92%</span>
                    </div>
                    <div style="background: rgba(0,0,0,0.04); height: 8px; border-radius: 4px; overflow: hidden;">
                        <div style="background: var(--accent-blue); width: 92%; height: 100%; border-radius: 4px;"></div>
                    </div>
                </div>
                <div style="margin-bottom: 24px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/26d3-fe0f.png" style="width: 18px; height: 18px; object-fit: contain;">
                            <span style="font-size: 14px; font-weight: 700; color: var(--text-primary);">Criminal Law</span>
                        </div>
                        <span style="font-size: 15px; font-weight: 800; color: var(--text-primary);">85%</span>
                    </div>
                    <div style="background: rgba(0,0,0,0.04); height: 8px; border-radius: 4px; overflow: hidden;">
                        <div style="background: var(--accent-blue); width: 85%; height: 100%; border-radius: 4px;"></div>
                    </div>
                </div>
                <div style="margin-bottom: 24px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f9ba.png" style="width: 18px; height: 18px; object-fit: contain;">
                            <span style="font-size: 14px; font-weight: 700; color: var(--text-primary);">Workplace Safety</span>
                        </div>
                        <span style="font-size: 15px; font-weight: 800; color: var(--text-primary);">78%</span>
                    </div>
                    <div style="background: rgba(0,0,0,0.04); height: 8px; border-radius: 4px; overflow: hidden;">
                        <div style="background: var(--accent-blue); width: 78%; height: 100%; border-radius: 4px;"></div>
                    </div>
                </div>
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f50d.png" style="width: 18px; height: 18px; object-fit: contain;">
                            <span style="font-size: 14px; font-weight: 700; color: var(--text-primary);">Evidence Law</span>
                        </div>
                        <span style="font-size: 15px; font-weight: 800; color: var(--text-primary);">65%</span>
                    </div>
                    <div style="background: rgba(0,0,0,0.04); height: 8px; border-radius: 4px; overflow: hidden;">
                        <div style="background: var(--accent-blue); width: 65%; height: 100%; border-radius: 4px;"></div>
                    </div>
                </div>
            </div>

            <!-- SECTION 07: RECENT ACTIVITY -->
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
            </div>
            
        </div>`;

const newHtml = html.substring(0, startIndex) + replacement + '\n' + html.substring(endIndex);
fs.writeFileSync('quiz.html', newHtml, 'utf8');
console.log('Successfully replaced Profile HTML structure.');
