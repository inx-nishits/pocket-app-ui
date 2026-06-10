const fs = require('fs');

function checkFile(filename) {
    const lines = fs.readFileSync(filename, 'utf8').split('\n');
    lines.forEach((l, i) => {
        const lower = l.toLowerCase();
        if(lower.includes('background: #f') || lower.includes('background-color: #f')) {
            console.log(`${filename} ${i+1}: ${l.trim()}`);
        }
    });
}

checkFile('quiz.html');
checkFile('quiz.css');
