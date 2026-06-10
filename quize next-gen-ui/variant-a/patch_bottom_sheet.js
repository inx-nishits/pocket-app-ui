const fs = require('fs');

let html = fs.readFileSync('quiz.html', 'utf8');

// Find the start of #view-activity
const startIndex = html.indexOf('<!-- Screen: Activity History -->');
const endIndex = html.indexOf('</div>\n</body>'); // The end of the document, where we injected it before

if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
    // We will extract everything from startIndex to endIndex (which is the old view-activity)
    const oldScreen = html.substring(startIndex, endIndex);

    // Let's create the new bottom sheet HTML
    const bottomSheetHtml = `
    <!-- Activity Bottom Sheet -->
    <div class="achieve-bottom-sheet-backdrop" id="activity-sheet-backdrop" style="display: none; opacity: 0; transition: opacity 0.3s ease; z-index: 9999;" onclick="hideActivitySheet()"></div>
    <div class="achieve-bottom-sheet" id="activity-sheet" style="display: block; max-width: 414px; margin: 0 auto; left: 0; right: 0; z-index: 10000; transform: translateY(100%); padding: 16px 20px 34px;">
        <div class="achieve-sheet-handle" style="width: 40px; height: 4px; background: #e2e8f0; border-radius: 2px; margin: 0 auto 20px;"></div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
            <h2 style="margin: 0; font-size: 20px; font-weight: 800; color: var(--text-primary);">Activity History</h2>
            <button onclick="hideActivitySheet()" style="background: rgba(0,0,0,0.05); border: none; width: 32px; height: 32px; border-radius: 16px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px; color: var(--text-secondary);"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        </div>

        <div style="max-height: 60vh; overflow-y: auto; padding-right: 4px; padding-bottom: 20px;">
            <div class="card premium-card" style="padding: 0; overflow: hidden; margin-bottom: 0; border: 1px solid rgba(0,0,0,0.05); box-shadow: none;">
                
                <!-- Activity 1 -->
                <div style="display: flex; align-items: center; padding: 16px; border-bottom: 1px solid rgba(0,0,0,0.05); gap: 12px;">
                    <div style="width: 40px; height: 40px; border-radius: 12px; background: rgba(70, 107, 169, 0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f4dd.png" style="width: 20px; height: 20px; object-fit: contain;">
                    </div>
                    <div style="flex: 1;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                            <span style="font-size: 14px; font-weight: 700; color: var(--text-primary); line-height: 1.2;">Completed Traffic Law Quiz</span>
                            <span style="font-size: 11px; font-weight: 600; color: var(--text-dim); flex-shrink: 0; padding-left: 8px;">2h ago</span>
                        </div>
                        <div style="font-size: 12px; font-weight: 500; color: var(--text-secondary);">
                            Scored 90% <span style="margin: 0 4px; color: var(--text-dim);">•</span> <span style="color: var(--accent-blue); font-weight: 700;">+45 XP</span>
                        </div>
                    </div>
                </div>

                <!-- Activity 2 -->
                <div style="display: flex; align-items: center; padding: 16px; border-bottom: 1px solid rgba(0,0,0,0.05); gap: 12px;">
                    <div style="width: 40px; height: 40px; border-radius: 12px; background: rgba(52, 199, 89, 0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/2694-fe0f.png" style="width: 20px; height: 20px; object-fit: contain;">
                    </div>
                    <div style="flex: 1;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                            <span style="font-size: 14px; font-weight: 700; color: var(--text-primary); line-height: 1.2;">Won Challenge</span>
                            <span style="font-size: 11px; font-weight: 600; color: var(--text-dim); flex-shrink: 0; padding-left: 8px;">Yesterday</span>
                        </div>
                        <div style="font-size: 12px; font-weight: 500; color: var(--text-secondary);">
                            vs Officer Jenkins <span style="margin: 0 4px; color: var(--text-dim);">•</span> <span style="color: var(--success); font-weight: 700;">+100 XP</span>
                        </div>
                    </div>
                </div>

                <!-- Activity 3 -->
                <div style="display: flex; align-items: center; padding: 16px; border-bottom: 1px solid rgba(0,0,0,0.05); gap: 12px;">
                    <div style="width: 40px; height: 40px; border-radius: 12px; background: rgba(245, 158, 11, 0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f3c5.png" style="width: 20px; height: 20px; object-fit: contain;">
                    </div>
                    <div style="flex: 1;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                            <span style="font-size: 14px; font-weight: 700; color: var(--text-primary); line-height: 1.2;">Earned Sharpshooter</span>
                            <span style="font-size: 11px; font-weight: 600; color: var(--text-dim); flex-shrink: 0; padding-left: 8px;">2d ago</span>
                        </div>
                        <div style="font-size: 12px; font-weight: 500; color: var(--text-secondary);">
                            10 Perfect Quizzes
                        </div>
                    </div>
                </div>
                
                <!-- Activity 4 -->
                <div style="display: flex; align-items: center; padding: 16px; border-bottom: 1px solid rgba(0,0,0,0.05); gap: 12px;">
                    <div style="width: 40px; height: 40px; border-radius: 12px; background: rgba(70, 107, 169, 0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f4dd.png" style="width: 20px; height: 20px; object-fit: contain;">
                    </div>
                    <div style="flex: 1;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                            <span style="font-size: 14px; font-weight: 700; color: var(--text-primary); line-height: 1.2;">Completed Evidence Law</span>
                            <span style="font-size: 11px; font-weight: 600; color: var(--text-dim); flex-shrink: 0; padding-left: 8px;">3d ago</span>
                        </div>
                        <div style="font-size: 12px; font-weight: 500; color: var(--text-secondary);">
                            Scored 85% <span style="margin: 0 4px; color: var(--text-dim);">•</span> <span style="color: var(--accent-blue); font-weight: 700;">+40 XP</span>
                        </div>
                    </div>
                </div>
                
                <!-- Activity 5 -->
                <div style="display: flex; align-items: center; padding: 16px; border-bottom: 1px solid rgba(0,0,0,0.05); gap: 12px;">
                    <div style="width: 40px; height: 40px; border-radius: 12px; background: rgba(139, 92, 246, 0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f31f.png" style="width: 20px; height: 20px; object-fit: contain;">
                    </div>
                    <div style="flex: 1;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                            <span style="font-size: 14px; font-weight: 700; color: var(--text-primary); line-height: 1.2;">Reached Level 11</span>
                            <span style="font-size: 11px; font-weight: 600; color: var(--text-dim); flex-shrink: 0; padding-left: 8px;">4d ago</span>
                        </div>
                        <div style="font-size: 12px; font-weight: 500; color: var(--text-secondary);">
                            Promoted to Senior <span style="margin: 0 4px; color: var(--text-dim);">•</span> <span style="color: #8b5cf6; font-weight: 700;">+500 XP</span>
                        </div>
                    </div>
                </div>
                
                <!-- Activity 6 -->
                <div style="display: flex; align-items: center; padding: 16px; border-bottom: 1px solid rgba(0,0,0,0.05); gap: 12px;">
                    <div style="width: 40px; height: 40px; border-radius: 12px; background: rgba(239, 68, 68, 0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f525.png" style="width: 20px; height: 20px; object-fit: contain;">
                    </div>
                    <div style="flex: 1;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                            <span style="font-size: 14px; font-weight: 700; color: var(--text-primary); line-height: 1.2;">7-Day Streak Achieved</span>
                            <span style="font-size: 11px; font-weight: 600; color: var(--text-dim); flex-shrink: 0; padding-left: 8px;">1w ago</span>
                        </div>
                        <div style="font-size: 12px; font-weight: 500; color: var(--text-secondary);">
                            Consistency Bonus <span style="margin: 0 4px; color: var(--text-dim);">•</span> <span style="color: #ef4444; font-weight: 700;">+50 XP</span>
                        </div>
                    </div>
                </div>
                
                <!-- Activity 7 -->
                <div style="display: flex; align-items: center; padding: 16px; gap: 12px;">
                    <div style="width: 40px; height: 40px; border-radius: 12px; background: rgba(100, 116, 139, 0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/2694-fe0f.png" style="width: 20px; height: 20px; object-fit: contain; filter: grayscale(100%) opacity(0.8);">
                    </div>
                    <div style="flex: 1;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                            <span style="font-size: 14px; font-weight: 700; color: var(--text-primary); line-height: 1.2;">Lost Challenge</span>
                            <span style="font-size: 11px; font-weight: 600; color: var(--text-dim); flex-shrink: 0; padding-left: 8px;">1w ago</span>
                        </div>
                        <div style="font-size: 12px; font-weight: 500; color: var(--text-secondary);">
                            vs Officer Davies <span style="margin: 0 4px; color: var(--text-dim);">•</span> <span style="color: var(--text-dim); font-weight: 700;">+10 XP</span>
                        </div>
                    </div>
                </div>

            </div>
            
            <div style="text-align: center; margin-top: 16px;">
                <span style="font-size: 12px; font-weight: 600; color: var(--text-dim);">End of recent history</span>
            </div>
        </div>
    </div>
    
    <script>
        function showActivitySheet() {
            const backdrop = document.getElementById('activity-sheet-backdrop');
            const sheet = document.getElementById('activity-sheet');
            if(backdrop && sheet) {
                backdrop.style.display = 'block';
                // Trigger reflow
                void backdrop.offsetWidth;
                backdrop.style.opacity = '1';
                sheet.style.transform = 'translateY(0)';
            }
        }
        function hideActivitySheet() {
            const backdrop = document.getElementById('activity-sheet-backdrop');
            const sheet = document.getElementById('activity-sheet');
            if(backdrop && sheet) {
                backdrop.style.opacity = '0';
                sheet.style.transform = 'translateY(100%)';
                setTimeout(() => {
                    backdrop.style.display = 'none';
                }, 300); // Wait for transition
            }
        }
    </script>
`;

    html = html.substring(0, startIndex) + bottomSheetHtml + '\n</div>\n</body>';

    // Update the button onclick
    html = html.replace(/onclick="QuizEngine\.navigate\('view-activity'\)"/g, 'onclick="showActivitySheet()"');

    fs.writeFileSync('quiz.html', html, 'utf8');
    console.log("Activity Bottom Sheet implemented.");
} else {
    console.log("Could not find view-activity block.");
}
