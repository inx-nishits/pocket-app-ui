const fs = require('fs');
const html = fs.readFileSync('quiz.html', 'utf8');
const lines = html.split('\n');

console.log("BACK BUTTONS:");
lines.forEach(l => {
    if (l.includes('back-btn')) console.log(l.trim());
});

console.log("\nSVG in headers:");
lines.forEach((l, i) => {
    if (l.includes('<svg') && lines[i-1] && lines[i-1].includes('back-btn')) {
        console.log(l.trim());
    }
});
