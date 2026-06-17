const fs = require('fs');

const htmlPath = 'c:\\Users\\Moksha Patel\\Desktop\\pocket-app-ui 15\\pocket-app-ui\\pocket-app-ui\\quize next-gen-ui\\variant-a\\quiz.html';
const jsPath = 'c:\\Users\\Moksha Patel\\Desktop\\pocket-app-ui 15\\pocket-app-ui\\pocket-app-ui\\quize next-gen-ui\\variant-a\\quiz.js';

let html = fs.readFileSync(htmlPath, 'utf8');
let js = fs.readFileSync(jsPath, 'utf8');

// 1. Remove the hint text in quiz.html
const hintTextHtml = `                <div style="padding: 0 20px 16px;">
                    <p style="font-size: 14px; color: rgba(255, 255, 255, 0.8); margin: 0;">Select a minimum of 2 topics to mix.</p>
                </div>`;
                
if (html.includes(hintTextHtml)) {
    html = html.replace(hintTextHtml, '');
    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log('Removed hint text from HTML.');
} else {
    // try a more fuzzy replace
    const fuzzyIndex = html.indexOf('Select a minimum of 2 topics to mix.');
    if (fuzzyIndex !== -1) {
        const divStart = html.lastIndexOf('<div', fuzzyIndex);
        const divEnd = html.indexOf('</div>', fuzzyIndex) + 6;
        if (divStart !== -1 && divEnd !== -1) {
            html = html.substring(0, divStart) + html.substring(divEnd);
            fs.writeFileSync(htmlPath, html, 'utf8');
            console.log('Fuzzy removed hint text from HTML.');
        }
    } else {
        console.log('Could not find hint text to remove.');
    }
}

// 2. Change the background color of selected topic to slightly blue in quiz.js
const oldJS = `                    el.style.borderColor = '#466ba9';
                    el.style.background = 'white';`;
const newJS = `                    el.style.borderColor = '#466ba9';
                    el.style.background = '#eff6ff';`;
                    
if (js.includes(oldJS)) {
    js = js.replace(oldJS, newJS);
    fs.writeFileSync(jsPath, js, 'utf8');
    console.log('Updated selected topic background to slightly blue.');
} else {
    // try fuzzy replace
    const targetIdx = js.indexOf("el.style.background = 'white';");
    if (targetIdx !== -1) {
        // Just make sure we are in updateMixedTopicUI
        if (js.lastIndexOf("updateMixedTopicUI", targetIdx) !== -1) {
            js = js.substring(0, targetIdx) + "el.style.background = '#eff6ff';" + js.substring(targetIdx + "el.style.background = 'white';".length);
            fs.writeFileSync(jsPath, js, 'utf8');
            console.log('Fuzzy updated selected topic background.');
        }
    } else {
        console.log('Could not find JS logic to update.');
    }
}
