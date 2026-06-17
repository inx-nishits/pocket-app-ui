const fs = require('fs');
const htmlPath = 'c:\\Users\\Moksha Patel\\Desktop\\pocket-app-ui 15\\pocket-app-ui\\pocket-app-ui\\quize next-gen-ui\\variant-a\\quiz.html';
const html = fs.readFileSync(htmlPath, 'utf8');

const mockIdx = html.indexOf('id="view-mock-exams"');
if (mockIdx !== -1) {
    console.log("MOCK EXAMS HEADER:");
    console.log(html.substring(mockIdx, mockIdx + 600));
}

const mixedIdx = html.indexOf('id="view-mixed-topic-selection"');
if (mixedIdx !== -1) {
    console.log("MIXED TOPIC HEADER:");
    console.log(html.substring(mixedIdx, mixedIdx + 600));
}
