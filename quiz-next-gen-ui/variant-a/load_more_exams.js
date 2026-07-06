const fs = require('fs');

const path = 'c:/Users/Moksha Patel/Desktop/pocket-app-ui-main/quiz-next-gen-ui/variant-a/quiz.html';
let html = fs.readFileSync(path, 'utf8');

// 1. Insert older exams inside the timeline container
const mock1Regex = /(<!-- Mock 1 -->[\s\S]*?54%<\/span>\s*<\/div>\s*)(<\/div>\s*<!-- View Previous Exams Button -->)/;

const olderExamsHtml = `
                        <!-- Older Exams (Hidden by default) -->
                        <div id="older-exams-container" style="display: none; flex-direction: column; gap: 24px; padding-top: 24px;">
                            <!-- Mock 5 -->
                            <div style="position: relative; display: flex; align-items: center; justify-content: space-between; z-index: 2;">
                                <div style="position: absolute; left: -36px; width: 28px; height: 28px; border-radius: 50%; background: #fff7ed; border: 2.5px solid #ea580c; display: flex; align-items: center; justify-content: center; color: #ea580c; font-weight: 800; font-size: 12px; box-shadow: 0 2px 4px rgba(234,88,12,0.15);">✓</div>
                                <div>
                                    <div style="font-size: 14px; font-weight: 700; color: #0f172a;">Mock Exam #5</div>
                                    <div style="font-size: 12px; color: #64748b; font-weight: 500;">Sep 05, 2025 at 02:30 PM</div>
                                </div>
                                <span style="font-size: 13px; font-weight: 800; color: #ea580c; background: #fff7ed; border: 1px solid rgba(234,88,12,0.15); padding: 4px 10px; border-radius: 20px; box-shadow: 0 1px 2px rgba(0,0,0,0.02);">51%</span>
                            </div>
                            <!-- Mock 6 -->
                            <div style="position: relative; display: flex; align-items: center; justify-content: space-between; z-index: 2;">
                                <div style="position: absolute; left: -36px; width: 28px; height: 28px; border-radius: 50%; background: #fef2f2; border: 2.5px solid #ef4444; display: flex; align-items: center; justify-content: center; color: #ef4444; font-weight: 800; font-size: 12px; box-shadow: 0 2px 4px rgba(239,68,68,0.15);">✗</div>
                                <div>
                                    <div style="font-size: 14px; font-weight: 700; color: #0f172a;">Mock Exam #6</div>
                                    <div style="font-size: 12px; color: #64748b; font-weight: 500;">Aug 15, 2025 at 11:00 AM</div>
                                </div>
                                <span style="font-size: 13px; font-weight: 800; color: #ef4444; background: #fef2f2; border: 1px solid rgba(239,68,68,0.15); padding: 4px 10px; border-radius: 20px; box-shadow: 0 1px 2px rgba(0,0,0,0.02);">48%</span>
                            </div>
                        </div>
`;

if (html.match(mock1Regex)) {
    html = html.replace(mock1Regex, `$1${olderExamsHtml}$2`);
} else {
    console.error("Could not find Mock 1 to inject older exams!");
}

// 2. Update the View Previous Exams Button
const buttonRegex = /<!-- View Previous Exams Button -->[\s\S]*?<\/button>/;

const newButtonHtml = `<!-- View Previous Exams Button -->
                    <button id="view-previous-exams-btn" class="btn-primary" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; background: linear-gradient(to bottom, rgb(134, 174, 244), #4b73b7, #345da5); color: white; border: none; box-shadow: 0 4px 12px rgba(70, 107, 169, 0.25); margin-top: 20px; cursor: pointer; transition: all 0.2s;" onclick="document.getElementById('older-exams-container').style.display='flex'; this.style.display='none';">
                        View Previous Exams
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-top: 1px;">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>`;

if (html.match(buttonRegex)) {
    html = html.replace(buttonRegex, newButtonHtml);
} else {
    console.error("Could not find button to replace!");
}

fs.writeFileSync(path, html);
console.log("Successfully updated the button and added load more functionality!");
