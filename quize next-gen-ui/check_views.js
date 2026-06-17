const fs = require('fs');
const htmlPath = 'c:\\Users\\Moksha Patel\\Desktop\\pocket-app-ui 15\\pocket-app-ui\\pocket-app-ui\\quize next-gen-ui\\variant-a\\quiz.html';
const html = fs.readFileSync(htmlPath, 'utf8');
console.log(html.indexOf('id="view-mock-exams"') !== -1 ? 'view-mock-exams found' : 'view-mock-exams missing');
console.log(html.indexOf('id="view-mixed-topic-selection"') !== -1 ? 'view-mixed-topic-selection found' : 'view-mixed-topic-selection missing');
