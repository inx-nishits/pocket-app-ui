const fs = require('fs');

const htmlPath = 'c:\\Users\\Moksha Patel\\Desktop\\pocket-app-ui 15\\pocket-app-ui\\pocket-app-ui\\quize next-gen-ui\\variant-a\\quiz.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// Replace the plain text "About this Exam" and "Requirements" with format-cards
const oldContent = `<div style="margin-top: 32px;">
                    <h2 style="font-size: 18px; font-weight: 700; color: #0f172a; margin: 0 0 12px 0;">About this Exam</h2>
                    <p style="font-size: 15px; color: #64748b; line-height: 1.6; margin: 0 0 24px 0;">This is a full-length, timed simulation matching official College of Policing standards. Once you begin, the timer cannot be paused. Ensure you are in a quiet environment before starting.</p>

                    <h2 style="font-size: 18px; font-weight: 700; color: #0f172a; margin: 0 0 12px 0;">Requirements</h2>
                    <ul style="padding: 0 0 0 20px; margin: 0; color: #64748b; font-size: 15px; line-height: 1.6;">
                        <li style="margin-bottom: 8px;">Uninterrupted internet connection</li>
                        <li style="margin-bottom: 8px;">Do not close or refresh the app</li>
                        <li style="margin-bottom: 8px;">Score 55% or higher to pass</li>
                    </ul>
                </div>`;

const newContent = `<div style="margin-top: 24px;">
                    <!-- About Card -->
                    <div class="format-card" style="flex-direction: column; align-items: stretch; padding: 20px; border: 1.5px solid rgba(15, 23, 42, 0.04); margin-bottom: 16px; background: white; border-radius: 16px;">
                        <h2 style="font-size: 18px; font-weight: 700; color: #0f172a; margin: 0 0 12px 0; display: flex; align-items: center; gap: 8px;">
                            <span style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; background: #eff6ff; border-radius: 8px;">
                                <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f4dc.png" style="width: 16px; height: 16px;">
                            </span>
                            About this Exam
                        </h2>
                        <p style="font-size: 14px; color: #64748b; line-height: 1.6; margin: 0;">This is a full-length, timed simulation matching official College of Policing standards. Once you begin, the timer cannot be paused. Ensure you are in a quiet environment before starting.</p>
                    </div>

                    <!-- Requirements Card -->
                    <div class="format-card" style="flex-direction: column; align-items: stretch; padding: 20px; border: 1.5px solid rgba(15, 23, 42, 0.04); margin-bottom: 16px; background: white; border-radius: 16px;">
                        <h2 style="font-size: 18px; font-weight: 700; color: #0f172a; margin: 0 0 16px 0; display: flex; align-items: center; gap: 8px;">
                            <span style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; background: #fff1f2; border-radius: 8px;">
                                <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/26a0-fe0f.png" style="width: 16px; height: 16px;">
                            </span>
                            Requirements
                        </h2>
                        <ul style="padding: 0 0 0 24px; margin: 0; color: #64748b; font-size: 14px; line-height: 1.6;">
                            <li style="margin-bottom: 12px; padding-left: 4px;">Uninterrupted internet connection</li>
                            <li style="margin-bottom: 12px; padding-left: 4px;">Do not close or refresh the app</li>
                            <li style="margin-bottom: 0; padding-left: 4px;">Score <strong style="color: #0f172a;">55% or higher</strong> to pass</li>
                        </ul>
                    </div>
                </div>`;

if (html.includes(oldContent)) {
    html = html.replace(oldContent, newContent);
    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log('Successfully wrapped content in cards.');
} else {
    console.log('Could not find old content to replace.');
}
