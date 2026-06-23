const fs = require('fs');

const htmlPath = 'c:\\Users\\Moksha Patel\\Desktop\\pocket-app-ui 15\\pocket-app-ui\\pocket-app-ui\\quize next-gen-ui\\variant-a\\quiz.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const searchHtml = `
                <div class="search-section">
                    <div class="search-input-wrapper">
                        <img src="../images/search.svg" alt="Search">
                        <input type="text" class="search-input" placeholder="Search categories...">
                    </div>
                </div>`;

function injectSearch(viewId) {
    const viewStart = html.indexOf(`id="${viewId}"`);
    if (viewStart === -1) {
        console.log(`Could not find ${viewId}`);
        return false;
    }
    
    const headerInnerIndex = html.indexOf('<div class="header-inner">', viewStart);
    if (headerInnerIndex === -1) {
        console.log(`Could not find header-inner in ${viewId}`);
        return false;
    }
    
    // Find the end of header-inner
    // We count divs
    let depth = 0;
    let i = headerInnerIndex;
    let endOfHeaderInner = -1;
    while (i < html.length) {
        if (html.substring(i, i + 4) === '<div') {
            depth++;
            i += 4;
        } else if (html.substring(i, i + 6) === '</div>') {
            depth--;
            if (depth === 0) {
                endOfHeaderInner = i + 6;
                break;
            }
            i += 6;
        } else {
            i++;
        }
    }
    
    if (endOfHeaderInner !== -1) {
        // Check if search-section is already there
        const textAfter = html.substring(endOfHeaderInner, endOfHeaderInner + 50);
        if (!textAfter.includes('search-section')) {
            html = html.substring(0, endOfHeaderInner) + searchHtml + html.substring(endOfHeaderInner);
            console.log(`Injected search into ${viewId}`);
            return true;
        } else {
            console.log(`Search already exists in ${viewId}`);
            return false;
        }
    }
    return false;
}

let changed = false;
if (injectSearch('view-mock-exams')) changed = true;
if (injectSearch('view-mixed-topic-selection')) changed = true;

if (changed) {
    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log('Saved changes.');
} else {
    console.log('No changes needed.');
}
