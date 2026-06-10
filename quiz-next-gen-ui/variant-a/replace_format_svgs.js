const fs = require('fs');
let html = fs.readFileSync('quiz.html', 'utf8');

const replacements = [
    {
        svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
        emoji: '26a1.png'
    },
    {
        svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
        emoji: '1f4dd.png'
    },
    {
        svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
        emoji: '23f1-fe0f.png'
    },
    {
        svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
        emoji: '1f4d6.png'
    },
    {
        svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
        emoji: '1f4c5.png'
    }
];

let replaced = 0;
replacements.forEach(r => {
    const originalLength = html.length;
    html = html.replace(r.svg, '<img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/' + r.emoji + '" style="width: 28px; height: 28px; object-fit: contain;">');
    if (html.length !== originalLength) {
        replaced++;
    }
});

fs.writeFileSync('quiz.html', html, 'utf8');
console.log('Replaced ' + replaced + ' SVGs on Quiz Type page');
