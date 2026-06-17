const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'variant-a', 'quiz.html');
let html = fs.readFileSync(filePath, 'utf8');

const listStartIdx = html.indexOf('<div id="view-category-list" class="format-list"');
const gridStartIdx = html.indexOf('<div id="view-category-grid" class="grid-2-col">');

if (listStartIdx === -1 || gridStartIdx === -1) {
    console.error('Could not find markers');
    process.exit(1);
}

// Build the new view-category-list content
const newContent = `
            <div id="view-category-list" class="format-list" style="display: flex; flex-direction: column; gap: 16px;">
                
                <!-- 1. Sergeant Promotion Exam -->
                <div class="format-card" onclick="QuizEngine.handleCategorySelection('Sergeant Promotion Exam')" style="position: relative; overflow: hidden; align-items: flex-start; padding: 20px;">
                    <div class="format-card-left" style="flex: 1; align-items: flex-start;">
                        <div class="category-icon-top" style="background: #eff6ff; color: #3b82f6; width: 48px; height: 48px; margin-bottom: 0;">
                            <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f46e.png" style="width: 28px; height: 28px; object-fit: contain;" alt="Sergeant">
                        </div>
                        <div class="format-info" style="width: 100%;">
                            <h3 style="font-size: 18px; margin-bottom: 16px;">Sergeant Promotion Exam (NPPF Step 2)</h3>
                            
                            <div style="display: flex; gap: 12px; margin-bottom: 0; flex-wrap: wrap;">
                                <span style="font-size: 12px; font-weight: 600; color: #475569; background: #f1f5f9; padding: 4px 8px; border-radius: 6px;">150 Questions</span>
                                <span style="font-size: 12px; font-weight: 600; color: #475569; background: #f1f5f9; padding: 4px 8px; border-radius: 6px;">3 Hours</span>
                                <span style="font-size: 12px; font-weight: 600; color: #475569; background: #f1f5f9; padding: 4px 8px; border-radius: 6px;">Multiple Choice</span>
                                <span style="font-size: 12px; font-weight: 600; color: #475569; background: #f1f5f9; padding: 4px 8px; border-radius: 6px;">Scenario Based</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 2. Inspector Promotion Exam -->
                <div class="format-card" onclick="QuizEngine.handleCategorySelection('Inspector Promotion Exam')" style="position: relative; overflow: hidden; align-items: flex-start; padding: 20px;">
                    <div class="format-card-left" style="flex: 1; align-items: flex-start;">
                        <div class="category-icon-top" style="background: #f5f3ff; color: #8b5cf6; width: 48px; height: 48px; margin-bottom: 0;">
                            <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f396.png" style="width: 28px; height: 28px; object-fit: contain;" alt="Inspector">
                        </div>
                        <div class="format-info" style="width: 100%;">
                            <h3 style="font-size: 18px; margin-bottom: 16px;">Inspector Promotion Exam (NPPF Step 2)</h3>
                            
                            <div style="display: flex; gap: 12px; margin-bottom: 0; flex-wrap: wrap;">
                                <span style="font-size: 12px; font-weight: 600; color: #475569; background: #f1f5f9; padding: 4px 8px; border-radius: 6px;">150 Questions</span>
                                <span style="font-size: 12px; font-weight: 600; color: #475569; background: #f1f5f9; padding: 4px 8px; border-radius: 6px;">3 Hours</span>
                                <span style="font-size: 12px; font-weight: 600; color: #475569; background: #f1f5f9; padding: 4px 8px; border-radius: 6px;">Multiple Choice</span>
                                <span style="font-size: 12px; font-weight: 600; color: #475569; background: #f1f5f9; padding: 4px 8px; border-radius: 6px;">Scenario Based</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 3. National Investigators' Examination (NIE) -->
                <div class="format-card" onclick="QuizEngine.handleCategorySelection('NIE')" style="position: relative; overflow: hidden; align-items: flex-start; padding: 20px;">
                    <div class="format-card-left" style="flex: 1; align-items: flex-start;">
                        <div class="category-icon-top" style="background: #fef2f2; color: #ef4444; width: 48px; height: 48px; margin-bottom: 0;">
                            <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f50d.png" style="width: 28px; height: 28px; object-fit: contain;" alt="NIE">
                        </div>
                        <div class="format-info" style="width: 100%;">
                            <h3 style="font-size: 18px; margin-bottom: 16px;">National Investigators' Examination (NIE)</h3>
                            
                            <div style="display: flex; gap: 12px; margin-bottom: 0; flex-wrap: wrap;">
                                <span style="font-size: 12px; font-weight: 600; color: #475569; background: #f1f5f9; padding: 4px 8px; border-radius: 6px;">80 Questions</span>
                                <span style="font-size: 12px; font-weight: 600; color: #475569; background: #f1f5f9; padding: 4px 8px; border-radius: 6px;">2.5 Hours</span>
                                <span style="font-size: 12px; font-weight: 600; color: #475569; background: #f1f5f9; padding: 4px 8px; border-radius: 6px;">Multiple Choice</span>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
`;

html = html.substring(0, listStartIdx) + newContent.trim() + '\n\n' + html.substring(gridStartIdx);

fs.writeFileSync(filePath, html);
console.log('Success');
