const fs = require('fs');
const path = require('path');

const files = [
    'variant-a/quiz.html',
    'variant-a/quiz.js',
    'inject_mock_ui.js',
    'refactor_mock_ui.js',
    'update_mock_emojis.js',
    'inject_exam_details.js'
];

files.forEach(file => {
    const fullPath = path.join('c:\\Users\\Moksha Patel\\Desktop\\quiz-next-gen-ui', file);
    if (!fs.existsSync(fullPath)) {
        console.log('Skipping ' + file + ' (does not exist)');
        return;
    }
    
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace the specific flex container's margin-bottom: 24px to margin-bottom: 16px
    // The pattern is typically: <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
    // or <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px;">
    // Let's use a regex to match the style attribute specifically for these mock exam cards.
    // It's safe to replace any `justify-content: space-between; align-items: (center|flex-start); margin-bottom: 24px;` 
    // inside the mock exam format cards.
    
    content = content.replace(/(justify-content:\s*space-between;\s*align-items:\s*(?:center|flex-start);\s*margin-bottom:\s*)24px;/g, '$116px;');
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('Updated margin in ' + file);
});
