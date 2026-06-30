const fs = require('fs');
let html = fs.readFileSync('variant-a/quiz.html', 'utf8');
let newHtml = html.replace(/<span[^>]*>dY"s<\/span>\s*Topic Performance Breakdown/i, 
    '<span style="background: #eff6ff; width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size:16px;">📚</span>\n                        Topic Performance Breakdown');
fs.writeFileSync('variant-a/quiz.html', newHtml);
console.log('Fixed Topic Performance icon');
