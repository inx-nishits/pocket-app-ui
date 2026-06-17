const fs = require('fs');
const htmlPath = 'c:\\Users\\Moksha Patel\\Desktop\\pocket-app-ui 15\\pocket-app-ui\\pocket-app-ui\\quize next-gen-ui\\variant-a\\quiz.html';

let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Update Heading
const oldHeadingRegex = /<div style="margin-bottom: 16px;">\s*<span style="font-size: 12px; font-weight: 700; color: ##?64748b; letter-spacing: 0.5px; text-transform: uppercase;">Future Exams &middot; Coming Soon<\/span>\s*<\/div>/g;
const newHeading = '<h2 style="font-size: 18px; font-weight: 700; color: #0f172a; margin: 0 0 16px 0; display: flex; align-items: center; justify-content: space-between;">Future Exams <span style="font-size: 12px; font-weight: 700; color: #64748b; background: rgba(15,23,42,0.06); padding: 4px 10px; border-radius: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Coming Soon</span></h2>';
html = html.replace(oldHeadingRegex, newHeading);

// Let's also do a static replacement just in case
html = html.split('<div style="margin-bottom: 16px;">\n                        <span style="font-size: 12px; font-weight: 700; color: #64748b; letter-spacing: 0.5px; text-transform: uppercase;">Future Exams &middot; Coming Soon</span>\n                    </div>')
           .join(newHeading);


// 2. Replace Icons and Add Locks
const lockRightHtml = '<div style="width: 32px; height: 32px; background: rgba(15,23,42,0.04); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"><img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f512.png" style="width: 16px; height: 16px; object-fit: contain;" alt="Locked"></div>';

const cards = [
    { title: 'Firearms Assessment', emoji: '1f52b.png' },
    { title: 'Roads Policing', emoji: '1f693.png' },
    { title: 'Public Order Command', emoji: '1f6e1-fe0f.png' },
    { title: 'FLO Exam', emoji: '1f91d.png' }
];

for (const card of cards) {
    const newIcon = '<div class="category-icon-top" style="background: #eff6ff; width: 44px; height: 44px; margin-bottom: 0; margin-right: 16px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">\n                                <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/' + card.emoji + '" style="width: 22px; height: 22px; object-fit: contain;" alt="">\n                            </div>';
    
    const regexText = '<div class="format-card-left" style="align-items: center; width: 100%;">\\s*<div class="category-icon-top" style="background: #f1f5f9; color: #64748b; width: 44px; height: 44px; margin-bottom: 0; border-radius: 50%; flex-shrink: 0;">\\s*<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"><\\/rect><path d="M7 11V7a5 5 0 0 1 10 0v4"><\\/path><\\/svg>\\s*<\\/div>\\s*<div class="format-info" style="width: 100%;">\\s*<h3 style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0 0 4px 0;">' + card.title + '<\\/h3>\\s*<p style="font-size: 13px; color: #64748b; margin: 0;">Coming Soon<\\/p>\\s*<\\/div>\\s*<\\/div>';
    
    const replacementHtml = '<div class="format-card-left" style="align-items: center; flex: 1;">\n                            ' + newIcon + '\n                            <div class="format-info">\n                                <h3 style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0 0 4px 0;">' + card.title + '</h3>\n                                <p style="font-size: 13px; color: #64748b; margin: 0;">Coming Soon</p>\n                            </div>\n                        </div>\n                        ' + lockRightHtml;
    
    html = html.replace(new RegExp(regexText, 'g'), replacementHtml);
}

html = html.replace(/margin-bottom: 16px; opacity: 0.8;">\s*<div class="format-card-left" style="align-items: center; flex: 1;">/g, 'margin-bottom: 16px; opacity: 0.8; display: flex; justify-content: space-between;">\n                        <div class="format-card-left" style="align-items: center; flex: 1;">');
html = html.replace(/margin-bottom: 32px; opacity: 0.8;">\s*<div class="format-card-left" style="align-items: center; flex: 1;">/g, 'margin-bottom: 32px; opacity: 0.8; display: flex; justify-content: space-between;">\n                        <div class="format-card-left" style="align-items: center; flex: 1;">');

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully updated coming soon cards and heading.');
