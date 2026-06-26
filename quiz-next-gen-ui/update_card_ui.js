const fs = require('fs');
const path = require('path');

const files = [
    'variant-a/quiz.html',
    'inject_mock_ui.js',
    'refactor_mock_ui.js',
    'update_mock_emojis.js'
];

files.forEach(file => {
    const fullPath = path.join('c:\\Users\\Moksha Patel\\Desktop\\quiz-next-gen-ui', file);
    if (!fs.existsSync(fullPath)) return;
    
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // 1. Add padding-top and border-top to the stats grids in the mock exam format-cards
    content = content.replace(/<div\s+style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; width: 100%; text-align: left;">/g, '<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; width: 100%; text-align: left; padding-top: 16px; border-top: 1.5px solid rgba(15, 23, 42, 0.04);">');
    content = content.replace(/<div\s+style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px;">/g, '<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; padding-top: 16px; border-top: 1.5px solid rgba(15, 23, 42, 0.04);">');

    // 2. Hide "Future Exams"
    // Since we don't want to break the HTML by guessing closing tags, let's just use CSS!
    // We can add a <style> block right before <!-- Future Exams --> that hides the subsequent elements, 
    // OR we can parse and wrap it safely using string splitting.
    
    // Let's split by '<!-- Future Exams -->'
    const parts = content.split('<!-- Future Exams -->');
    if (parts.length > 1) {
        let newContent = parts[0];
        for (let i = 1; i < parts.length; i++) {
            // Find the end of the future exams section.
            // In quiz.html, the future exams section ends right before `<!-- Screen: Practice Difficulty -->`
            // Wait, no. It ends at the end of the view-content or similar.
            // Let's just look for the FLO Exam block end.
            // "FLO Exam" or "FLO" followed by "alt="Locked">" and then "</div>"
            const floIdx = parts[i].indexOf('FLO');
            if (floIdx !== -1) {
                const lockedIdx = parts[i].indexOf('alt="Locked">', floIdx);
                if (lockedIdx !== -1) {
                    const divEndIdx = parts[i].indexOf('</div>', lockedIdx);
                    if (divEndIdx !== -1) {
                        const endOfSection = divEndIdx + 6; // length of </div>
                        newContent += '<div style="display: none;">\n<!-- Future Exams -->' + parts[i].substring(0, endOfSection) + '\n</div><!-- End Hidden Future Exams -->' + parts[i].substring(endOfSection);
                        continue;
                    }
                }
            }
            // Fallback: if we can't find FLO Exam, don't change
            newContent += '<!-- Future Exams -->' + parts[i];
        }
        content = newContent;
    }

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('Updated UI and hid Future Exams in ' + file);
});
