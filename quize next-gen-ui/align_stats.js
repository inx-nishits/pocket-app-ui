const fs = require('fs');
const htmlPath = 'c:\\Users\\Moksha Patel\\Desktop\\pocket-app-ui 15\\pocket-app-ui\\pocket-app-ui\\quize next-gen-ui\\variant-a\\quiz.html';

let html = fs.readFileSync(htmlPath, 'utf8');

// We are targeting the stats grid in the mock exams screen.
// Current: <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px;">
// New: <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-left: 64px;">
// We only want to apply this to the 3 mock exams. We can replace all occurrences because these specific grid definitions only exist in the mock exams we just created!

const targetStr = '<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px;">';
const replacementStr = '<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-left: 64px;">';

html = html.split(targetStr).join(replacementStr);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully aligned stats boxes.');
