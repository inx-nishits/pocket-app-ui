const fs = require('fs');
const lines = fs.readFileSync('variant-a/quiz.html', 'utf8').split('\n');
const line = lines[3133];
console.log('Line length:', line.length);
for (let i = 0; i < line.length; i++) {
    console.log(line[i], line.charCodeAt(i).toString(16));
}
