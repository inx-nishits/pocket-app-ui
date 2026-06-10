const fs = require('fs');

let html = fs.readFileSync('quiz.html', 'utf8');

const targetStr = `                <div style="text-align: center; margin-top: 16px;">
                <span style="font-size: 12px; font-weight: 600; color: var(--text-dim);">End of recent history</span>
            </div>`;

html = html.replace(targetStr, '');

fs.writeFileSync('quiz.html', html, 'utf8');
console.log("Removed 'End of recent history' text.");
