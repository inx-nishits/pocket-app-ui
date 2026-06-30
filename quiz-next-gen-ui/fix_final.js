const fs = require('fs');

function replaceExact(filePath, searchRegex, replaceStr) {
    const lines = fs.readFileSync(filePath, 'utf8').split('\n');
    for (let i = 0; i < lines.length; i++) {
        if (searchRegex.test(lines[i])) {
            lines[i] = lines[i].replace(searchRegex, replaceStr);
            console.log(`Replaced in ${filePath} at line ${i+1}`);
        }
    }
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
}

replaceExact('variant-a/quiz.html', />[^<]*â€™[^<]*</, '>🔒<');
replaceExact('variant-a/quiz.html', />Homicide[^<]+Intent</g, '>Homicide — Intent<');
replaceExact('variant-a/quiz.html', />Disclosure[^<]+CPIA Schedules</g, '>Disclosure — CPIA Schedules<');

replaceExact('variant-a/quiz.js', /`[^`]+Correct/, '`✅ Correct');

console.log('Final fixes applied');
