const fs = require('fs');

const views = ['view-category', 'view-colleague', 'view-live-list', 'view-leaderboard', 'view-achievements'];

const lines = fs.readFileSync('quiz.html', 'utf8').split('\n');
let currentView = null;

lines.forEach((line, i) => {
    views.forEach(v => {
        if (line.includes(`id="${v}"`)) {
            currentView = v;
        }
    });

    if (currentView && line.includes('class="quiz-view"')) {
       // it's the start
    }
    
    if (currentView && line.includes('class="view-content"')) {
        console.log(`[${currentView}] line ${i+1}: ${line.trim()}`);
    }
    
    if (currentView && line.includes('<!-- Screen')) {
        currentView = null; // Next screen started
    }
});
