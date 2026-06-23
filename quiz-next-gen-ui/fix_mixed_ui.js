const fs = require('fs');

const quizHtmlPath = 'c:\\Users\\Moksha Patel\\Desktop\\pocket-app-ui 15\\pocket-app-ui\\pocket-app-ui\\quize next-gen-ui\\variant-a\\quiz.html';
const quizJsPath = 'c:\\Users\\Moksha Patel\\Desktop\\pocket-app-ui 15\\pocket-app-ui\\pocket-app-ui\\quize next-gen-ui\\variant-a\\quiz.js';

// 1. Update HTML
let html = fs.readFileSync(quizHtmlPath, 'utf8');

// Fix text color in header
html = html.replace(
    '<p style="font-size: 14px; color: #64748b; margin: 0;">Select a minimum of 2 topics to mix.</p>',
    '<p style="font-size: 14px; color: rgba(255, 255, 255, 0.8); margin: 0;">Select a minimum of 2 topics to mix.</p>'
);

// Remove the hardcoded padding from the list container
html = html.replace(
    '<div id="mixed-topic-list" style="padding: 0 20px;">',
    '<div id="mixed-topic-list" style="padding: 0;">'
);

// Fix the button container position and background
html = html.replace(
    '<div style="position: fixed; bottom: 0; left: 0; width: 100%; padding: 16px 20px 32px; background: linear-gradient(to top, white 80%, rgba(255,255,255,0)); z-index: 50; display: flex; justify-content: center; pointer-events: none;">',
    '<div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 16px; background: linear-gradient(to top, var(--bg-color) 80%, transparent); z-index: 50; display: flex; justify-content: center; pointer-events: none;">'
);

fs.writeFileSync(quizHtmlPath, html, 'utf8');

// 2. Update JS
let js = fs.readFileSync(quizJsPath, 'utf8');

// Replace `#2563eb` with `var(--accent-blue)` or `#466ba9`
// Since we are modifying inline styles directly in JS, standard hex is safest.
js = js.replace(/#2563eb/g, '#466ba9');

// Replace the light blue background `#eff6ff` with `var(--accent-light)` or a subtle blue 
// In the original it was `#eff6ff` which actually looks okay, but let's keep it or change to a slightly different light blue. `#eff6ff` is fine for light background.

fs.writeFileSync(quizJsPath, js, 'utf8');
console.log('Fixed UI issues.');
