const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'variant-a', 'quiz.html');
let html = fs.readFileSync(htmlPath, 'utf8');

const jsPath = path.join(__dirname, 'variant-a', 'quiz.js');
let js = fs.readFileSync(jsPath, 'utf8');

// --- UPDATE HTML ---
// 1. Extract view-category-grid
const gridStartIdx = html.indexOf('<div id="view-category-grid" class="grid-2-col">');
const gridEndStr = '</div>\n            </div>\n<div style="height: 100px;"></div> <!-- Bottom Padding -->';
let gridEndIdx = html.indexOf(gridEndStr, gridStartIdx);

if (gridStartIdx === -1 || gridEndIdx === -1) {
    // If exact end string is not found, try to find the end of the grid-2-col div
    gridEndIdx = html.indexOf('<div style="height: 100px;"></div> <!-- Bottom Padding -->', gridStartIdx);
}

if (gridStartIdx === -1 || gridEndIdx === -1) {
    console.error('Could not find view-category-grid');
    process.exit(1);
}

let gridHtml = html.substring(gridStartIdx, gridEndIdx);
// The grid has an extra </div> at the end for the .view-content wrapper, but let's be careful.
// The actual grid-2-col ends before <div style="height: 100px;"></div>
const gridOuterEndIdx = html.lastIndexOf('</div>', gridEndIdx);
gridHtml = html.substring(gridStartIdx, gridOuterEndIdx + 6);

// Remove the grid from view-category
html = html.substring(0, gridStartIdx) + html.substring(gridOuterEndIdx + 6);

// Update onclick handlers in gridHtml to handleTopicSelection
gridHtml = gridHtml.replace(/QuizEngine\.handleCategorySelection/g, 'QuizEngine.handleTopicSelection');
gridHtml = gridHtml.replace(/QuizEngine\.navigate\('view-format', \{category: 'Domestic Abuse'\}\)/g, "QuizEngine.handleTopicSelection('Domestic Abuse')");

// Create view-topics screen
const viewTopicsHtml = `
    <!-- Screen: Choose Topic -->
    <div id="view-topics" class="quiz-view">
        <!-- Header -->
        <div class="header-wrapper">
            <div class="header-inner">
                <div class="header-left">
                    <button class="back-btn" onclick="QuizEngine.navigateBack()">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 19l-7-7 7-7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <h1 class="header-title">Topics</h1>
                </div>
            </div>
            
            <div class="search-section">
                <div class="search-input-wrapper">
                    <img src="../images/search.svg" alt="Search">
                    <input type="text" class="search-input" placeholder="Search topics...">
                </div>
            </div>
        </div>

        <div class="view-content" style="padding-top: 16px;">
            ${gridHtml}
            <div style="height: 100px;"></div> <!-- Bottom Padding -->
        </div>
    </div>
`;

// Insert view-topics right after view-category
const viewCategoryEndStr = '<!-- Screen 2: Quiz Format (Time, Length) -->';
const viewCategoryEndIdx = html.indexOf(viewCategoryEndStr);
html = html.substring(0, viewCategoryEndIdx) + viewTopicsHtml + '\n    ' + html.substring(viewCategoryEndIdx);
fs.writeFileSync(htmlPath, html);

// --- UPDATE JS ---
// Update handleCategorySelection and add handleTopicSelection
let jsReplaced = js.replace(
    /handleCategorySelection:\s*function\(category\)\s*\{([\s\S]*?)this\.navigate\('view-format', \{category: category\}\);\s*\}\s*\}/,
    `handleCategorySelection: function(category) {
        if (this.currentFlow === 'quick') {
            // Quick play goes directly to active quiz, use Intermediate as default difficulty for now
            document.getElementById('difficulty-category-title').innerText = category;
            document.getElementById('preview-count').innerText = 5;
            this.navigate('view-active', {category: category, mode: 'Quick Play', count: 5});
        } else if (this.currentFlow === 'topic') {
            this.navigate('view-topics', {exam: category});
        } else {
            // Colleague flow goes to Format selection
            this.navigate('view-format', {category: category});
        }
    },
    
    handleTopicSelection: function(topic) {
        this.navigate('view-format', {category: topic});
    }`
);

fs.writeFileSync(jsPath, jsReplaced);

console.log('Successfully extracted view-topics and updated navigation logic.');
