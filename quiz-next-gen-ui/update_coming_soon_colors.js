const fs = require('fs');

const htmlPath = 'c:\\Users\\Moksha Patel\\Desktop\\pocket-app-ui 15\\pocket-app-ui\\pocket-app-ui\\quize next-gen-ui\\variant-a\\quiz.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const oldSpan = '<span style="font-size: 12px; font-weight: 700; color: #466ba9; background: #e2e8f0; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px;">COMING SOON</span>';
const newSpan = '<span style="font-size: 12px; font-weight: 700; color: #ffffff; background: #466ba9; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px;">COMING SOON</span>';

if (html.includes(oldSpan)) {
    html = html.replace(oldSpan, newSpan);
    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log('Successfully updated COMING SOON badge colors.');
} else {
    console.log('Could not find the COMING SOON span to replace.');
}
