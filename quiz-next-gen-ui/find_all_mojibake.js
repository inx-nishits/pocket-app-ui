const fs = require('fs');

function findMojibake(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    let found = false;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        // match specific bad bytes
        if (line.includes('Ã') || line.includes('\x9D') || line.includes('\x8F') || line.includes('â€')) {
            console.log(`[${filePath}:${i+1}] ${line.trim()}`);
            found = true;
        }
    }
}

findMojibake('variant-a/quiz.html');
findMojibake('variant-a/quiz.js');
