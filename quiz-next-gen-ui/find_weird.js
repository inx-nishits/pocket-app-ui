const fs = require('fs');

const content = fs.readFileSync('variant-a/quiz.html', 'utf8');
const weird = new Set();
for (let i = 0; i < content.length; i++) {
    if (content.charCodeAt(i) > 127) {
        let chunk = content.slice(Math.max(0, i-2), Math.min(content.length, i+10));
        weird.add(chunk.trim());
    }
}
console.log(Array.from(weird).slice(0, 50));
