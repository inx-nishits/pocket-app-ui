const fs = require('fs');

const path = 'c:/Users/Moksha Patel/Desktop/pocket-app-ui-main/quiz-next-gen-ui/variant-a/quiz.html';
let html = fs.readFileSync(path, 'utf8');

// The regex matches the View Previous Exams Button block AND the closing div of the timeline container
const buttonRegex = /([\t ]*)<!-- View Previous Exams Button -->[\s\S]*?<\/svg>\s*<\/button>\s*<\/div>\s*<\/div>/;

const newButtonBlock = `$1</div>
$1<!-- View Previous Exams Button -->
$1<button class="primary-btn" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 20px; font-size: 15px; border-radius: 12px; padding: 14px;">
$1    View Previous Exams
$1    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-top: 1px;">
$1        <polyline points="6 9 12 15 18 9"></polyline>
$1    </svg>
$1</button>`;

if (html.match(buttonRegex)) {
    html = html.replace(buttonRegex, newButtonBlock);
    fs.writeFileSync(path, html);
    console.log("Successfully fixed the dotted line and button!");
} else {
    console.error("Could not find the button block to replace.");
}
