const fs = require('fs');

let text = fs.readFileSync('variant-a/quiz.js', 'utf8');

text = text.replace(/btnElement\.appendChild\(floatXP\);/g, '// btnElement.appendChild(floatXP);');
text = text.replace(/selectedEl\.appendChild\(inlineScoreFloat\);/g, '// selectedEl.appendChild(inlineScoreFloat);');
text = text.replace(/correctEl\.appendChild\(inlineScoreFloat\);/g, '// correctEl.appendChild(inlineScoreFloat);');

text = text.replace(/inlineStreakMsg\.innerText = `🔥 Streak: \$\{this\.streak\}`;/g, 'inlineStreakMsg.innerText = ``;');
text = text.replace(/inlineStreakMsg\.innerText = `🔥 Streak Lost`;/g, 'inlineStreakMsg.innerText = ``;');

text = text.replace(/streakMsg\.style\.display = 'block';/g, "streakMsg.style.display = 'none';");

fs.writeFileSync('variant-a/quiz.js', text, 'utf8');
console.log('Script ran successfully');
