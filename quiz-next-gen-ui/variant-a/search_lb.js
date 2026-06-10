const fs = require('fs');
const js = fs.readFileSync('quiz.js', 'utf8').split('\n');
js.forEach((l, i) => {
    if (l.includes('renderLeaderboard')) {
        for(let j=i; j<i+50; j++) console.log(js[j]);
    }
});
