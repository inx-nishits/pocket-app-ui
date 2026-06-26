const fs = require('fs');

let text = fs.readFileSync('variant-a/quiz.js', 'utf8');

const target1 = `inlineIcon.innerHTML = '🎉';`;
const replace1 = `inlineIcon.innerHTML = '<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f389.png" style="width: 32px; height: 32px; object-fit: contain; display: block; margin: 0; padding: 0; border: none;">';`;

const target2 = `inlineIcon.style.fontSize = '24px';`;
const replace2 = `// inlineIcon.style.fontSize = '24px';`;

text = text.replace(target1, replace1);
text = text.replace(target2, replace2);

// Also do it for the incorrect icon just in case
const target3 = `inlineIcon.innerHTML = '❌';`;
const replace3 = `inlineIcon.innerHTML = '<img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/274c.png" style="width: 32px; height: 32px; object-fit: contain; display: block; margin: 0; padding: 0; border: none;">';`;

text = text.replace(target3, replace3);

fs.writeFileSync('variant-a/quiz.js', text, 'utf8');
console.log('Icons updated successfully.');
