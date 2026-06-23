const fs = require('fs');
const htmlPath = 'c:\\Users\\Moksha Patel\\Desktop\\pocket-app-ui 15\\pocket-app-ui\\pocket-app-ui\\quize next-gen-ui\\variant-a\\quiz.html';

let html = fs.readFileSync(htmlPath, 'utf8');

const exams = [
    'Crime, Evidence, GP',
    'Crime, Evidence, GP, Traffic',
    'Crime, Evidence, Investigation'
];

for (const text of exams) {
    // Current HTML is exactly like this:
    /*
                                    <p style="font-size: 14px; color: #64748b; margin: 0;">TEXT</p>
                                </div>
                            </div>
                            <span style="background: #eff6ff; color: #466ba9; font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 20px; white-space: nowrap; flex-shrink: 0;">Official Format</span>
    */
    
    const searchTarget = '<p style="font-size: 14px; color: #64748b; margin: 0;">' + text + '</p>\n' +
                         '                                </div>\n' +
                         '                            </div>\n' +
                         '                            <span style="background: #eff6ff; color: #466ba9; font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 20px; white-space: nowrap; flex-shrink: 0;">Official Format</span>';

    const replacement = '<p style="font-size: 14px; color: #64748b; margin: 0; margin-bottom: 8px;">' + text + '</p>\n' +
                        '                                    <span style="display: inline-block; background: #eff6ff; color: #466ba9; font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 20px; white-space: nowrap; flex-shrink: 0;">Official Format</span>\n' +
                        '                                </div>\n' +
                        '                            </div>';

    // We can also just use a regex if spaces differ
    const regex = new RegExp(
        '<p style="font-size: 14px; color: #64748b; margin: 0;">' + text + '</p>\\s*</div>\\s*</div>\\s*<span style="background: #eff6ff; color: #466ba9; font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 20px; white-space: nowrap; flex-shrink: 0;">Official Format</span>',
        'g'
    );

    html = html.replace(regex, replacement);
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully moved badges below subtitles.');
