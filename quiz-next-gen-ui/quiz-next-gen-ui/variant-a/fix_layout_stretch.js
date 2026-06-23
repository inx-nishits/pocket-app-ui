const fs = require('fs');

const path = 'quiz.html';
let content = fs.readFileSync(path, 'utf8');

const startMarker = '<div id="view-progress" class="quiz-view">';
const endMarker = '<!-- Screen 7: Quiz Analytics -->';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    let progressSection = content.substring(startIndex, endIndex);
    
    // Replace existing style string to include align-items: stretch and cursor: default
    progressSection = progressSection.replace(/class="format-card" style="display: flex; flex-direction: column;/g, 'class="format-card" style="display: flex; flex-direction: column; align-items: stretch; cursor: default;');
    
    // Exception: Deep Dive Focus Areas list items shouldn't have their cursor: default inherited if they are clickable, 
    // but the format-card container itself is fine to be default cursor. The inner items have explicit pointer cursor in JS.

    content = content.substring(0, startIndex) + progressSection + content.substring(endIndex);
    fs.writeFileSync(path, content);
    console.log('Layout fixed successfully with stretch alignment and default cursor.');
} else {
    console.error('Could not find view-progress bounds.');
}
