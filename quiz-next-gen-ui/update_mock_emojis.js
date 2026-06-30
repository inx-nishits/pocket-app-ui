const fs = require('fs');
const htmlPath = 'c:\\Users\\Moksha Patel\\Desktop\\pocket-app-ui 15\\pocket-app-ui\\pocket-app-ui\\quize next-gen-ui\\variant-a\\quiz.html';

let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Fix padding
html = html.replace('<div style="padding: 0 20px;">', '<div style="padding: 0;">');

// 2. Add emoji icons to the three mock exams
// Sergeant Exam
const sergeantHtml = `
                            <div>
                                <h3 style="font-size: 20px; font-weight: 700; color: #0f172a; margin: 0;">
                                        Sergeant Exam</h3>
                                
                            </div>
`;
const newSergeantHtml = `
                            <div style="display: flex; align-items: center;">
                                <div style="background: #eff6ff; width: 48px; height: 48px; margin-right: 16px; border-radius: 12px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
                                    <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f46e.png" style="width: 24px; height: 24px; object-fit: contain;" alt="Sergeant">
                                </div>
                                <div>
                                    <h3 style="font-size: 20px; font-weight: 700; color: #0f172a; margin: 0;">
                                        Sergeant Exam</h3>
                                    
                                </div>
                            </div>
`;
html = html.replace(sergeantHtml.trim(), newSergeantHtml.trim());

// Inspector Exam
const inspectorHtml = `
                            <div>
                                <h3 style="font-size: 20px; font-weight: 700; color: #0f172a; margin: 0;">
                                        Inspector Exam</h3>
                                
                            </div>
`;
const newInspectorHtml = `
                            <div style="display: flex; align-items: center;">
                                <div style="background: #eff6ff; width: 48px; height: 48px; margin-right: 16px; border-radius: 12px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
                                    <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f46e.png" style="width: 24px; height: 24px; object-fit: contain;" alt="Inspector">
                                </div>
                                <div>
                                    <h3 style="font-size: 20px; font-weight: 700; color: #0f172a; margin: 0;">
                                        Inspector Exam</h3>
                                    
                                </div>
                            </div>
`;
html = html.replace(inspectorHtml.trim(), newInspectorHtml.trim());

// NIE Exam
const nieHtml = `
                            <div>
                                <h3 style="font-size: 20px; font-weight: 700; color: #0f172a; margin: 0;">
                                        National Investigators Exam</h3>
                                
                            </div>
`;
const newNieHtml = `
                            <div style="display: flex; align-items: center;">
                                <div style="background: #eff6ff; width: 48px; height: 48px; margin-right: 16px; border-radius: 12px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
                                    <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f50d.png" style="width: 24px; height: 24px; object-fit: contain;" alt="NIE">
                                </div>
                                <div>
                                    <h3 style="font-size: 20px; font-weight: 700; color: #0f172a; margin: 0;">
                                        National Investigators Exam</h3>
                                    
                                </div>
                            </div>
`;
html = html.replace(nieHtml.trim(), newNieHtml.trim());

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully updated HTML.');
