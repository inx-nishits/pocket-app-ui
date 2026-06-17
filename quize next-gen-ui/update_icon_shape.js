const fs = require('fs');
const htmlPath = 'c:\\Users\\Moksha Patel\\Desktop\\pocket-app-ui 15\\pocket-app-ui\\pocket-app-ui\\quize next-gen-ui\\variant-a\\quiz.html';

let html = fs.readFileSync(htmlPath, 'utf8');

// The specific wrapper style for the future exams icons
const oldWrapperStyle = 'style="background: #eff6ff; width: 44px; height: 44px; margin-bottom: 0; margin-right: 16px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center;"';
const newWrapperStyle = 'style="background: #eff6ff; width: 48px; height: 48px; margin-bottom: 0; margin-right: 16px; border-radius: 12px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;"';

html = html.replace(new RegExp(oldWrapperStyle, 'g'), newWrapperStyle);

// The specific img style for the emojis inside the future exams
const emojis = ['1f52b.png', '1f693.png', '1f6e1-fe0f.png', '1f91d.png'];
for (const emoji of emojis) {
    const oldImg = '<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/' + emoji + '" style="width: 22px; height: 22px; object-fit: contain;" alt="">';
    const newImg = '<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/' + emoji + '" style="width: 24px; height: 24px; object-fit: contain;" alt="">';
    html = html.replace(oldImg, newImg);
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully updated icon shapes and sizes.');
