const fs = require('fs');
const htmlPath = 'c:\\Users\\Moksha Patel\\Desktop\\pocket-app-ui 15\\pocket-app-ui\\pocket-app-ui\\quize next-gen-ui\\variant-a\\quiz.html';

let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Fix the Coming Soon badge in the header
// Current: <span style="font-size: 12px; font-weight: 700; color: #64748b; background: rgba(15,23,42,0.06); padding: 4px 10px; border-radius: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Coming Soon</span>
const oldBadgeRegex = /<span style="font-size: 12px; font-weight: 700; color: #64748b; background: rgba\(15,23,42,0\.06\); padding: 4px 10px; border-radius: 12px; text-transform: uppercase; letter-spacing: 0\.5px;">Coming Soon<\/span>/g;
const newBadge = '<span style="font-size: 12px; font-weight: 700; color: #466ba9; background: #e2e8f0; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px;">COMING SOON</span>';
html = html.replace(oldBadgeRegex, newBadge);

// 2. Fix the Lock Emojis
// Current: <div style="width: 32px; height: 32px; background: rgba(15,23,42,0.04); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"><img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f512.png" style="width: 16px; height: 16px; object-fit: contain;" alt="Locked"></div>
const oldLockRegex = /<div style="width: 32px; height: 32px; background: rgba\(15,23,42,0\.04\); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"><img src="https:\/\/cdn\.jsdelivr\.net\/npm\/emoji-datasource-apple\/img\/apple\/64\/1f512\.png" style="width: 16px; height: 16px; object-fit: contain;" alt="Locked"><\/div>/g;
const newLock = '<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f512.png" style="width: 16px; height: 16px; object-fit: contain; margin-top: -2px;" alt="Locked">';
html = html.replace(oldLockRegex, newLock);

// 3. Align the cards to flex-start instead of center so the lock sits at the top right
const oldCardFlexRegex = /margin-bottom: (16px|32px); opacity: 0\.8; display: flex; justify-content: space-between;"/g;
const newCardFlexRegex = 'margin-bottom: $1; opacity: 0.8; display: flex; justify-content: space-between; align-items: flex-start;"';
html = html.replace(oldCardFlexRegex, newCardFlexRegex);

// Also need to fix format-card-left which might be align-items: center
const oldLeftFlexRegex = /<div class="format-card-left" style="align-items: center; flex: 1;">/g;
const newLeftFlexRegex = '<div class="format-card-left" style="align-items: flex-start; flex: 1;">';
html = html.replace(oldLeftFlexRegex, newLeftFlexRegex);


fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully updated badges and locks.');
