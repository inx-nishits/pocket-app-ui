const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'variant-a', 'quiz.html');
let html = fs.readFileSync(filePath, 'utf8');

const practiceCardStart = html.indexOf('<!-- 1. Practice by Topic -->');
const mixedCardStart = html.indexOf('<!-- 2. Mixed Practice -->');

const sergeantStart = html.indexOf('<!-- 1. Sergeant Promotion Exam -->');
const categoryGridStart = html.indexOf('<div id="view-category-grid"');

if (practiceCardStart !== -1 && mixedCardStart !== -1 && sergeantStart !== -1 && categoryGridStart !== -1) {
    // 1. Extract the 3 exams HTML
    let examsHtml = html.substring(sergeantStart, categoryGridStart);
    
    // Clean up the trailing divs that belonged to view-category-list and view-content
    // We only want the 3 cards.
    // The last card is NIE. Let's find the end of the NIE card.
    const nieEnd = examsHtml.indexOf('</div>\n                    </div>\n                </div>') + 56;
    examsHtml = examsHtml.substring(0, nieEnd);
    
    // 2. Change onclick handler from handleCategorySelection to startFlow('topic')
    examsHtml = examsHtml.replace(/QuizEngine\.handleCategorySelection\('[^']+'\)/g, "QuizEngine.startFlow('topic')");

    // 3. Replace Practice by Topic with the 3 exams
    html = html.substring(0, practiceCardStart) + examsHtml + '\n            ' + html.substring(mixedCardStart);

    // 4. Remove view-category-list completely from view-category
    const viewCategoryListStart = html.indexOf('<div id="view-category-list"');
    const viewCategoryGridStart = html.indexOf('<div id="view-category-grid"');
    if (viewCategoryListStart !== -1 && viewCategoryGridStart !== -1) {
        html = html.substring(0, viewCategoryListStart) + html.substring(viewCategoryGridStart);
    }
    
    // 5. Change "Choose Exam" to "Topics" in view-category
    const viewCategoryStart = html.indexOf('<div id="view-category"');
    const headerTitleIdx = html.indexOf('<h1 class="header-title">Choose Exam</h1>', viewCategoryStart);
    if (headerTitleIdx !== -1 && headerTitleIdx < viewCategoryGridStart) {
        html = html.substring(0, headerTitleIdx) + '<h1 class="header-title">Topics</h1>' + html.substring(headerTitleIdx + 41);
    }

    fs.writeFileSync(filePath, html);
    console.log('Refactoring successful!');
} else {
    console.log('Failed to find necessary markers.');
}
