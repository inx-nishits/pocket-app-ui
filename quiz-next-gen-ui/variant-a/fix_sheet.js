const fs = require('fs');

let html = fs.readFileSync('quiz.html', 'utf8');

// Change `position: fixed` to `position: absolute` for the bottom sheet and backdrop by injecting inline styles.
// And remove the scroll logic.

// Backdrop
html = html.replace(
    'class="achieve-bottom-sheet-backdrop" id="activity-sheet-backdrop" style="display: none; opacity: 0; transition: opacity 0.3s ease; z-index: 9999;"',
    'class="achieve-bottom-sheet-backdrop" id="activity-sheet-backdrop" style="position: absolute; display: none; opacity: 0; transition: opacity 0.3s ease; z-index: 9999;"'
);

// Sheet container
html = html.replace(
    'class="achieve-bottom-sheet" id="activity-sheet" style="display: block; max-width: 414px; margin: 0 auto; left: 0; right: 0; z-index: 10000; transform: translateY(100%); padding: 16px 20px 34px;"',
    'class="achieve-bottom-sheet" id="activity-sheet" style="position: absolute; display: block; max-width: 414px; margin: 0 auto; left: 0; right: 0; z-index: 10000; transform: translateY(100%); padding: 16px 20px 34px;"'
);

// Remove scroll
html = html.replace(
    '<div style="max-height: 60vh; overflow-y: auto; padding-right: 4px; padding-bottom: 20px;">',
    '<div style="padding-bottom: 20px;">'
);

// Remove items 5, 6, 7 to fit without scrolling.
// Find the exact strings or just use regex to remove them.
// Let's just remove everything after Activity 4 until "End of recent history"
const startActivity5 = html.indexOf('<!-- Activity 5 -->');
const endOfActivities = html.indexOf('<!-- End of recent history', startActivity5) === -1 
    ? html.indexOf('<div style="text-align: center; margin-top: 16px;">', startActivity5)
    : html.indexOf('<!-- End of recent history', startActivity5);

if (startActivity5 !== -1 && endOfActivities !== -1) {
    html = html.substring(0, startActivity5) + html.substring(endOfActivities);
}

fs.writeFileSync('quiz.html', html, 'utf8');
console.log("Sheet fixed.");
