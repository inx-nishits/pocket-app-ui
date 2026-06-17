const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'variant-a', 'quiz.html');
let html = fs.readFileSync(htmlPath, 'utf8');

const doctypeIdx = html.indexOf('<!DOCTYPE html>');
if (doctypeIdx > 0) {
    // view-topics was prepended before doctype
    const prependedText = html.substring(0, doctypeIdx);
    
    // Extract grid
    const gridStartIdx = prependedText.indexOf('<div id="view-category-grid"');
    const gridEndStr = '<div style="height: 100px;"></div> <!-- Bottom Padding -->';
    const gridEndIdx = prependedText.indexOf(gridEndStr, gridStartIdx);
    
    if (gridStartIdx !== -1 && gridEndIdx !== -1) {
        let gridHtml = prependedText.substring(gridStartIdx, gridEndIdx);
        gridHtml = gridHtml.replace(/QuizEngine\.handleTopicSelection/g, 'QuizEngine.handleCategorySelection');
        
        // Remove the prepended text
        html = html.substring(doctypeIdx);
        
        // Find where to put the grid back inside view-category
        // It goes after view-category-list ends.
        const categoryStartIdx = html.indexOf('<div id="view-category"');
        const viewCategoryListEndStr = '</div>\n                \n            </div>'; 
        // Actually, let's just find the bottom padding of view-category
        // The structure was:
        // <div id="view-category-list">...</div>
        // [WE INSERT HERE]
        // <div style="height: 100px;"></div> <!-- Bottom Padding -->
        const bottomPaddingIdx = html.indexOf('<div style="height: 100px;"></div> <!-- Bottom Padding -->', categoryStartIdx);
        
        if (bottomPaddingIdx !== -1) {
            html = html.substring(0, bottomPaddingIdx) + gridHtml + '\n' + html.substring(bottomPaddingIdx);
            fs.writeFileSync(htmlPath, html);
            console.log('Successfully reverted the botched HTML update.');
        } else {
            console.log('Could not find where to insert the grid back.');
        }
    } else {
        console.log('Could not find grid in prepended text.');
    }
} else {
    console.log('No prepended text before <!DOCTYPE html> found.');
}
