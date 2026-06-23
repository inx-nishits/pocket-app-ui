const fs = require('fs');
const html = fs.readFileSync('variant-a/quiz.html', 'utf8');

const vidx = html.indexOf('<div id="view-topics"');
console.log('view-topics index:', vidx);

const cidx = html.indexOf('<div id="view-category"');
console.log('view-category index:', cidx);
