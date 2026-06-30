const fs = require('fs');

const files = [
    'variant-a/quiz.html',
    'inject_mock_ui.js',
    'refactor_mock_ui.js',
    'update_mock_emojis.js'
];

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix the duplicated string
    content = content.replace(/justify-content: center;"> flex-shrink: 0; display: flex; align-items: center; justify-content: center;">/g, 'justify-content: center;">');
    
    // Also, fix NIE string which might have the same problem
    content = content.replace(/justify-content: center;"> flex-shrink: 0; display: flex; align-items: center; justify-content: center;">/g, 'justify-content: center;">');

    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed ' + file);
});
