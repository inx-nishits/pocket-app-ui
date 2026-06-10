const fs = require('fs');
let js = fs.readFileSync('quiz.js', 'utf8');

// 1. Fix click behavior in filterBadgesMagic
js = js.replace(
    'grid.innerHTML += `\n                <div onclick="QuizEngine.openIosBadgeDetails(${badge.id})"',
    'grid.innerHTML += `\n                <div ${filter !== \'all\' ? `onclick="QuizEngine.openIosBadgeDetails(${badge.id})"` : \'\'}'
);

// 2. Fix card padding
js = js.replace('padding: 20px 16px; text-align: center;', 'padding: 16px; text-align: center;');

// 3. Fix bottom sheet color in openIosBadgeDetails
js = js.replace(
    "const iconFilter = isUnlocked ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))' : 'grayscale(100%) opacity(40%)';",
    "const iconFilter = 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))';"
);

js = js.replace(
    "const iconBg = isUnlocked ? badge.bg : '#f1f5f9';",
    "const iconBg = badge.bg;"
);

fs.writeFileSync('quiz.js', js, 'utf8');
console.log('Badges JS patched.');
