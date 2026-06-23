const fs = require('fs');

const backupPath = 'c:/Users/Moksha Patel/Desktop/temp-backup/pocket-app-ui-main/quiz-next-gen-ui/variant-a/quiz.html';
const activePath = 'c:/Users/Moksha Patel/Desktop/pocket-app-ui-main/quiz-next-gen-ui/variant-a/quiz.html';

const backupHtml = fs.readFileSync(backupPath, 'utf8');
let activeHtml = fs.readFileSync(activePath, 'utf8');

// 1. Extract the streak calendar block from backup
const sectionStart = '<!-- Daily check-in streak calendar (Gamification) -->';
const startIdx = backupHtml.indexOf(sectionStart);

if (startIdx === -1) {
    console.error("Could not find section in backup HTML");
    process.exit(1);
}

const regex = /<!-- Daily check-in streak calendar \(Gamification\) -->[\s\S]*?(?=<!-- Section 2: Exam Goal Tracking -->)/;
const match = backupHtml.match(regex);
let block = '';
if (match) {
    block = match[0];
} else {
    console.error("Could not match the block");
    process.exit(1);
}

// Ensure the block has display: flex; cursor: default;
block = block.replace(/class="format-card"/, 'id="study-streak-tracker-content" class="format-card"');
block = block.replace(/style="flex-direction: column;/, 'style="display: flex; cursor: default; flex-direction: column; transition: all 0.3s ease;');

// Clean up trailing spaces
block = block.trim() + '\n\n';

// 2. Find insertion point in active HTML
// We want to insert it right after the Settings Header card ends.
// The Settings header card ends right before <!-- Exam Readiness -->
const insertPointMarker = '<!-- Exam Readiness -->';
if (activeHtml.indexOf(insertPointMarker) === -1) {
    console.error("Could not find insert point in active HTML");
    process.exit(1);
}

activeHtml = activeHtml.replace(insertPointMarker, block + '                ' + insertPointMarker);

// 3. Add the toggle logic
// I'll insert a small inline script at the end of the view-progress div, just before <!-- Screen 7: Quiz Analytics -->
const scriptToAdd = `
                <script>
                    document.addEventListener('DOMContentLoaded', function() {
                        const streakToggle = document.getElementById('toggle-streak');
                        const streakContent = document.getElementById('study-streak-tracker-content');
                        if(streakToggle && streakContent) {
                            streakToggle.addEventListener('change', function(e) {
                                if(e.target.checked) {
                                    streakContent.style.display = 'flex';
                                } else {
                                    streakContent.style.display = 'none';
                                }
                            });
                        }
                    });
                </script>
`;

const viewProgressEndRegex = /(<\/div>\s*<\/div>\s*<\/div>\s*)(?=<!-- Screen 7: Quiz Analytics -->)/;
if (activeHtml.match(viewProgressEndRegex)) {
    activeHtml = activeHtml.replace(viewProgressEndRegex, scriptToAdd + '$1');
} else {
    console.error("Could not find the end of view-progress to add script");
}

fs.writeFileSync(activePath, activeHtml);
console.log("Successfully added the study streak tracker and toggle logic!");
