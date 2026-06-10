const fs = require('fs');
let html = fs.readFileSync('quiz.html', 'utf8');

// The issue is that some icon wrappers have 'display: flex;' but are missing 'align-items: center; justify-content: center;'
// Let's find all instances of 'display: flex;' in style attributes that are missing centering and contain fixed sizing.
// Actually, it's easier to just do string replacements for the specific known wrappers.

// Let's just find ALL `div` style attributes that contain `width:` and `height:` and `border-radius:` and `background:`, and ensure they have `display: flex; align-items: center; justify-content: center;`

html = html.replace(/<div style="([^"]*width:\s*\d+px;[^"]*height:\s*\d+px;[^"]*border-radius:[^"]*background:[^"]*)"/g, (match, p1) => {
    let newStyle = p1;
    if (!newStyle.includes('display: flex')) newStyle += ' display: flex;';
    if (!newStyle.includes('align-items: center')) newStyle += ' align-items: center;';
    if (!newStyle.includes('justify-content: center')) newStyle += ' justify-content: center;';
    return `<div style="${newStyle}"`;
});

fs.writeFileSync('quiz.html', html, 'utf8');
console.log('Icons centered.');
