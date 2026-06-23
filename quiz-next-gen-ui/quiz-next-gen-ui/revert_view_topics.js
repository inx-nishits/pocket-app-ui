const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'variant-a', 'quiz.html');
let html = fs.readFileSync(htmlPath, 'utf8');

const jsPath = path.join(__dirname, 'variant-a', 'quiz.js');
let js = fs.readFileSync(jsPath, 'utf8');

// --- REVERT HTML ---
const topicsStartStr = '<!-- Screen: Choose Topic -->\n    <div id="view-topics" class="quiz-view">';
const topicsStartIdx = html.indexOf(topicsStartStr);

if (topicsStartIdx !== -1) {
    // Find the end of view-topics
    // It ends right before <!-- Screen 2: Quiz Format (Time, Length) -->
    const viewFormatStr = '<!-- Screen 2: Quiz Format (Time, Length) -->';
    const viewFormatIdx = html.indexOf(viewFormatStr);
    
    if (viewFormatIdx !== -1) {
        let viewTopicsBlock = html.substring(topicsStartIdx, viewFormatIdx);
        
        // Extract grid-2-col
        const gridStartIdx = viewTopicsBlock.indexOf('<div id="view-category-grid"');
        const gridOuterEndIdx = viewTopicsBlock.lastIndexOf('</div>', viewTopicsBlock.lastIndexOf('</div>') - 1); 
        // Actually, we can just grab from <div id="view-category-grid" to <div style="height: 100px;"></div>
        const gridEndStr = '<div style="height: 100px;"></div> <!-- Bottom Padding -->';
        const gridEndIdx = viewTopicsBlock.indexOf(gridEndStr, gridStartIdx);
        
        let gridHtml = viewTopicsBlock.substring(gridStartIdx, gridEndIdx);
        gridHtml = gridHtml.replace(/QuizEngine\.handleTopicSelection/g, 'QuizEngine.handleCategorySelection');
        
        // Remove view-topics block
        html = html.substring(0, topicsStartIdx) + html.substring(viewFormatIdx);
        
        // Re-insert grid into view-category
        // It goes right after <div id="view-category-list"...>...</div>
        // And before <div style="height: 100px;"></div> <!-- Bottom Padding --> inside view-category
        
        const viewCategoryEndStr = '<div style="height: 100px;"></div> <!-- Bottom Padding -->\n        </div>\n    </div>\n\n    <!-- Screen 2';
        // Let's find the bottom padding of view-category
        const categoryStartIdx = html.indexOf('<div id="view-category"');
        const bottomPaddingIdx = html.indexOf('<div style="height: 100px;"></div> <!-- Bottom Padding -->', categoryStartIdx);
        
        if (bottomPaddingIdx !== -1) {
            html = html.substring(0, bottomPaddingIdx) + gridHtml + '\n' + html.substring(bottomPaddingIdx);
        }
        
        fs.writeFileSync(htmlPath, html);
        console.log('Successfully reverted HTML.');
    }
} else {
    console.log('view-topics not found in HTML.');
}

// --- REVERT JS ---
const originalJs = `handleCategorySelection: function(category) {
        if (this.currentFlow === 'quick') {
            // Quick play goes directly to active quiz...
            this.navigate('view-active', {category: category, mode: 'Quick Play', count: 5});
        } else {
            // Colleague flow goes to Format selection
            this.navigate('view-format', {category: category});
        }
    },`;

// Find the modified block
const modifiedJsStartIdx = js.indexOf('handleCategorySelection: function(category) {');
const modifiedJsEndIdx = js.indexOf('handleTopicSelection: function(topic) {');

if (modifiedJsStartIdx !== -1 && modifiedJsEndIdx !== -1) {
    const endOfHandleTopicSelection = js.indexOf('}', modifiedJsEndIdx) + 1;
    js = js.substring(0, modifiedJsStartIdx) + originalJs + js.substring(endOfHandleTopicSelection);
    fs.writeFileSync(jsPath, js);
    console.log('Successfully reverted JS.');
} else {
    console.log('Modified JS block not found.');
}
