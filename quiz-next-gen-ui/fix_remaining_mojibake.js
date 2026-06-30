const fs = require('fs');

const replacements = {
    'Ã¢Â Â±': '⏱️',
    'Ã¢Â â€œ': '❓',
    'Ã¢Â Â³': '⏳',
    'Ã°Å¸â€œÂ ': '📝',
    'Ã°Å¸â€ â€™': '🔒',
    'Ã¢â‚¬â€ ': '—',
    'Ã°Å¸â„¢Â ': '🙏',
    'Ã¢Å“â€ ': '✅',
    'Ã¢Å¡â€ ': '⚔️',
    'Ã°Å¸Â Â ': '🏁',
    '⚠️Ã¯Â¸Â ': '⚠️',
    '🛡️Ã¯Â¸Â ': '🛡️'
};

function fixFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    for (const [mojibake, correct] of Object.entries(replacements)) {
        content = content.split(mojibake).join(correct);
    }
    
    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed mojibake in', filePath);
    }
}

fixFile('variant-a/quiz.html');
fixFile('variant-a/quiz.js');
