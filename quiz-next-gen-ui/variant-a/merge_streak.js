const fs = require('fs');

const path = 'c:/Users/Moksha Patel/Desktop/pocket-app-ui-main/quiz-next-gen-ui/variant-a/quiz.html';
let html = fs.readFileSync(path, 'utf8');

// 1. Extract and remove the Study Streak Tracker Content
const contentRegex = /<div id="study-streak-tracker-content"[\s\S]*?<!-- Section 2: Exam Goal Tracking -->/;
// Wait, the content currently ends before <!-- Exam Readiness --> because we inserted it there!
// Let's use a smarter regex: from <div id="study-streak-tracker-content" to the end of that div.
// It's exactly:
// <div id="study-streak-tracker-content" class="format-card" ... >
// ... 
// </div>
//                 <!-- Exam Readiness -->
const streakRegex = /<div id="study-streak-tracker-content" class="format-card"[\s\S]*?(?=                <!-- Exam Readiness -->)/;
const streakMatch = html.match(streakRegex);

let streakInner = '';
if (streakMatch) {
    let rawBlock = streakMatch[0];
    // Remove it from html
    html = html.replace(rawBlock, '');
    
    // We want the inner html of the streak calendar
    // The raw block is a <div class="format-card">...</div>
    // Let's extract the inside.
    const innerRegex = /<div id="study-streak-tracker-content"[^>]*>([\s\S]*?)<\/div>\s*$/;
    const innerMatch = rawBlock.match(innerRegex);
    if (innerMatch) {
        streakInner = innerMatch[1];
    } else {
        // Fallback: just strip the first div and last div
        streakInner = rawBlock.replace(/^<div[^>]*>/, '').replace(/<\/div>\s*$/, '');
    }
} else {
    console.error("Could not find study streak content");
    process.exit(1);
}

// 2. Remove the Settings Header / Toggles
const settingsRegex = /<!-- Settings Header \/ Toggles -->[\s\S]*?(?=<!-- Exam Readiness -->)/;
const settingsMatch = html.match(settingsRegex);
if (settingsMatch) {
    html = html.replace(settingsMatch[0], '');
} else {
    console.error("Could not find Settings Header / Toggles");
    process.exit(1);
}

// 3. Build the new combined card
const newCard = `<!-- Study Streak Tracker Combined -->
                <div class="format-card" style="display: flex; cursor: default; flex-direction: column; align-items: stretch; padding: 20px; border: 1.5px solid rgba(15, 23, 42, 0.04); margin-bottom: 16px; background: white; border-radius: 16px;">
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; background: #fff7ed; border-radius: 8px;">🔥</span>
                            <span style="font-size: 15px; font-weight: 700; color: #0f172a;">Study Streak Tracker</span>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" checked id="toggle-streak">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>

                    <div id="study-streak-tracker-content" style="display: flex; flex-direction: column; transition: all 0.3s ease; margin-top: 16px; padding-top: 16px; border-top: 1px dashed #e2e8f0;">
${streakInner}
                    </div>
                </div>
                `;

// We also need to fix the internal title of streakInner so we don't have two titles (since the new card has a title header)
// Wait, the inner streak calendar has its own title: 
// <h3 style="..."><span ...>🔥</span>Study Streak Checklist</h3>
// and it also has an "8 Days Active" pill.
// Let's modify the inner HTML to remove the redundant <h3> heading, but keep the "8 Days Active" pill?
// The original inner had:
// <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
//     <h3 ...>... Study Streak Checklist</h3>
//     <div style="...color: #ea580c; ...">8 Days Active</div>
// </div>
// Let's just keep it as is for now, it's fine if it says "Study Streak Checklist" inside.
// Actually, let's remove the redundant icon and heading to make it cleaner.
streakInner = streakInner.replace(/<h3[\s\S]*?<\/h3>/, '<div style="font-size: 15px; font-weight: 700; color: #0f172a; margin-bottom: 8px;">Study Streak Checklist</div>');

const newCardClean = `<!-- Study Streak Tracker Combined -->
                <div class="format-card" style="display: flex; cursor: default; flex-direction: column; align-items: stretch; padding: 20px; border: 1.5px solid rgba(15, 23, 42, 0.04); margin-bottom: 16px; background: white; border-radius: 16px;">
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; background: #fff7ed; border-radius: 8px;">🔥</span>
                            <span style="font-size: 16px; font-weight: 700; color: #0f172a;">Study Streak Tracker</span>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" checked id="toggle-streak">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>

                    <div id="study-streak-tracker-content" style="display: flex; flex-direction: column; transition: all 0.3s ease; margin-top: 16px; padding-top: 16px; border-top: 1px dashed #e2e8f0;">
${streakInner}
                    </div>
                </div>
`;

// 4. Insert it before Statistics & Activity
const targetPoint = '<!-- Statistics & Activity -->';
if (html.indexOf(targetPoint) === -1) {
    console.error("Could not find Statistics & Activity");
    process.exit(1);
}

html = html.replace(targetPoint, newCardClean + '                ' + targetPoint);

fs.writeFileSync(path, html);
console.log("Successfully rebuilt Study Streak Tracker!");
