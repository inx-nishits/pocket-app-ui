const fs = require('fs');
const path = 'c:\\Users\\Moksha Patel\\Desktop\\pocket-app-ui 15\\pocket-app-ui\\pocket-app-ui\\quize next-gen-ui\\variant-a\\quiz.html';

let content = fs.readFileSync(path, 'utf8');

const startStr = '<!-- Screen: Practice By Topic -->';
const endStr = '<!-- Screen: Quiz Format Selection -->';

const startIndex = content.indexOf(startStr);
const endIndex = content.indexOf(endStr);

if (startIndex === -1 || endIndex === -1) {
    console.log("Could not find start or end markers");
    process.exit(1);
}

const newSection = `<!-- Screen: Practice By Topic -->
        <div id="view-practice-topic" class="quiz-view" style="background: #f8fafc;">
            <div class="header-wrapper" style="background: white; border-bottom: 1px solid #e2e8f0; padding: 12px 16px;">
                <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
                    <button class="back-btn" onclick="QuizEngine.navigateBack()" style="color: #3b82f6; font-size: 16px; font-weight: 500; display: flex; align-items: center; background: none; border: none; padding: 0; width: 60px; justify-content: flex-start;">
                        <svg viewBox="0 0 24 24" fill="none" style="width: 22px; height: 22px; margin-right: 2px;">
                            <path d="M15 19l-7-7 7-7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        Back
                    </button>
                    <h1 style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0; flex: 1; text-align: center;">Select Topic</h1>
                    <div style="width: 60px;"></div> <!-- Spacer for centering -->
                </div>
            </div>
            
            <div class="view-content" style="padding: 20px 16px;">
                <h1 style="font-size: 32px; font-weight: 800; color: #0f172a; margin: 0 0 8px 0; letter-spacing: -0.5px;">Topics</h1>
                <p id="practice-topic-subtitle" style="font-size: 14px; color: #64748b; margin: 0 0 24px 0;">Sergeant Exam &middot; Tap a topic to continue.</p>

                <div style="background: white; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.02); overflow: hidden; border: 1px solid #f1f5f9;">
                    
                    <!-- Criminal Law -->
                    <div onclick="QuizEngine.handleCategorySelection('Criminal Law')" style="display: flex; align-items: flex-start; padding: 16px; border-bottom: 1px solid #f1f5f9; cursor: pointer;">
                        <div style="width: 36px; height: 36px; border-radius: 50%; background: #466ba9; color: white; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0; margin-top: 2px;">
                            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px;"><path d="M12 3v18M3 7h18M5 7v6a7 7 0 0 0 14 0V7"/></svg>
                        </div>
                        <div style="flex: 1;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
                                <h3 style="font-size: 16px; font-weight: 500; color: #0f172a; margin: 0;">Criminal Law</h3>
                                <div style="display: flex; align-items: center;">
                                    <span style="font-size: 13px; color: #64748b; margin-right: 4px;">72%</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                </div>
                            </div>
                            <p style="font-size: 13px; color: #64748b; margin: 0 0 10px 0;">Theft, offences against persons</p>
                            <div style="height: 4px; background: #e2e8f0; border-radius: 2px; width: 100%; overflow: hidden;">
                                <div style="height: 100%; background: #22c55e; width: 72%; border-radius: 2px;"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Evidence -->
                    <div onclick="QuizEngine.handleCategorySelection('Evidence')" style="display: flex; align-items: flex-start; padding: 16px; border-bottom: 1px solid #f1f5f9; cursor: pointer;">
                        <div style="width: 36px; height: 36px; border-radius: 50%; background: #7c3aed; color: white; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0; margin-top: 2px;">
                            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><circle cx="10" cy="13" r="2"/><line x1="11.4" y1="14.4" x2="13" y2="16"/></svg>
                        </div>
                        <div style="flex: 1;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
                                <h3 style="font-size: 16px; font-weight: 500; color: #0f172a; margin: 0;">Evidence</h3>
                                <div style="display: flex; align-items: center;">
                                    <span style="font-size: 13px; color: #64748b; margin-right: 4px;">58%</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                </div>
                            </div>
                            <p style="font-size: 13px; color: #64748b; margin: 0 0 10px 0;">Admissibility, hearsay, bad character</p>
                            <div style="height: 4px; background: #e2e8f0; border-radius: 2px; width: 100%; overflow: hidden;">
                                <div style="height: 100%; background: #3b82f6; width: 58%; border-radius: 2px;"></div>
                            </div>
                        </div>
                    </div>

                    <!-- PACE -->
                    <div onclick="QuizEngine.handleCategorySelection('PACE')" style="display: flex; align-items: flex-start; padding: 16px; border-bottom: 1px solid #f1f5f9; cursor: pointer;">
                        <div style="width: 36px; height: 36px; border-radius: 50%; background: #0d9488; color: white; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0; margin-top: 2px;">
                            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        </div>
                        <div style="flex: 1;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
                                <h3 style="font-size: 16px; font-weight: 500; color: #0f172a; margin: 0;">PACE</h3>
                                <div style="display: flex; align-items: center;">
                                    <span style="font-size: 13px; color: #64748b; margin-right: 4px;">81%</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                </div>
                            </div>
                            <p style="font-size: 13px; color: #64748b; margin: 0 0 10px 0;">Powers, detention, search</p>
                            <div style="height: 4px; background: #e2e8f0; border-radius: 2px; width: 100%; overflow: hidden;">
                                <div style="height: 100%; background: #22c55e; width: 81%; border-radius: 2px;"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Disclosure -->
                    <div onclick="QuizEngine.handleCategorySelection('Disclosure')" style="display: flex; align-items: flex-start; padding: 16px; border-bottom: 1px solid #f1f5f9; cursor: pointer;">
                        <div style="width: 36px; height: 36px; border-radius: 50%; background: #16a34a; color: white; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0; margin-top: 2px;">
                            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                        </div>
                        <div style="flex: 1;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
                                <h3 style="font-size: 16px; font-weight: 500; color: #0f172a; margin: 0;">Disclosure</h3>
                                <div style="display: flex; align-items: center;">
                                    <span style="font-size: 13px; color: #64748b; margin-right: 4px;">44%</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                </div>
                            </div>
                            <p style="font-size: 13px; color: #64748b; margin: 0 0 10px 0;">CPIA 1996, schedules, MG6</p>
                            <div style="height: 4px; background: #e2e8f0; border-radius: 2px; width: 100%; overflow: hidden;">
                                <div style="height: 100%; background: #f59e0b; width: 44%; border-radius: 2px;"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Fraud -->
                    <div onclick="QuizEngine.handleCategorySelection('Fraud')" style="display: flex; align-items: flex-start; padding: 16px; border-bottom: 1px solid #f1f5f9; cursor: pointer;">
                        <div style="width: 36px; height: 36px; border-radius: 50%; background: #f59e0b; color: white; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0; margin-top: 2px;">
                            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px;"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
                        </div>
                        <div style="flex: 1;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
                                <h3 style="font-size: 16px; font-weight: 500; color: #0f172a; margin: 0;">Fraud</h3>
                                <div style="display: flex; align-items: center;">
                                    <span style="font-size: 13px; color: #64748b; margin-right: 4px;">65%</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                </div>
                            </div>
                            <p style="font-size: 13px; color: #64748b; margin: 0 0 10px 0;">Fraud Act 2006, deception</p>
                            <div style="height: 4px; background: #e2e8f0; border-radius: 2px; width: 100%; overflow: hidden;">
                                <div style="height: 100%; background: #3b82f6; width: 65%; border-radius: 2px;"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Homicide -->
                    <div onclick="QuizEngine.handleCategorySelection('Homicide')" style="display: flex; align-items: flex-start; padding: 16px; cursor: pointer;">
                        <div style="width: 36px; height: 36px; border-radius: 50%; background: #ef4444; color: white; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0; margin-top: 2px;">
                            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        </div>
                        <div style="flex: 1;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
                                <h3 style="font-size: 16px; font-weight: 500; color: #0f172a; margin: 0;">Homicide</h3>
                                <div style="display: flex; align-items: center;">
                                    <span style="font-size: 13px; color: #64748b; margin-right: 4px;">39%</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                </div>
                            </div>
                            <p style="font-size: 13px; color: #64748b; margin: 0 0 10px 0;">Murder, manslaughter, intent</p>
                            <div style="height: 4px; background: #e2e8f0; border-radius: 2px; width: 100%; overflow: hidden;">
                                <div style="height: 100%; background: #f59e0b; width: 39%; border-radius: 2px;"></div>
                            </div>
                        </div>
                    </div>

                </div>
                <div style="height: 100px;"></div>
            </div>
        </div>

        `;

const newContent = content.substring(0, startIndex) + newSection + content.substring(endIndex);
fs.writeFileSync(path, newContent);
console.log("Replaced successfully!");
