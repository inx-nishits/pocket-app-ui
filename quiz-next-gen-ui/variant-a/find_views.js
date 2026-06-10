const fs = require('fs');
const lines = fs.readFileSync('quiz.html', 'utf8').split('\n');
lines.forEach(l => {
    if (l.includes('class="quiz-view"')) {
        console.log(l.trim());
    }
});
