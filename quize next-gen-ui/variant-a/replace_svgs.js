const fs = require('fs');
let html = fs.readFileSync('quiz.html', 'utf8');

const emojis = {
    'Criminal Law': '2696', // Scales
    'Traffic': '1f6a6', // Traffic Light
    'Custody': '1f512', // Lock
    'Evidence': '1f4c1', // Folder
    'Domestic Abuse': '1f3e0', // House
    'Cyber Crime': '1f50d', // Magnifying Glass (Wait, the label is Detectives but arg is Cyber Crime)
    'Promotion Exam': '1f4da' // Books
};

// Regex to match the category card and its SVG
html = html.replace(/<div class="category-card card" onclick="QuizEngine\.handleCategorySelection\('([^']+)'\)"[^>]*>.*?<div class="category-icon-top">.*?<\/div>/gs, (match, categoryName) => {
    // wait, one is onclick="QuizEngine.navigate('view-format', {category: 'Domestic Abuse'})"
    return match;
});

// Since regex on HTML is fragile, I'll just do simple string replacements for the exact SVGs in view-category.
// Criminal Law SVG
html = html.replace(
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 13l-9.5 9.5c-1 1-2.5 1-3.5 0s-1-2.5 0-3.5L10.5 9.5"/><path d="M16 11l4-4c1-1 1-2.5 0-3.5l-1-1c-1-1-2.5-1-3.5 0l-4 4"/></svg>',
    '<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/2696.png" style="width: 24px; height: 24px; object-fit: contain;">'
);

// Traffic SVG
html = html.replace(
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M5 11V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"/><circle cx="7" cy="16" r="1.5"/><circle cx="17" cy="16" r="1.5"/></svg>',
    '<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f6a6.png" style="width: 24px; height: 24px; object-fit: contain;">'
);

// Custody SVG
html = html.replace(
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    '<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f512.png" style="width: 24px; height: 24px; object-fit: contain;">'
);

// Evidence SVG
html = html.replace(
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><circle cx="10" cy="13" r="2"/><line x1="11.41" y1="14.41" x2="13.5" y2="16.5"/></svg>',
    '<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f4c1.png" style="width: 24px; height: 24px; object-fit: contain;">'
);

// Domestic Abuse SVG
html = html.replace(
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    '<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f3e0.png" style="width: 24px; height: 24px; object-fit: contain;">'
);

// Detectives SVG
html = html.replace(
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>',
    '<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f50d.png" style="width: 24px; height: 24px; object-fit: contain;">'
);

// Promotion Exam SVG
html = html.replace(
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
    '<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f4da.png" style="width: 24px; height: 24px; object-fit: contain;">'
);

// Also let's replace the SVGs in view-mode (Quick Quiz, Standard Quiz, Timed Challenge)
html = html.replace(
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    '<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/26a1.png" style="width: 32px; height: 32px; object-fit: contain;">'
);

html = html.replace(
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    '<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f3af.png" style="width: 32px; height: 32px; object-fit: contain;">'
);

html = html.replace(
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    '<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/23f1.png" style="width: 32px; height: 32px; object-fit: contain;">'
);

// What about the SVGs on the main Challenge Hub cards? (Quick Play, Challenge Colleague, etc)
// 1. Quick Play
html = html.replace(
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',
    '<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/26a1.png" style="width: 24px; height: 24px; object-fit: contain;">'
);

// 2. Challenge a Colleague
html = html.replace(
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    '<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f465.png" style="width: 24px; height: 24px; object-fit: contain;">'
);

// 3. Join Live Challenge
html = html.replace(
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>',
    '<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f3af.png" style="width: 24px; height: 24px; object-fit: contain;">'
);

// 4. Leaderboard
html = html.replace(
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4M7 4h10M5 4v7a7 7 0 0 0 14 0V4"/></svg>',
    '<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f3c6.png" style="width: 24px; height: 24px; object-fit: contain;">'
);

// 5. Badges
html = html.replace(
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
    '<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f396.png" style="width: 24px; height: 24px; object-fit: contain;">'
);

fs.writeFileSync('quiz.html', html, 'utf8');
console.log('Replaced SVGs with Apple Emoji images.');
