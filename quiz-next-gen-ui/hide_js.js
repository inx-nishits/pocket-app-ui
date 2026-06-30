const fs = require('fs');
const path = require('path');

const files = [
    'inject_mock_ui.js',
    'refactor_mock_ui.js',
    'update_mock_emojis.js'
];

files.forEach(file => {
    const fullPath = path.join('c:\\Users\\Moksha Patel\\Desktop\\quiz-next-gen-ui', file);
    if (!fs.existsSync(fullPath)) return;
    
    let content = fs.readFileSync(fullPath, 'utf8');
    
    if (content.includes('<!-- Future Exams Hidden -->')) {
        console.log(file + ' already hidden.');
        return;
    }
    
    const parts = content.split('<!-- Future Exams -->');
    if (parts.length > 1) {
        let newContent = parts[0];
        for (let i = 1; i < parts.length; i++) {
            const floIdx = parts[i].indexOf('FLO Exam');
            if (floIdx !== -1) {
                // Find the end of the FLO Exam format card.
                // In the JS files, it's: `Coming Soon</p>\n                        </div>\n                    </div>\n                </div>`
                const comingSoonIdx = parts[i].indexOf('Coming Soon', floIdx);
                const endDivsIdx = parts[i].indexOf('                </div>', comingSoonIdx);
                // We want to include this closing div, so find the NEXT closing div which is the container.
                // Wait, `indexOf('</div>', ...)` will find the first closing div.
                // Let's just find `</div>\n                </div>` which closes the card and the container.
                const containerEndIdx = parts[i].indexOf('</div>\n                </div>', comingSoonIdx);
                
                if (containerEndIdx !== -1) {
                    const endOfSection = containerEndIdx + 29; // length of '</div>\n                </div>'
                    newContent += '<!-- Future Exams Hidden --><div style="display: none;">\n<!-- Future Exams -->' + parts[i].substring(0, endOfSection) + '\n</div><!-- End Hidden Future Exams -->' + parts[i].substring(endOfSection);
                    continue;
                }
            }
            newContent += '<!-- Future Exams -->' + parts[i];
        }
        content = newContent;
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Fixed Future Exams in ' + file);
    }
});
