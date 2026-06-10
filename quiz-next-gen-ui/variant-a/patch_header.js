const fs = require('fs');

let css = fs.readFileSync('quiz.css', 'utf8');

// 1. Fix .header-inner padding
css = css.replace(/padding: 12px 16px 16px 16px;/g, 'padding: 16px 16px;');

// 2. Ensure .back-btn svg sizing
// Search if it exists
if (!css.includes('.back-btn svg {')) {
    css += `\n/* Header Icon Consistency */\n.back-btn svg {\n    width: 24px !important;\n    height: 24px !important;\n}\n`;
}

fs.writeFileSync('quiz.css', css, 'utf8');

// Also update task status
let task = fs.readFileSync('../../../.gemini/antigravity-ide/brain/e6a26b7a-2636-4f9f-acdb-60d79cef5c3a/task.md', 'utf8');
task = task.replace('- `[ ]` **Global Header**', '- `[x]` **Global Header**');
fs.writeFileSync('../../../.gemini/antigravity-ide/brain/e6a26b7a-2636-4f9f-acdb-60d79cef5c3a/task.md', task, 'utf8');

console.log("Header consistency applied.");
