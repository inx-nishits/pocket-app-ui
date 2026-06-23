const fs = require('fs');

const quizHtmlPath = 'c:\\Users\\Moksha Patel\\Desktop\\pocket-app-ui 15\\pocket-app-ui\\pocket-app-ui\\quize next-gen-ui\\variant-a\\quiz.html';
const quizJsPath = 'c:\\Users\\Moksha Patel\\Desktop\\pocket-app-ui 15\\pocket-app-ui\\pocket-app-ui\\quize next-gen-ui\\variant-a\\quiz.js';

// 1. Update HTML
let html = fs.readFileSync(quizHtmlPath, 'utf8');

const topicsData = [
    { name: 'Criminal Law', icon: '1f4dd.png', bg: '#eff6ff', color: '#2563eb' },
    { name: 'Traffic', icon: '1f693.png', bg: '#f0fdf4', color: '#16a34a' },
    { name: 'Custody', icon: '1f512.png', bg: '#fef2f2', color: '#ef4444' },
    { name: 'Evidence', icon: '1f4c4.png', bg: '#f5f3ff', color: '#8b5cf6' },
    { name: 'Domestic Abuse', icon: '1f3e0.png', bg: '#fffbeb', color: '#f59e0b' },
    { name: 'Detectives', icon: '1f50d.png', bg: '#fdf4ff', color: '#c026d3' },
    { name: 'PACE', icon: '1f6e1.png', bg: '#f0fdfa', color: '#0d9488' }
];

let topicHtml = '';
topicsData.forEach(t => {
    topicHtml += `
                    <div class="format-card" id="mixed-topic-${t.name.replace(' ', '-')}" onclick="QuizEngine.toggleMixedTopic('${t.name}')" style="align-items: center; padding: 16px 20px; cursor: pointer; border: 1.5px solid transparent;">
                        <div class="format-card-left" style="align-items: center; width: 100%; margin-right: 16px;">
                            <div class="category-icon-top" style="background: ${t.bg}; color: ${t.color}; width: 48px; height: 48px; margin-bottom: 0; border-radius: 12px; flex-shrink: 0;">
                                <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${t.icon}" style="width: 24px; height: 24px; object-fit: contain;" alt="${t.name}">
                            </div>
                            <div class="format-info" style="width: 100%;">
                                <h3 style="font-size: 17px; margin-bottom: 0; font-weight: 700; color: #0f172a;">${t.name}</h3>
                            </div>
                        </div>
                        <div class="mixed-checkbox" id="mixed-checkbox-${t.name.replace(' ', '-')}" style="width: 28px; height: 28px; border-radius: 8px; border: 2.5px solid #cbd5e1; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease; flex-shrink: 0; background: transparent;"></div>
                    </div>`;
});

// Extract the portion between <div id="mixed-topic-list"...> and the close div
const startMarker = '<div id="mixed-topic-list"';
const endMarker = '</div>\n            </div>\n\n            <div style="position: fixed; bottom: 0; left: 0; width: 100%;';
const startIndex = html.indexOf(startMarker);
const endIndex = html.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    const openingDivCloseIndex = html.indexOf('>', startIndex);
    const firstPart = html.substring(0, openingDivCloseIndex + 1);
    const lastPart = html.substring(endIndex);
    html = firstPart + '\n' + topicHtml + '                ' + lastPart;
    fs.writeFileSync(quizHtmlPath, html, 'utf8');
    console.log("Updated quiz.html successfully.");
} else {
    console.log("Could not find mixed-topic-list container in quiz.html.");
}

// 2. Update JS updateMixedTopicUI logic
let js = fs.readFileSync(quizJsPath, 'utf8');

const newJsLogic = `
    updateMixedTopicUI: function() {
        const topics = ['Criminal Law', 'Traffic', 'Custody', 'Evidence', 'Domestic Abuse', 'Detectives', 'PACE'];
        topics.forEach(t => {
            const id = t.replace(' ', '-');
            const el = document.getElementById('mixed-topic-' + id);
            const cb = document.getElementById('mixed-checkbox-' + id);
            if (el && cb) {
                if (this.selectedMixedTopics.includes(t)) {
                    el.style.borderColor = '#2563eb';
                    el.style.background = '#eff6ff';
                    cb.style.background = '#2563eb';
                    cb.style.borderColor = '#2563eb';
                    cb.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                } else {
                    el.style.borderColor = 'transparent';
                    el.style.background = 'white';
                    cb.style.background = 'transparent';
                    cb.style.borderColor = '#cbd5e1';
                    cb.innerHTML = '';
                }
            }
        });

        const btn = document.getElementById('mixed-continue-btn');
        if (btn) {
            if (this.selectedMixedTopics.length >= 2) {
                btn.disabled = false;
                btn.style.background = '#2563eb';
                btn.style.color = 'white';
                btn.style.boxShadow = '0 8px 16px rgba(37, 99, 235, 0.25)';
            } else {
                btn.disabled = true;
                btn.style.background = '#e2e8f0';
                btn.style.color = '#94a3b8';
                btn.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
            }
        }
    },
`;

const jsStart = js.indexOf('updateMixedTopicUI: function() {');
const jsEnd = js.indexOf('submitMixedTopics: function() {');

if (jsStart !== -1 && jsEnd !== -1) {
    js = js.substring(0, jsStart) + newJsLogic.trim() + ',\n\n    ' + js.substring(jsEnd);
    fs.writeFileSync(quizJsPath, js, 'utf8');
    console.log("Updated quiz.js successfully.");
} else {
    console.log("Could not find updateMixedTopicUI in quiz.js");
}
