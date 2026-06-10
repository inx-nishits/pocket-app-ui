const fs = require('fs');
const path = require('path');

function processFile(filepath) {
    const fullPath = path.join(__dirname, filepath);
    let content = fs.readFileSync(fullPath, 'utf8');

    // Regex to match the old em-content zobj URLs
    const pattern = /https:\/\/em-content\.zobj\.net\/source\/apple\/354\/[a-z0-9\-]+_([0-9a-f\-]+)\.png/g;
    const replacement = 'https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/$1.png';
    
    let newContent = content.replace(pattern, replacement);
    
    if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`Updated ${filepath}`);
    } else {
        console.log(`No changes in ${filepath}`);
    }
}

processFile('quiz.js');
processFile('quiz.html');
