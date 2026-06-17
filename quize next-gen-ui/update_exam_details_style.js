const fs = require('fs');

const htmlPath = 'c:\\Users\\Moksha Patel\\Desktop\\pocket-app-ui 15\\pocket-app-ui\\pocket-app-ui\\quize next-gen-ui\\variant-a\\quiz.html';
const jsPath = 'c:\\Users\\Moksha Patel\\Desktop\\pocket-app-ui 15\\pocket-app-ui\\pocket-app-ui\\quize next-gen-ui\\variant-a\\quiz.js';

let html = fs.readFileSync(htmlPath, 'utf8');
let js = fs.readFileSync(jsPath, 'utf8');

// 1. Fix HTML header to standard style
const oldHeaderHtml = `<div class="header-wrapper" style="background: var(--bg-color); border-bottom: none;">
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
            </div>`;

const newHeaderHtml = `<div class="header-wrapper">
                <div class="header-inner">
                    <div class="header-left">
                        <button class="back-btn" onclick="QuizEngine.navigateBack()">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 19l-7-7 7-7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                        <h1 class="header-title">Exam Details</h1>
                    </div>
                </div>
            </div>`;

// Also fix the main container background if it has it
html = html.replace('<div id="view-exam-details" class="quiz-view" style="background: var(--bg-color);">', '<div id="view-exam-details" class="quiz-view">');
html = html.replace(oldHeaderHtml, newHeaderHtml);

// Fix the button at bottom to match app style
const oldBtnContainerHtml = `<div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 16px; background: linear-gradient(to top, white 80%, transparent); z-index: 50; display: flex; justify-content: center;">
                <button onclick="QuizEngine.beginMockSimulation()" style="background: #466ba9; color: white; width: 100%; max-width: 400px; padding: 16px; border-radius: 16px; font-size: 16px; font-weight: 700; border: none; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 8px 20px rgba(70,107,169,0.25);">Start Mock Exam</button>
            </div>`;
const newBtnContainerHtml = `<div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 20px; background: #eff6ff; z-index: 50;">
                <button class="ios-btn-primary" onclick="QuizEngine.beginMockSimulation()" style="background: #466ba9; color: white; width: 100%; padding: 16px; border-radius: 12px; font-size: 16px; font-weight: 700; border: none;">Start Mock Exam</button>
            </div>`;
html = html.replace(oldBtnContainerHtml, newBtnContainerHtml);

fs.writeFileSync(htmlPath, html, 'utf8');


// 2. Fix JS card style to standard format-card
const oldCardHtml = `
            <div class="format-card" style="display: flex; flex-direction: column; padding: 24px; background: white; border-radius: 16px; border: 1.5px solid rgba(70,107,169,0.2); box-shadow: 0 8px 24px rgba(70,107,169,0.06); margin-bottom: 0;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px;">
                    <div>
                        <div style="background: #eff6ff; width: 56px; height: 56px; margin-bottom: 16px; border-radius: 14px; display: flex; align-items: center; justify-content: center;">
                            <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/\${data.icon}" style="width: 28px; height: 28px; object-fit: contain;">
                        </div>
                        <h3 style="font-size: 20px; font-weight: 800; color: #0f172a; margin: 0 0 6px 0;">\${examName}</h3>
                        <p style="font-size: 15px; color: #64748b; margin: 0; margin-bottom: 12px;">\${data.sub}</p>
                        <span style="display: inline-block; background: #eff6ff; color: #466ba9; font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 20px;">Official Format</span>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; border-top: 1.5px solid rgba(15,23,42,0.04); padding-top: 20px;">
                    <div>
                        <div style="font-size: 13px; color: #64748b; margin-bottom: 4px; font-weight: 500;">Questions</div>
                        <div style="font-size: 18px; font-weight: 800; color: #0f172a;">\${data.q}</div>
                    </div>
                    <div>
                        <div style="font-size: 13px; color: #64748b; margin-bottom: 4px; font-weight: 500;">Duration</div>
                        <div style="font-size: 18px; font-weight: 800; color: #0f172a;">\${data.d}</div>
                    </div>
                    <div>
                        <div style="font-size: 13px; color: #64748b; margin-bottom: 4px; font-weight: 500;">Pass Mark</div>
                        <div style="font-size: 18px; font-weight: 800; color: #0f172a;">\${data.pass}</div>
                    </div>
                </div>
            </div>
        `;

const newCardHtml = `
            <div class="format-card" style="flex-direction: column; align-items: stretch; padding: 20px; border: 1.5px solid rgba(15, 23, 42, 0.04); margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px;">
                    <div style="display: flex; align-items: flex-start;">
                        <div style="background: #eff6ff; width: 48px; height: 48px; margin-right: 16px; border-radius: 12px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
                            <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/\${data.icon}" style="width: 24px; height: 24px; object-fit: contain;">
                        </div>
                        <div>
                            <h3 style="font-size: 17px; font-weight: 700; color: #0f172a; margin: 0 0 6px 0;">\${examName}</h3>
                            <p style="font-size: 14px; color: #64748b; margin: 0; margin-bottom: 8px;">\${data.sub}</p>
                            <span style="display: inline-block; background: #eff6ff; color: #466ba9; font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 20px; white-space: nowrap; flex-shrink: 0;">Official Format</span>
                        </div>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-left: 64px;">
                    <div>
                        <div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Questions</div>
                        <div style="font-size: 16px; font-weight: 700; color: #0f172a;">\${data.q}</div>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Duration</div>
                        <div style="font-size: 16px; font-weight: 700; color: #0f172a;">\${data.d}</div>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Pass Mark</div>
                        <div style="font-size: 16px; font-weight: 700; color: #0f172a;">\${data.pass}</div>
                    </div>
                </div>
            </div>
        `;

// Perform string replace, handling backticks safely
const jsSplit = js.split('const cardHtml = `');
if (jsSplit.length > 1) {
    const endSplit = jsSplit[1].split('`;');
    if (endSplit.length > 1) {
        js = jsSplit[0] + 'const cardHtml = `' + newCardHtml + '`;' + endSplit.slice(1).join('`;');
        fs.writeFileSync(jsPath, js, 'utf8');
        console.log('Successfully updated JS UI styles.');
    }
}
