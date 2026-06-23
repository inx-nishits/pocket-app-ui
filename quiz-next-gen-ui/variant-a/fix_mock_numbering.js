const fs = require('fs');

const path = 'c:/Users/Moksha Patel/Desktop/pocket-app-ui-main/quiz-next-gen-ui/variant-a/quiz.html';
let html = fs.readFileSync(path, 'utf8');

// 1. Remove the SVG arrow from the button
const buttonRegex = /(<button id="view-previous-exams-btn"[^>]*>\s*View Previous Exams\s*)<svg[\s\S]*?<\/svg>(\s*<\/button>)/;
if (html.match(buttonRegex)) {
    html = html.replace(buttonRegex, '$1$2');
    console.log("Successfully removed SVG arrow from button.");
} else {
    console.warn("Could not find button SVG arrow to remove.");
}

// 2. Fix the numbering in the Mock Exam Journey Map
// Let's find the section block to limit our replacements
const journeyRegex = /(Mock Exam Journey Map[\s\S]*?)(<button id="view-previous-exams-btn")/g;
let match;
if ((match = journeyRegex.exec(html)) !== null) {
    let journeyBlock = match[1];
    
    // We will do a safe token replacement by using placeholders first
    journeyBlock = journeyBlock.replace(/>Mock Exam #4</g, '>Mock Exam_TMP_6<');
    journeyBlock = journeyBlock.replace(/>Mock Exam #3</g, '>Mock Exam_TMP_5<');
    journeyBlock = journeyBlock.replace(/>Mock Exam #2</g, '>Mock Exam_TMP_4<');
    journeyBlock = journeyBlock.replace(/>Mock Exam #1</g, '>Mock Exam_TMP_3<');
    journeyBlock = journeyBlock.replace(/>Mock Exam #5</g, '>Mock Exam_TMP_2<');
    journeyBlock = journeyBlock.replace(/>Mock Exam #6</g, '>Mock Exam_TMP_1<');

    // Now convert placeholders to actual numbers
    journeyBlock = journeyBlock.replace(/>Mock Exam_TMP_6</g, '>Mock Exam #6<');
    journeyBlock = journeyBlock.replace(/>Mock Exam_TMP_5</g, '>Mock Exam #5<');
    journeyBlock = journeyBlock.replace(/>Mock Exam_TMP_4</g, '>Mock Exam #4<');
    journeyBlock = journeyBlock.replace(/>Mock Exam_TMP_3</g, '>Mock Exam #3<');
    journeyBlock = journeyBlock.replace(/>Mock Exam_TMP_2</g, '>Mock Exam #2<');
    journeyBlock = journeyBlock.replace(/>Mock Exam_TMP_1</g, '>Mock Exam #1<');

    html = html.substring(0, match.index) + journeyBlock + html.substring(match.index + match[1].length);
    console.log("Successfully renumbered the mock exams!");
} else {
    console.warn("Could not find the Mock Exam Journey Map block to replace numbers.");
}

fs.writeFileSync(path, html);
