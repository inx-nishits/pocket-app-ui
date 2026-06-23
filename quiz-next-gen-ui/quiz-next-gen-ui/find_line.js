const fs = require('fs');
const js = fs.readFileSync('c:\\Users\\Moksha Patel\\Desktop\\pocket-app-ui 15\\pocket-app-ui\\pocket-app-ui\\quize next-gen-ui\\variant-a\\quiz.html', 'utf8');
const lines = js.split('\n');
lines.forEach((l, i) => { if(l.includes('id="view-practice-difficulty"')) console.log(i + 1, l); });
