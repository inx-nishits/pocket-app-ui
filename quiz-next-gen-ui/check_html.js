const fs = require('fs');
const html = fs.readFileSync('c:\\Users\\Moksha Patel\\Desktop\\pocket-app-ui 15\\pocket-app-ui\\pocket-app-ui\\quize next-gen-ui\\variant-a\\quiz.html', 'utf8');
const start = html.indexOf('id="mixed-topic-list"');
const end = html.indexOf('id="mixed-continue-btn"');
console.log(html.substring(start, end));
