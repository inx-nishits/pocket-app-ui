const fs = require('fs');

const jsPath = 'c:\\Users\\Moksha Patel\\Desktop\\pocket-app-ui 15\\pocket-app-ui\\pocket-app-ui\\quize next-gen-ui\\variant-a\\quiz.js';
let js = fs.readFileSync(jsPath, 'utf8');

const oldGridStyle = 'style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-left: 64px;"';
const newGridStyle = 'style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; padding-top: 16px; border-top: 1.5px solid rgba(15, 23, 42, 0.04);"';

if (js.includes(oldGridStyle)) {
    js = js.replace(oldGridStyle, newGridStyle);
    fs.writeFileSync(jsPath, js, 'utf8');
    console.log('Successfully updated grid layout.');
} else {
    console.log('Could not find old grid style to replace.');
}
