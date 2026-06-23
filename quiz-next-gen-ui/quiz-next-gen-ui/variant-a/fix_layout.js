const fs = require('fs');

const path = 'quiz.html';
let content = fs.readFileSync(path, 'utf8');

// 1. Remove the literal \n
content = content.replace(/<\/div>\\n\s*<div class="view-content"/g, '</div>\n            <div class="view-content"');

// 2. Fix the format-card layout to prevent horizontal row stacking
// We need to target the format-cards specifically within the view-progress section.
// A safe way is to replace `class="format-card" style="` with `class="format-card" style="display: flex; flex-direction: column; `
// But let's only do it for the ones we added in the previous script.
// Let's just find the `view-progress` section and do the replacement within it.

const startMarker = '<div id="view-progress" class="quiz-view">';
const endMarker = '<!-- Screen 7: Quiz Analytics -->';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    let progressSection = content.substring(startIndex, endIndex);
    
    // Add flex-direction: column
    progressSection = progressSection.replace(/class="format-card"\s+style="/g, 'class="format-card" style="display: flex; flex-direction: column; ');
    
    // Replace the literal \n again just in case the first regex missed it due to spacing
    progressSection = progressSection.replace(/<\/div>\\n\s*<div class="view-content"/g, '</div>\n            <div class="view-content"');

    // Also fix the literal \n in case it is just `</div>\n`
    progressSection = progressSection.replace(/<\/div>\\n/g, '</div>');
    
    content = content.substring(0, startIndex) + progressSection + content.substring(endIndex);
    fs.writeFileSync(path, content);
    console.log('Layout fixed successfully.');
} else {
    console.error('Could not find view-progress bounds.');
}
