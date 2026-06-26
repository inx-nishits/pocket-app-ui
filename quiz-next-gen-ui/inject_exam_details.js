const fs = require('fs');

const htmlPath = 'c:\\Users\\Moksha Patel\\Desktop\\pocket-app-ui 15\\pocket-app-ui\\pocket-app-ui\\quize next-gen-ui\\variant-a\\quiz.html';
const jsPath = 'c:\\Users\\Moksha Patel\\Desktop\\pocket-app-ui 15\\pocket-app-ui\\pocket-app-ui\\quize next-gen-ui\\variant-a\\quiz.js';

let html = fs.readFileSync(htmlPath, 'utf8');
let js = fs.readFileSync(jsPath, 'utf8');

// 1. Inject HTML
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
    // Inject right before view-active
    html = html.replace('<!-- Screen 2: Active Quiz -->', detailsHtml + '\n\n        <!-- Screen 2: Active Quiz -->');
    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log('Injected HTML.');
}

// 2. Inject JS
const oldStartMock = `    startMockExam: function(examName) {
        this.selectedCategory = examName;
        this.currentFormat = 'Mock Exam';
        this.currentMode = 'Mock Exam';
        this.navigate('view-active');
    },`;

const newStartMock = `    startMockExam: function(examName) {
        this.selectedCategory = examName;
        this.currentFormat = 'Mock Exam';
        this.currentMode = 'Mock Exam';
        
        const examsData = {
            'Sergeant Exam': { icon: '1f46e.png', sub: 'Crime, Evidence, GP', q: 150, d: '3h 15m', pass: '55%' },
            'Inspector Exam': { icon: '1f46e.png', sub: 'Crime, Evidence, GP, Traffic', q: 150, d: '3h 15m', pass: '55%' },
            'National Investigators Exam': { icon: '1f50d.png', sub: 'Crime, Evidence, Investigation', q: 80, d: '2h', pass: '55%' }
        };
        const data = examsData[examName] || examsData['Sergeant Exam'];

        const cardHtml = \`
            <div class="format-card" style="display: flex; flex-direction: column; padding: 24px; background: white; border-radius: 16px; border: 1.5px solid rgba(70,107,169,0.2); box-shadow: 0 8px 24px rgba(70,107,169,0.06); margin-bottom: 0;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
                    <div>
                        <div style="background: #eff6ff; width: 56px; height: 56px; margin-bottom: 16px; border-radius: 14px; display: flex; align-items: center; justify-content: center;">
                            <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/\${data.icon}" style="width: 28px; height: 28px; object-fit: contain;">
                        </div>
                        <h3 style="font-size: 20px; font-weight: 800; color: #0f172a; margin: 0 0 6px 0;">\${examName}</h3>
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
        \`;
        
        const container = document.getElementById('exam-details-card-container');
        if (container) container.innerHTML = cardHtml;
        
        this.navigate('view-exam-details');
    },

    beginMockSimulation: function() {
        this.navigate('view-active');
    },`;

if (js.includes(oldStartMock)) {
    js = js.replace(oldStartMock, newStartMock);
    fs.writeFileSync(jsPath, js, 'utf8');
    console.log('Injected JS.');
} else {
    // If exact match fails, do string replace for the function
    const funcStart = js.indexOf('startMockExam: function(examName) {');
    if (funcStart !== -1) {
        const nextFunc = js.indexOf('startFlow: function(flowName) {', funcStart);
        if (nextFunc !== -1) {
            js = js.substring(0, funcStart) + newStartMock + '\n\n' + js.substring(nextFunc);
            fs.writeFileSync(jsPath, js, 'utf8');
            console.log('Injected JS via manual slice.');
        } else {
             console.log('Failed to find startFlow.');
        }
    } else {
         console.log('Failed to find startMockExam.');
    }
}
