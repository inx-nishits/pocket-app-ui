const fs = require('fs');

const backupPath = 'c:/Users/Moksha Patel/Desktop/temp-backup/pocket-app-ui-main/quiz-next-gen-ui/variant-a/quiz.html';
const activePath = 'c:/Users/Moksha Patel/Desktop/pocket-app-ui-main/quiz-next-gen-ui/variant-a/quiz.html';

const backupHtml = fs.readFileSync(backupPath, 'utf8');
const activeHtml = fs.readFileSync(activePath, 'utf8');

// Find the section in backup
const sectionStart = '<!-- Section 5: Mock Exam History (Connected path map timeline gamification) -->';
const sectionEndStr = '</div>\n\n                </div>\n            </div>\n        </div>';
const startIdx = backupHtml.indexOf(sectionStart);

if (startIdx === -1) {
    console.error("Could not find section in backup HTML");
    process.exit(1);
}

// Just match until the end of the div that closes the format-card.
// Looking at the view_file output, it ends with:
//                         <!-- Upcoming Mock --> ... </div>
//                     </div>
//                 </div>
// Let's use regex to grab the whole block safely.
let block = '';
const regex = /<!-- Section 5: Mock Exam History \(Connected path map timeline gamification\) -->[\s\S]*?(?=<!-- Screen 7: Quiz Analytics -->|<\/div>\s*<\/div>\s*<\/div>\s*<!-- Screen 7: Quiz Analytics -->)/;
const match = backupHtml.match(regex);
if (match) {
    block = match[0];
} else {
    // try finding the exact end of view-progress
    const endViewProgress = backupHtml.indexOf('<!-- Screen 7: Quiz Analytics -->', startIdx);
    if (endViewProgress !== -1) {
        block = backupHtml.substring(startIdx, endViewProgress);
        // trim trailing closing divs for view-content and view-progress
        block = block.replace(/<\/div>\s*<\/div>\s*<\/div>\s*$/, '');
    } else {
        console.error("Could not find end of section");
        process.exit(1);
    }
}

// Clean up block just in case it captured the closing tags of view-content
const closingTagsRegex = /<\/div>\s*<\/div>\s*<\/div>\s*$/;
block = block.replace(closingTagsRegex, '');
block = block.trim() + '\n\n';

// Add display: flex and cursor: default to the format-card inline styles so it doesn't break layout
block = block.replace(/style="flex-direction: column;/g, 'style="display: flex; cursor: default; flex-direction: column;');

// Find where to insert in active HTML
// Let's insert it before the closing </div> of view-content inside view-progress.
// Currently view-progress ends with:
//                 </div>
//             </div>
//         </div>
//         <!-- Screen 7: Quiz Analytics -->

const activeEndRegex = /(<\/div>\s*<\/div>\s*<\/div>\s*)(?=<!-- Screen 7: Quiz Analytics -->)/;
const activeMatch = activeHtml.match(activeEndRegex);

if (activeMatch) {
    const newActiveHtml = activeHtml.replace(activeEndRegex, block + '$1');
    fs.writeFileSync(activePath, newActiveHtml);
    console.log("Successfully restored Mock Exam Journey Map");
} else {
    console.error("Could not find insertion point in active HTML");
}
