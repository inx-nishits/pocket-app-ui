const fs = require('fs');
const htmlPath = 'variant-a/quiz.html';
const jsPath = 'variant-a/quiz.js';
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Remove 3 exams from view-hub and put Practice by Topic back
const examsStart = html.indexOf('<!-- 1. Sergeant Promotion Exam -->');
const mockStart = html.indexOf('<!-- 2. Mixed Practice -->');
if (examsStart !== -1 && mockStart !== -1) {
    const practiceCard = `
            <!-- 1. Practice by Topic -->
            <div class="format-card" onclick="QuizEngine.startFlow('topic')">
                <div class="format-card-left">
                    <div class="category-icon-top" style="color: #8b5cf6;">
                        📚
                    </div>
                    <div class="format-info">
                        <h3>Practice by Topic</h3>
                        <p>Focus on specific subject areas.</p>
                    </div>
                </div>
                <div class="format-card-right">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </div>
            </div>
`;
    const examsContent = html.substring(examsStart, mockStart);
    html = html.substring(0, examsStart) + practiceCard + html.substring(mockStart);
    
    // We extracted examsContent. We need to modify its onclick to go to Topics.
    // Wait, the exams themselves should be clicked to go to Topics?
    // User: "When I click on the exam on the choose exam page it should open the topic selection page."
    // Yes! So they should call QuizEngine.handleExamSelection('...') or we can just use handleCategorySelection which we'll map to 'view-topics'.
    // Let's modify the onclick to call QuizEngine.navigate('view-topics')
    let modifiedExamsContent = examsContent.replace(/onclick="QuizEngine\.startFlow\('topic'\)"/g, 'onclick="QuizEngine.navigate(\'view-topics\')"');
    
    // 2. Fix view-category to have Choose Exam header and insert modifiedExamsContent
    const viewCategoryStart = html.indexOf('<div id="view-category"');
    const headerTitleIdx = html.indexOf('<h1 class="header-title">Topics</h1>', viewCategoryStart);
    if (headerTitleIdx !== -1) {
        html = html.substring(0, headerTitleIdx) + '<h1 class="header-title">Choose Exam</h1>' + html.substring(headerTitleIdx + 36);
    }
    
    // 3. Move view-category-grid to a new view-topics
    const gridStart = html.indexOf('<div id="view-category-grid"');
    const gridEnd = html.indexOf('<div style="height: 100px;"></div> <!-- Bottom Padding -->', gridStart);
    
    if (gridStart !== -1 && gridEnd !== -1) {
        const gridContent = html.substring(gridStart, gridEnd);
        
        // Insert modifiedExamsContent into view-category where grid was
        const viewCategoryList = `
            <div id="view-category-list" class="format-list">
${modifiedExamsContent}            </div>
`;
        html = html.substring(0, gridStart) + viewCategoryList + html.substring(gridEnd);
        
        // Now create view-topics
        const viewTopics = `
    <!-- Screen: Topics Selection -->
    <div id="view-topics" class="quiz-view">
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
                    <input type="text" class="search-input" placeholder="Search categories...">
                </div>
            </div>
        </div>

        <div class="view-content" style="padding-top: 0;">
${gridContent}<div style="height: 100px;"></div>
        </div>
    </div>
`;
        // Insert view-topics right after view-category closes
        const viewCategoryClose = html.indexOf('</div>\n    </div>\n\n    <!-- Screen: Quiz Format Selection -->');
        if (viewCategoryClose !== -1) {
            html = html.substring(0, viewCategoryClose + 13) + viewTopics + html.substring(viewCategoryClose + 13);
        }
    }
}
fs.writeFileSync(htmlPath, html);

// Also modify quiz.js startFlow('topic') to NOT hide anything, just navigate to 'view-category'
let js = fs.readFileSync(jsPath, 'utf8');
js = js.replace(/if \(flowName === 'topic'\) \{[\s\S]*?\} else \{/, `if (flowName === 'topic') {
                // Topic flow just navigates to view-category
            } else {`);
fs.writeFileSync(jsPath, js);

console.log('Done HTML and JS');
