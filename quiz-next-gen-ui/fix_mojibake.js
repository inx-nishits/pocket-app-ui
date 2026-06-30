const fs = require('fs');

const replacements = {
    'Ã°Å¸â€˜Â®': '👮',
    'Ã°Å¸â€\x9Dâ‚¬': '🔀',
    'Ã°Å¸Â§Â ': '🧠',
    'Ã°Å¸Â§Â\xa0': '🧠',
    'Ã¢Å¡Â¡': '⚡',
    'Ã¢Å¡â€\x9DÃ¯Â¸Â': '⚔️',
    'Ã¢Å¡â€\x9DÃ¯Â¸Â\x8F': '⚔️',
    'Ã°Å¸â€\x9DÂ¥': '🔥',
    'Ã°Å¸Â\x8Fâ€': '🏆',
    'Ã°Å¸Â\x8Fâ€¦': '🏅',
    'Ã¢â‚¬Â¢': '•',
    'Ã°Å¸â€œÅ¡': '📚',
    'Ã°Å¸â€œâ€¹': '📋',
    'Ã¢Â­Â ': '⭐',
    'Ã¢Â­Â': '⭐',
    'Ã¢â‚¬â€œ': '-',
    'Ã¢â€šÂ¬Ã¢â‚¬Â¢': '•',
    'Ã¢â€šÂ¬Ã¢â‚¬Å“': '-',
    'Ã¢â‚¬Â\x9D': '"',
    'AAA.A,A,A?A,A': '🥇',
    'AAA.?oA,A': '💪',
    'AAA.A,A,"A<?': '🌱',
    'AAA.AA,AAA_A,A,A,A?': '🚨',
    'AAA,AA,Eo': '📈',
    'AAA,AA,Eo': '📉',
    'AAA.A,A,A A,?o': '🎯',
    'AAA.A,A,"A,A?': '🧠',
    'AAA.A,A.AA,A_': '🎯',
    'AAA.A,A,A?A,A': '🔥',
    'AAA.A,A,"A,A1': '⏱️',
    'AAA,A?A,A': '⚡',
    'AAA,A?A,A3': '⭐',
    'AAA,A?A,"': '🔥',
    'AAA.A,A,A?A,A': '🏆'
};

function fixFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    for (const [mojibake, correct] of Object.entries(replacements)) {
        content = content.split(mojibake).join(correct);
    }
    
    // Also let's fix the ones from quiz.js that might be encoded directly with 
    content = content.replace(/AAA\.A,A,A\?A,A/g, '🥇');
    content = content.replace(/AAA\.\?oA,A/g, '💪');
    content = content.replace(/AAA\.A,A,"A<\?/g, '🌱');
    content = content.replace(/AAA\.AA,AAA_A,A,A,A\?/g, '🚨');
    content = content.replace(/AAA,AA,Eo/g, '📈');
    content = content.replace(/AAA\.A,A,A A,\?o/g, '🎯');
    content = content.replace(/AAA\.A,A,"A,A\?/g, '🧠');
    content = content.replace(/AAA\.A,A\.AA,A_/g, '🎯');
    content = content.replace(/AAA\.A,A,A\?A,A/g, '🔥');
    content = content.replace(/AAA\.A,A,"A,A1/g, '⏱️');
    content = content.replace(/AAA,A\?A,A/g, '⚡');
    content = content.replace(/AAA,A\?A,A3/g, '⭐');
    content = content.replace(/AAA,A\?A,"/g, '🔥');
    
    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed mojibake in', filePath);
    }
}

fixFile('variant-a/quiz.html');
fixFile('variant-a/quiz.js');
