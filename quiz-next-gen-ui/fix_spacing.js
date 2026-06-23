const fs = require('fs');
const filePath = 'c:\\Users\\Moksha Patel\\Desktop\\pocket-app-ui 15\\pocket-app-ui\\pocket-app-ui\\quize next-gen-ui\\variant-a\\quiz.html';
let html = fs.readFileSync(filePath, 'utf8');

// Replace the specific transparent border style with the correct one that includes margin
html = html.split('cursor: pointer; border: 1.5px solid transparent;').join('cursor: pointer; border: 1.5px solid rgba(15, 23, 42, 0.04); margin-bottom: 16px;');

fs.writeFileSync(filePath, html, 'utf8');
console.log('Fixed spacing between cards!');
