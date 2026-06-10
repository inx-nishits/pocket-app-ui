const fs = require('fs');
let html = fs.readFileSync('quiz.html', 'utf8');

// The bottom sheet fix accidentally removed the script tag
// Let's add it back right before </body>
html = html.replace('</body>', '<script src="quiz.js"></script>\n</body>');

fs.writeFileSync('quiz.html', html, 'utf8');
console.log('Restored quiz.js script tag!');
