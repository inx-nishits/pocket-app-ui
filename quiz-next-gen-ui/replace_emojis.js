const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInDir(fullPath);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const newContent = content.replace(/https:\/\/em-content\.zobj\.net\/source\/apple\/\d+\/[^"']+?_([0-9a-fA-F\-]+)\.png/g, 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/$1.png');
            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent);
                console.log('Updated', fullPath);
            }
        }
    }
}
replaceInDir('.');
