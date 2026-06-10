const fs = require('fs');
const html = fs.readFileSync('quiz.html', 'utf8');

const openDivs = (html.match(/<div/g) || []).length;
const closeDivs = (html.match(/<\/div>/g) || []).length;

console.log(`Open divs: ${openDivs}, Close divs: ${closeDivs}`);

const startIdx = html.indexOf('<div class="app-container">');
const bottomSheetIdx = html.indexOf('<!-- Activity Bottom Sheet -->');

// Let's verify if there is a closing div just before the bottom sheet.
const strBeforeSheet = html.substring(bottomSheetIdx - 20, bottomSheetIdx);
console.log('Right before bottom sheet:', JSON.stringify(strBeforeSheet));
