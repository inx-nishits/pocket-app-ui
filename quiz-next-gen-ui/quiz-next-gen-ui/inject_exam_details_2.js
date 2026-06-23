const fs = require('fs');

const htmlPath = 'c:\\Users\\Moksha Patel\\Desktop\\pocket-app-ui 15\\pocket-app-ui\\pocket-app-ui\\quize next-gen-ui\\variant-a\\quiz.html';
let html = fs.readFileSync(htmlPath, 'utf8');

if (!html.includes('id="view-exam-details"')) {
    const detailsHtml = `
        <!-- Screen: Exam Details -->
        <div id="view-exam-details" class="quiz-view" style="background: var(--bg-color);">
            <div class="header-wrapper" style="background: var(--bg-color); border-bottom: none;">
                <div class="header-inner" style="flex-direction: column; align-items: flex-start; padding-bottom: 0;">
                    <div class="header-left" style="width: 100%; margin-bottom: 12px;">
                        <button class="back-btn" onclick="QuizEngine.navigateBack()" style="color: #0f172a;">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 19l-7-7 7-7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <h1 style="font-size: 32px; font-weight: 800; color: #0f172a; margin: 0 0 8px 0; letter-spacing: -0.5px;">Exam Details</h1>
                </div>
            </div>

            <div class="view-content" style="padding-top: 16px; padding-bottom: 120px;">
                <div id="exam-details-card-container">
                    <!-- Dynamic card populated by JS -->
                </div>

                <div style="margin-top: 32px;">
                    <h2 style="font-size: 18px; font-weight: 700; color: #0f172a; margin: 0 0 12px 0;">About this Exam</h2>
                    <p style="font-size: 15px; color: #64748b; line-height: 1.6; margin: 0 0 24px 0;">This is a full-length, timed simulation matching official College of Policing standards. Once you begin, the timer cannot be paused. Ensure you are in a quiet environment before starting.</p>

                    <h2 style="font-size: 18px; font-weight: 700; color: #0f172a; margin: 0 0 12px 0;">Requirements</h2>
                    <ul style="padding: 0 0 0 20px; margin: 0; color: #64748b; font-size: 15px; line-height: 1.6;">
                        <li style="margin-bottom: 8px;">Uninterrupted internet connection</li>
                        <li style="margin-bottom: 8px;">Do not close or refresh the app</li>
                        <li style="margin-bottom: 8px;">Score 55% or higher to pass</li>
                    </ul>
                </div>
            </div>

            <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 16px; background: linear-gradient(to top, white 80%, transparent); z-index: 50; display: flex; justify-content: center;">
                <button onclick="QuizEngine.beginMockSimulation()" style="background: #466ba9; color: white; width: 100%; max-width: 400px; padding: 16px; border-radius: 16px; font-size: 16px; font-weight: 700; border: none; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 8px 20px rgba(70,107,169,0.25);">Start Mock Exam</button>
            </div>
        </div>
`;
    // Find the view-active div and insert detailsHtml before it
    const activeViewIndex = html.indexOf('<div id="view-active"');
    if (activeViewIndex !== -1) {
        html = html.substring(0, activeViewIndex) + detailsHtml + '\n\n        ' + html.substring(activeViewIndex);
        fs.writeFileSync(htmlPath, html, 'utf8');
        console.log('Successfully injected view-exam-details into HTML.');
    } else {
        console.log('Could not find id="view-active" in the HTML.');
    }
} else {
    console.log('view-exam-details already exists in the HTML.');
}
