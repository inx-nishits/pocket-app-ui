const fs = require('fs');
const lines = fs.readFileSync('quiz.html', 'utf8').split('\n');
const views = ['view-challenges', 'view-quiz-type', 'view-levels'];

views.forEach(v => {
    let start = lines.findIndex(l => l.includes(v));
    if(start !== -1) {
        console.log(`\n--- ${v} ---`);
        for(let i=start; i<start+50; i++) {
            if (lines[i] && (lines[i].includes('width:') && lines[i].includes('height:'))) {
                console.log(`Line ${i}: ${lines[i].trim()}`);
            }
        }
    }
});
