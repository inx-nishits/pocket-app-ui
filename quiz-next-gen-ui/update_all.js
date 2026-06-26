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
    
    // 1. Change align-items: flex-start to align-items: center for the title block
    content = content.replace(/<div style="display: flex; align-items: flex-start;">\s*<div[^>]*border-radius: 12px;/g, '<div style="display: flex; align-items: center;">\n                                <div style="background: #eff6ff; width: 48px; height: 48px; margin-right: 16px; border-radius: 12px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">');

    // Also for the NIE which has a different background color in the HTML:
    content = content.replace(/<div style="display: flex; align-items: flex-start;">\s*<div[^>]*background: #fdf4ff;/g, '<div style="display: flex; align-items: center;">\n                                <div style="background: #fdf4ff; width: 48px; height: 48px; margin-right: 16px; border-radius: 12px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">');

    // For the duplicate mock exams in quiz.html (and the other scripts) without emojis:
    // <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px;">
    //     <div>
    //         <h3 style="font-size: 18px; font-weight: 700; color: #0f172a; margin: 0 0 6px 0;">Sergeant Exam</h3>
    // We can also target these directly:
    content = content.replace(/<div\s+style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px;">\s*<div>\s*<h3 style="font-size: 18px;/g, '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">\n                            <div>\n                                <h3 style="font-size: 20px;');

    // 2. Change font-size to 20px and margin to 0 for the h3 tags of the 3 exams that have emojis
    content = content.replace(/<h3 style="font-size: (?:17px|18px); font-weight: 700; color: #0f172a; margin: 0 0 6px 0;">\s*(Sergeant Exam|Inspector Exam|National Investigators Exam)<\/h3>/g, '<h3 style="font-size: 20px; font-weight: 700; color: #0f172a; margin: 0;">\n                                        $1</h3>');

    // 3. Remove the subtitles completely
    content = content.replace(/<!--<p[^>]*>Crime,.*?<\/p>-->/gs, '');
    content = content.replace(/<p[^>]*>Crime,.*?<\/p>/gs, '');

    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated ' + file);
});
