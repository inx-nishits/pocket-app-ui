const fs = require('fs');
const htmlPath = 'c:\\Users\\Moksha Patel\\Desktop\\pocket-app-ui 15\\pocket-app-ui\\pocket-app-ui\\quize next-gen-ui\\variant-a\\quiz.html';

let html = fs.readFileSync(htmlPath, 'utf8');

// The new HTML block adhering strictly to the native app design language
const newMockHtml = `
        <!-- Screen: Mock Exams Selection -->
        <div id="view-mock-exams" class="quiz-view">
            <div class="header-wrapper">
                <div class="header-inner">
                    <div class="header-left">
                        <button class="back-btn" onclick="QuizEngine.navigateBack()">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 19l-7-7 7-7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                        <h1 class="header-title">Mock Exams</h1>
                    </div>
                </div>
                <div style="padding: 0 20px 16px;">
                    <p style="font-size: 14px; color: rgba(255, 255, 255, 0.8); margin: 0;">Full timed simulations under exam conditions.</p>
                </div>
            </div>

            <div class="view-content" style="padding-top: 16px;">
                <div style="padding: 0 20px;">
                    <!-- Sergeant Exam -->
                    <div class="format-card" onclick="QuizEngine.startMockExam('Sergeant Exam')" style="flex-direction: column; align-items: stretch; padding: 20px; cursor: pointer; border: 1.5px solid rgba(15, 23, 42, 0.04); margin-bottom: 16px;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
                            <div>
                                <h3 style="font-size: 20px; font-weight: 700; color: #0f172a; margin: 0;">
                                        Sergeant Exam</h3>
                                
                            </div>
                            <span style="background: #eff6ff; color: #466ba9; font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 20px;">Official Format</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <div style="flex: 1;">
                                <div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Questions</div>
                                <div style="font-size: 16px; font-weight: 700; color: #0f172a;">150</div>
                            </div>
                            <div style="flex: 1;">
                                <div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Duration</div>
                                <div style="font-size: 16px; font-weight: 700; color: #0f172a;">3h 15m</div>
                            </div>
                            <div style="flex: 1;">
                                <div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Pass Mark</div>
                                <div style="font-size: 16px; font-weight: 700; color: #0f172a;">55%</div>
                            </div>
                        </div>
                    </div>

                    <!-- Inspector Exam -->
                    <div class="format-card" onclick="QuizEngine.startMockExam('Inspector Exam')" style="flex-direction: column; align-items: stretch; padding: 20px; cursor: pointer; border: 1.5px solid rgba(15, 23, 42, 0.04); margin-bottom: 16px;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
                            <div>
                                <h3 style="font-size: 20px; font-weight: 700; color: #0f172a; margin: 0;">
                                        Inspector Exam</h3>
                                
                            </div>
                            <span style="background: #eff6ff; color: #466ba9; font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 20px;">Official Format</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <div style="flex: 1;">
                                <div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Questions</div>
                                <div style="font-size: 16px; font-weight: 700; color: #0f172a;">150</div>
                            </div>
                            <div style="flex: 1;">
                                <div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Duration</div>
                                <div style="font-size: 16px; font-weight: 700; color: #0f172a;">3h 15m</div>
                            </div>
                            <div style="flex: 1;">
                                <div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Pass Mark</div>
                                <div style="font-size: 16px; font-weight: 700; color: #0f172a;">55%</div>
                            </div>
                        </div>
                    </div>

                    <!-- National Investigators Exam -->
                    <div class="format-card" onclick="QuizEngine.startMockExam('National Investigators Exam')" style="flex-direction: column; align-items: stretch; padding: 20px; cursor: pointer; border: 1.5px solid rgba(15, 23, 42, 0.04); margin-bottom: 32px;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
                            <div>
                                <h3 style="font-size: 20px; font-weight: 700; color: #0f172a; margin: 0;">
                                        National Investigators Exam</h3>
                                
                            </div>
                            <span style="background: #eff6ff; color: #466ba9; font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 20px;">Official Format</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <div style="flex: 1;">
                                <div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Questions</div>
                                <div style="font-size: 16px; font-weight: 700; color: #0f172a;">80</div>
                            </div>
                            <div style="flex: 1;">
                                <div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Duration</div>
                                <div style="font-size: 16px; font-weight: 700; color: #0f172a;">2h</div>
                            </div>
                            <div style="flex: 1;">
                                <div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Pass Mark</div>
                                <div style="font-size: 16px; font-weight: 700; color: #0f172a;">55%</div>
                            </div>
                        </div>
                    </div>

                    <!-- Future Exams Hidden --><div style="display: none;">
<!-- Future Exams -->
                    <div style="margin-bottom: 16px;">
                        <span style="font-size: 12px; font-weight: 700; color: #64748b; letter-spacing: 0.5px; text-transform: uppercase;">Future Exams &middot; Coming Soon</span>
                    </div>

                    <!-- Firearms -->
                    <div class="format-card" style="align-items: center; padding: 16px 20px; border: 1.5px solid rgba(15, 23, 42, 0.04); margin-bottom: 16px; opacity: 0.8;">
                        <div class="format-card-left" style="align-items: center; width: 100%;">
                            <div class="category-icon-top" style="background: #f1f5f9; color: #64748b; width: 44px; height: 44px; margin-bottom: 0; border-radius: 50%; flex-shrink: 0;">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            </div>
                            <div class="format-info" style="width: 100%;">
                                <h3 style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0 0 4px 0;">Firearms Assessment</h3>
                                <p style="font-size: 13px; color: #64748b; margin: 0;">Coming Soon</p>
                            </div>
                        </div>
                    </div>

                    <!-- Roads Policing -->
                    <div class="format-card" style="align-items: center; padding: 16px 20px; border: 1.5px solid rgba(15, 23, 42, 0.04); margin-bottom: 16px; opacity: 0.8;">
                        <div class="format-card-left" style="align-items: center; width: 100%;">
                            <div class="category-icon-top" style="background: #f1f5f9; color: #64748b; width: 44px; height: 44px; margin-bottom: 0; border-radius: 50%; flex-shrink: 0;">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            </div>
                            <div class="format-info" style="width: 100%;">
                                <h3 style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0 0 4px 0;">Roads Policing</h3>
                                <p style="font-size: 13px; color: #64748b; margin: 0;">Coming Soon</p>
                            </div>
                        </div>
                    </div>

                    <!-- Public Order -->
                    <div class="format-card" style="align-items: center; padding: 16px 20px; border: 1.5px solid rgba(15, 23, 42, 0.04); margin-bottom: 16px; opacity: 0.8;">
                        <div class="format-card-left" style="align-items: center; width: 100%;">
                            <div class="category-icon-top" style="background: #f1f5f9; color: #64748b; width: 44px; height: 44px; margin-bottom: 0; border-radius: 50%; flex-shrink: 0;">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            </div>
                            <div class="format-info" style="width: 100%;">
                                <h3 style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0 0 4px 0;">Public Order Command</h3>
                                <p style="font-size: 13px; color: #64748b; margin: 0;">Coming Soon</p>
                            </div>
                        </div>
                    </div>

                    <!-- FLO Exam -->
                    <div class="format-card" style="align-items: center; padding: 16px 20px; border: 1.5px solid rgba(15, 23, 42, 0.04); margin-bottom: 32px; opacity: 0.8;">
                        <div class="format-card-left" style="align-items: center; width: 100%;">
                            <div class="category-icon-top" style="background: #f1f5f9; color: #64748b; width: 44px; height: 44px; margin-bottom: 0; border-radius: 50%; flex-shrink: 0;">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            </div>
                            <div class="format-info" style="width: 100%;">
                                <h3 style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0 0 4px 0;">FLO Exam</h3>
                                <p style="font-size: 13px; color: #64748b; margin: 0;">Coming Soon</p>
                            </div>
                        </div>
                    </div>
                </div>
</div><!-- End Hidden Future Exams -->
            </div>
        </div>`;

// Find and replace the old view-mock-exams with the new one
const startMarker = '<!-- Screen: Mock Exams Selection -->';
const endMarker = '<!-- Screen: Practice Difficulty -->';

if (html.includes(startMarker) && html.includes(endMarker)) {
    const beforeStr = html.substring(0, html.indexOf(startMarker));
    const afterStr = html.substring(html.indexOf(endMarker));
    html = beforeStr + newMockHtml + '\\n\\n        ' + afterStr;
    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log('Successfully refactored Mock Exams UI to native style.');
} else {
    console.log('Error finding old mock exams UI.');
}
