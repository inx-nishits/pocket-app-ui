const fs = require('fs');

function replaceLineText(filePath, lineIndex, newEmoji) {
    const lines = fs.readFileSync(filePath, 'utf8').split('\n');
    lines[lineIndex] = lines[lineIndex].replace(/>[^<]+</, `>${newEmoji}<`);
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
}

function replaceExact(filePath, lineIndex, searchRegex, replaceStr) {
    const lines = fs.readFileSync(filePath, 'utf8').split('\n');
    lines[lineIndex] = lines[lineIndex].replace(searchRegex, replaceStr);
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
}

// quiz.html
replaceLineText('variant-a/quiz.html', 3133, '❓');
replaceLineText('variant-a/quiz.html', 3144, '⏳');
replaceLineText('variant-a/quiz.html', 3155, '⏱️');
replaceLineText('variant-a/quiz.html', 3185, '⚠️');
replaceLineText('variant-a/quiz.html', 4319, '📝');
replaceLineText('variant-a/quiz.html', 4385, '⚠️');
replaceLineText('variant-a/quiz.html', 4585, '📝');
replaceLineText('variant-a/quiz.html', 5037, '🛡️');
replaceLineText('variant-a/quiz.html', 5040, '🔒');
replaceLineText('variant-a/quiz.html', 5149, '📝');
replaceLineText('variant-a/quiz.html', 5163, '⚔️');

replaceExact('variant-a/quiz.html', 596, />[^<]*</, '>⚔️<');

// For the Homicide / Disclosure texts
replaceExact('variant-a/quiz.html', 5301, />Homicide[^<]+Intent</, '>Homicide — Intent<');
replaceExact('variant-a/quiz.html', 5329, />Disclosure[^<]+CPIA Schedules</, '>Disclosure — CPIA Schedules<');
replaceExact('variant-a/quiz.html', 5378, />Homicide[^<]+Intent</, '>Homicide — Intent<');

// quiz.js
replaceExact('variant-a/quiz.js', 423, /Thank You<br>Your feedback helps improve future questions\.[^']+'/, "Thank You<br>Your feedback helps improve future questions. 🙏'");
replaceExact('variant-a/quiz.js', 478, /Thank You<br>Your feedback helps improve future questions\.[^']+'/, "Thank You<br>Your feedback helps improve future questions. 🙏'");
replaceExact('variant-a/quiz.js', 910, /'disclosure test'[^m]+meaning/, "'disclosure test'—meaning");
replaceExact('variant-a/quiz.js', 921, /'Homicide[^']+Intent' : 'Disclosure[^']+CPIA Schedules'/, "'Homicide — Intent' : 'Disclosure — CPIA Schedules'");
replaceExact('variant-a/quiz.js', 1413, />[^<]+Correct<br>/, ">✅ Correct<br>");
replaceExact('variant-a/quiz.js', 1696, /'[^']+Final Question'/, "'🏁 Final Question'");

console.log('Fixed by line number using robust regexes');
