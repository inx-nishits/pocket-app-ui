const fs = require('fs');

let html = fs.readFileSync('quiz.html', 'utf8');

// The bottom sheet starts with '<!-- Activity Bottom Sheet -->'
const sheetStartStr = '<!-- Activity Bottom Sheet -->';
const sheetStartIndex = html.indexOf(sheetStartStr);

if (sheetStartIndex !== -1) {
    // Look at the text right before the bottom sheet.
    // We expect a closing </div> there which closes the .app-container.
    // Let's find the last </div> before the bottom sheet.
    const beforeSheet = html.substring(0, sheetStartIndex);
    const lastDivIndex = beforeSheet.lastIndexOf('</div>');

    if (lastDivIndex !== -1) {
        // Remove that </div> from its current position
        const withoutDiv = beforeSheet.substring(0, lastDivIndex) + beforeSheet.substring(lastDivIndex + 6);
        
        // Let's find where the bottom sheet logic ends.
        // It ends at </script> right before <script src="quiz.js"></script>
        const scriptTagStr = '<script src="quiz.js"></script>';
        const endOfSheetLogic = html.indexOf(scriptTagStr, sheetStartIndex);
        
        if (endOfSheetLogic !== -1) {
            // Reconstruct the HTML:
            // 1. Everything before the removed </div>
            // 2. The bottom sheet HTML
            // 3. The </div> we removed (closing the .app-container)
            // 4. The rest of the HTML (e.g. <script src="quiz.js"></script>\n</body>\n</html>)
            
            const newHtml = withoutDiv + 
                            html.substring(sheetStartIndex, endOfSheetLogic) +
                            '</div>\n' +
                            html.substring(endOfSheetLogic);
                            
            fs.writeFileSync('quiz.html', newHtml, 'utf8');
            console.log('Successfully moved bottom sheet inside .app-container!');
        } else {
            console.log('Could not find script tag.');
        }
    } else {
        console.log('Could not find closing div before sheet.');
    }
} else {
    console.log('Could not find bottom sheet start.');
}
