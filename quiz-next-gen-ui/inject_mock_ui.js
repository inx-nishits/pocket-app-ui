const fs = require('fs');
const htmlPath = 'c:\\Users\\Moksha Patel\\Desktop\\pocket-app-ui 15\\pocket-app-ui\\pocket-app-ui\\quize next-gen-ui\\variant-a\\quiz.html';
const jsPath = 'c:\\Users\\Moksha Patel\\Desktop\\pocket-app-ui 15\\pocket-app-ui\\pocket-app-ui\\quize next-gen-ui\\variant-a\\quiz.js';

let html = fs.readFileSync(htmlPath, 'utf8');

const mockHtml = `
        <!-- Screen: Mock Exams Selection -->
        <div id="view-mock-exams" class="quiz-view">
            <div class="header-wrapper" style="background: var(--bg-color); border-bottom: none;">
                <div class="header-inner" style="flex-direction: column; align-items: flex-start; padding-bottom: 0;">
                    <div class="header-left" style="width: 100%; margin-bottom: 12px;">
                        <button class="back-btn" onclick="QuizEngine.navigateBack()" style="color: #0f172a;">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 19l-7-7 7-7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <h1 style="font-size: 32px; font-weight: 800; color: #0f172a; margin: 0 0 8px 0; letter-spacing: -0.5px;">Mock Exams</h1>
                    <p style="font-size: 15px; color: #64748b; margin: 0 0 16px 0;">Full timed simulations under exam conditions.</p>
                </div>
            </div>

            <div class="view-content" style="padding-top: 16px;">
                <!-- Active Mock Exams -->
                <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 40px;">
                    <!-- Sergeant Exam -->
                    <div class="format-card" onclick="QuizEngine.startMockExam('Sergeant Exam')" style="display: flex; flex-direction: column; padding: 20px; background: white; border-radius: 16px; border: 1px solid rgba(15,23,42,0.05); box-shadow: 0 4px 16px rgba(15,23,42,0.02); cursor: pointer; align-items: stretch; margin-bottom: 0;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                            <div>
                                <h3 style="font-size: 20px; font-weight: 700; color: #0f172a; margin: 0 0 6px 0;">Sergeant Exam</h3>
                                
                            </div>
                            <span style="background: #eff6ff; color: #2563eb; font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 20px;">Official Format</span>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; padding-top: 16px; border-top: 1.5px solid rgba(15, 23, 42, 0.04);">
                            <div>
                                <div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Questions</div>
                                <div style="font-size: 18px; font-weight: 700; color: #0f172a;">150</div>
                            </div>
                            <div>
                                <div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Duration</div>
                                <div style="font-size: 18px; font-weight: 700; color: #0f172a;">3h 15m</div>
                            </div>
                            <div>
                                <div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Pass Mark</div>
                                <div style="font-size: 18px; font-weight: 700; color: #0f172a;">55%</div>
                            </div>
                        </div>
                    </div>

                    <!-- Inspector Exam -->
                    <div class="format-card" onclick="QuizEngine.startMockExam('Inspector Exam')" style="display: flex; flex-direction: column; padding: 20px; background: white; border-radius: 16px; border: 1px solid rgba(15,23,42,0.05); box-shadow: 0 4px 16px rgba(15,23,42,0.02); cursor: pointer; align-items: stretch; margin-bottom: 0;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                            <div>
                                <h3 style="font-size: 20px; font-weight: 700; color: #0f172a; margin: 0 0 6px 0;">Inspector Exam</h3>
                                
                            </div>
                            <span style="background: #eff6ff; color: #2563eb; font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 20px;">Official Format</span>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; padding-top: 16px; border-top: 1.5px solid rgba(15, 23, 42, 0.04);">
                            <div>
                                <div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Questions</div>
                                <div style="font-size: 18px; font-weight: 700; color: #0f172a;">150</div>
                            </div>
                            <div>
                                <div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Duration</div>
                                <div style="font-size: 18px; font-weight: 700; color: #0f172a;">3h 15m</div>
                            </div>
                            <div>
                                <div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Pass Mark</div>
                                <div style="font-size: 18px; font-weight: 700; color: #0f172a;">55%</div>
                            </div>
                        </div>
                    </div>

                    <!-- National Investigators Exam -->
                    <div class="format-card" onclick="QuizEngine.startMockExam('National Investigators Exam')" style="display: flex; flex-direction: column; padding: 20px; background: white; border-radius: 16px; border: 1px solid rgba(15,23,42,0.05); box-shadow: 0 4px 16px rgba(15,23,42,0.02); cursor: pointer; align-items: stretch; margin-bottom: 0;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                            <div>
                                <h3 style="font-size: 20px; font-weight: 700; color: #0f172a; margin: 0 0 6px 0;">National Investigators Exam</h3>
                                
                            </div>
                            <span style="background: #eff6ff; color: #2563eb; font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 20px;">Official Format</span>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; padding-top: 16px; border-top: 1.5px solid rgba(15, 23, 42, 0.04);">
                            <div>
                                <div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Questions</div>
                                <div style="font-size: 18px; font-weight: 700; color: #0f172a;">80</div>
                            </div>
                            <div>
                                <div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Duration</div>
                                <div style="font-size: 18px; font-weight: 700; color: #0f172a;">2h</div>
                            </div>
                            <div>
                                <div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Pass Mark</div>
                                <div style="font-size: 18px; font-weight: 700; color: #0f172a;">55%</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Future Exams Hidden --><div style="display: none;">
<!-- Future Exams -->
                <div style="margin-bottom: 12px;">
                    <span style="font-size: 12px; font-weight: 700; color: #64748b; letter-spacing: 0.5px; text-transform: uppercase;">Future Exams &middot; Coming Soon</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 1px; background: rgba(15,23,42,0.05); border-radius: 16px; overflow: hidden; border: 1px solid rgba(15,23,42,0.05); margin-bottom: 40px;">
                    <!-- Firearms -->
                    <div style="display: flex; align-items: center; padding: 16px 20px; background: white;">
                        <div style="width: 40px; height: 40px; border-radius: 50%; background: #64748b; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        </div>
                        <div>
                            <h3 style="font-size: 16px; font-weight: 600; color: #0f172a; margin: 0 0 4px 0;">Firearms Assessment</h3>
                            <p style="font-size: 13px; color: #64748b; margin: 0;">Coming Soon</p>
                        </div>
                    </div>
                    <!-- Roads Policing -->
                    <div style="display: flex; align-items: center; padding: 16px 20px; background: white;">
                        <div style="width: 40px; height: 40px; border-radius: 50%; background: #64748b; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        </div>
                        <div>
                            <h3 style="font-size: 16px; font-weight: 600; color: #0f172a; margin: 0 0 4px 0;">Roads Policing</h3>
                            <p style="font-size: 13px; color: #64748b; margin: 0;">Coming Soon</p>
                        </div>
                    </div>
                    <!-- Public Order -->
                    <div style="display: flex; align-items: center; padding: 16px 20px; background: white;">
                        <div style="width: 40px; height: 40px; border-radius: 50%; background: #64748b; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        </div>
                        <div>
                            <h3 style="font-size: 16px; font-weight: 600; color: #0f172a; margin: 0 0 4px 0;">Public Order Command</h3>
                            <p style="font-size: 13px; color: #64748b; margin: 0;">Coming Soon</p>
                        </div>
                    </div>
                    <!-- FLO Exam -->
                    <div style="display: flex; align-items: center; padding: 16px 20px; background: white;">
                        <div style="width: 40px; height: 40px; border-radius: 50%; background: #64748b; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        </div>
                        <div>
                            <h3 style="font-size: 16px; font-weight: 600; color: #0f172a; margin: 0 0 4px 0;">FLO Exam</h3>
                            <p style="font-size: 13px; color: #64748b; margin: 0;">Coming Soon</p>
                        </div>
                    </div>
                </div>
</div><!-- End Hidden Future Exams -->

            </div>
        </div>
`;

// Insert HTML before view-practice-difficulty
if (!html.includes('id="view-mock-exams"')) {
    const splitStr = '<div id="view-practice-difficulty" class="quiz-view">';
    if (html.includes(splitStr)) {
        html = html.split(splitStr).join(mockHtml + '\n        ' + splitStr);
        fs.writeFileSync(htmlPath, html, 'utf8');
        console.log('Injected HTML successfully');
    } else {
        console.log('Error finding injection point in HTML');
    }
} else {
    console.log('HTML already injected.');
}


let js = fs.readFileSync(jsPath, 'utf8');

// Replace startFlow logic to route to mock exams instead of category
const oldMockFlow = `        } else if (flowName === 'mixed') {`;
const newMockFlow = `        } else if (flowName === 'mock') {
            this.navigate('view-mock-exams');
        } else if (flowName === 'mixed') {`;
if (js.includes(oldMockFlow) && !js.includes("flowName === 'mock'")) {
    js = js.replace(oldMockFlow, newMockFlow);
}

// Add startMockExam function
const newFn = `
    startMockExam: function(examName) {
        this.selectedCategory = examName;
        this.currentFormat = 'Mock Exam';
        this.currentMode = 'Mock Exam';
        this.navigate('view-active');
    },
`;

if (!js.includes('startMockExam:')) {
    const insertPoint = `startFlow: function(flowName) {`;
    js = js.replace(insertPoint, newFn + '\n    ' + insertPoint);
    fs.writeFileSync(jsPath, js, 'utf8');
    console.log('Injected JS successfully');
} else {
    console.log('JS already injected.');
}

