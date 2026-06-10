const fs = require('fs');
let js = fs.readFileSync('quiz.js', 'utf8');

// 1. Leaderboard Team Margin
// Find: contextDetails = `<div class="lb-list-team">${item.team}</div>`;
// Replace with margin-top.
js = js.replace(
    'contextDetails = `<div class="lb-list-team">${item.team}</div>`;',
    'contextDetails = `<div class="lb-list-team" style="margin-top: 6px;">${item.team}</div>`;'
);
// Also for friends tab:
js = js.replace(
    'contextDetails = `<div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">',
    'contextDetails = `<div style="font-size: 12px; color: var(--text-secondary); margin-top: 8px;">'
);

fs.writeFileSync('quiz.js', js, 'utf8');
console.log("quiz.js Leaderboard patched.");

// Now read quiz.html to fix view-live-details
let html = fs.readFileSync('quiz.html', 'utf8');
const rs = html.indexOf('id="view-live-details"');
if (rs !== -1) {
    const section = html.substring(rs, rs + 3000);
    // Find all `<div style="width: 32px; height: 32px;` or similar inside here.
    // They might be `width: 40px; height: 40px;` or `width: 36px`.
    // Let's standardize them to 36px in this specific section.
    // We will do a regex replacement limited to `view-live-details`.
    
    let newSection = section.replace(/<div style="width:\s*\d+px;\s*height:\s*\d+px;\s*border-radius:\s*\d+px;\s*background:\s*rgba\([^)]+\);\s*display:\s*flex;\s*align-items:\s*center;\s*justify-content:\s*center;"/g, 
    '<div style="width: 36px; height: 36px; border-radius: 10px; background: rgba(70, 107, 169, 0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;"');
    
    html = html.substring(0, rs) + newSection + html.substring(rs + 3000);
    fs.writeFileSync('quiz.html', html, 'utf8');
    console.log("quiz.html Challenge Details patched.");
}
