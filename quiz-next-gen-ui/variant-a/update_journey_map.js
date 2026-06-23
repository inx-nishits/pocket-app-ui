const fs = require('fs');

const path = 'c:/Users/Moksha Patel/Desktop/pocket-app-ui-main/quiz-next-gen-ui/variant-a/quiz.html';
let html = fs.readFileSync(path, 'utf8');

// 1. Hide the Statistics & Study Activity section
// The section starts with <!-- Statistics & Activity -->
// and ends with </div> just before <!-- Section 5: Mock Exam History (Connected path map timeline gamification) -->
const statsRegex = /(<!-- Statistics & Activity -->\s*<div class="format-card" style=")(.*?)(">)/;
const statsMatch = html.match(statsRegex);
if (statsMatch) {
    // Inject display: none !important; into the style attribute
    const newStyle = 'display: none !important; ' + statsMatch[2];
    html = html.replace(statsRegex, `$1${newStyle}$3`);
} else {
    console.warn("Could not find Statistics & Activity style block to hide");
}

// 2. Update the dates in Mock Exam Journey Map
html = html.replace('Completed 2 days ago', 'Oct 24, 2025 at 10:30 AM');
html = html.replace('Completed 1 week ago', 'Oct 17, 2025 at 02:15 PM');
html = html.replace('Completed 2 weeks ago', 'Oct 10, 2025 at 09:00 AM');
html = html.replace('Completed 3 weeks ago', 'Oct 03, 2025 at 04:45 PM');

// 3. Add a "Load More" button to the bottom of the Journey Map
// We need to find the end of the Journey Map's internal list container.
// It looks like:
//                         <!-- Mock 1 -->
//                         <div ...>
//                             ...
//                         </div>
//                     </div> <!-- This closes the list of mock exams -->
//                 </div> <!-- This closes the format-card -->

const loadMoreHtml = `
                        <!-- Load More Button -->
                        <button style="width: 100%; padding: 12px; margin-top: 8px; border-radius: 12px; border: 1.5px dashed #cbd5e1; background: transparent; color: #64748b; font-size: 14px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s ease;">
                            Load More History <span style="font-size: 16px;">↓</span>
                        </button>
`;

// Find Mock 1 block
const mock1Regex = /(<!-- Mock 1 -->[\s\S]*?54%<\/span>\s*<\/div>\s*)(<\/div>\s*<\/div>\s*)/;
const mock1Match = html.match(mock1Regex);
if (mock1Match) {
    html = html.replace(mock1Regex, `$1${loadMoreHtml}$2`);
    console.log("Successfully added Load More button.");
} else {
    console.warn("Could not find Mock 1 block to insert Load More button.");
}

fs.writeFileSync(path, html);
console.log("Finished updating journey map and stats visibility.");
