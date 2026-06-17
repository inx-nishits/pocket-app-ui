const fs = require('fs');
const htmlPath = 'c:\\Users\\Moksha Patel\\Desktop\\pocket-app-ui 15\\pocket-app-ui\\pocket-app-ui\\quize next-gen-ui\\variant-a\\quiz.html';

let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Fix the stats alignment by replacing flex with grid for the stats container
html = html.split('<div style="display: flex; justify-content: space-between;">')
           .join('<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px;">');

// Also fix the child flex columns from <div style="flex: 1;"> back to <div>
// We only want to do this within the grid we just created.
// To be safe, we'll replace the full stat block for each exam if needed, 
// but wait, grid children don't need flex: 1. Let's just remove flex: 1.
// Since flex: 1 might be used elsewhere, let's just replace the exact stats div.
const flexStatChild = '<div style="flex: 1;">';
const gridStatChild = '<div>';
// Since we only just introduced `<div style="flex: 1;">` inside these specific blocks, we can carefully replace them
html = html.replace(/<div style="flex: 1;">\s*<div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Questions<\/div>/g, '<div>\n                                <div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Questions</div>');
html = html.replace(/<div style="flex: 1;">\s*<div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Duration<\/div>/g, '<div>\n                                <div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Duration</div>');
html = html.replace(/<div style="flex: 1;">\s*<div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Pass Mark<\/div>/g, '<div>\n                                <div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Pass Mark</div>');


// 2. Fix the Official Format badge line-wrapping
html = html.split('<span style="background: #eff6ff; color: #466ba9; font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 20px;">Official Format</span>')
           .join('<span style="background: #eff6ff; color: #466ba9; font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 20px; white-space: nowrap; flex-shrink: 0;">Official Format</span>');

// 3. Fix the NIE Emoji background color from pink to blue
const niePinkBg = '<div style="background: #fdf4ff; width: 48px; height: 48px; margin-right: 16px; border-radius: 12px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">\n                                    <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f50d.png" style="width: 24px; height: 24px; object-fit: contain;" alt="NIE">\n                                </div>';
const nieBlueBg = '<div style="background: #eff6ff; width: 48px; height: 48px; margin-right: 16px; border-radius: 12px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">\n                                    <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f50d.png" style="width: 24px; height: 24px; object-fit: contain;" alt="NIE">\n                                </div>';

if (html.includes(niePinkBg)) {
    html = html.replace(niePinkBg, nieBlueBg);
} else {
    // Fallback if whitespace doesn't perfectly match
    html = html.replace(/background: #fdf4ff; width: 48px; height: 48px; margin-right: 16px; border-radius: 12px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;/g, 'background: #eff6ff; width: 48px; height: 48px; margin-right: 16px; border-radius: 12px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;');
}


fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Fixed alignments and colors.');
