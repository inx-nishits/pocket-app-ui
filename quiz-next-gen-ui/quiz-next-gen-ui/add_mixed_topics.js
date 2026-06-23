const fs = require('fs');

const quizHtmlPath = 'c:\\Users\\Moksha Patel\\Desktop\\pocket-app-ui 15\\pocket-app-ui\\pocket-app-ui\\quize next-gen-ui\\variant-a\\quiz.html';
const quizJsPath = 'c:\\Users\\Moksha Patel\\Desktop\\pocket-app-ui 15\\pocket-app-ui\\pocket-app-ui\\quize next-gen-ui\\variant-a\\quiz.js';

// 1. Update HTML
let html = fs.readFileSync(quizHtmlPath, 'utf8');

const topics = ['Criminal Law', 'Traffic', 'Custody', 'Evidence', 'Domestic Abuse', 'Detectives', 'PACE'];
let topicHtml = '';
topics.forEach(t => {
    topicHtml += `
                    <div class="mixed-topic-item" onclick="QuizEngine.toggleMixedTopic('${t}')" id="mixed-topic-${t.replace(' ', '-')}" style="display: flex; align-items: center; justify-content: space-between; padding: 16px; background: white; border-radius: 12px; border: 1.5px solid #e2e8f0; cursor: pointer; transition: all 0.2s ease; margin-bottom: 12px;">
                        <span style="font-size: 16px; font-weight: 600; color: #0f172a;">${t}</span>
                        <div class="mixed-checkbox" id="mixed-checkbox-${t.replace(' ', '-')}" style="width: 24px; height: 24px; border-radius: 6px; border: 2px solid #cbd5e1; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease;"></div>
                    </div>`;
});

const mixedTopicViewHtml = `
        <!-- Screen: Mixed Practice Topic Selection -->
        <div id="view-mixed-topic-selection" class="quiz-view">
            <div class="header-wrapper">
                <div class="header-inner">
                    <div class="header-left">
                        <button class="back-btn" onclick="QuizEngine.navigateBack()">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 19l-7-7 7-7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                        <h1 class="header-title">Select Topics</h1>
                    </div>
                </div>
                <div style="padding: 0 20px 16px;">
                    <p style="font-size: 14px; color: #64748b; margin: 0;">Select a minimum of 2 topics to mix.</p>
                </div>
            </div>

            <div class="view-content" style="padding-top: 16px; padding-bottom: 120px;">
                <div id="mixed-topic-list" style="padding: 0 20px;">
${topicHtml}
                </div>
            </div>

            <div style="position: fixed; bottom: 0; left: 0; width: 100%; padding: 16px 20px 32px; background: linear-gradient(to top, white 80%, rgba(255,255,255,0)); z-index: 50; display: flex; justify-content: center; pointer-events: none;">
                <button id="mixed-continue-btn" onclick="QuizEngine.submitMixedTopics()" disabled style="pointer-events: auto; background: #e2e8f0; color: #94a3b8; width: 100%; max-width: 400px; padding: 16px; border-radius: 16px; font-size: 16px; font-weight: 700; border: none; transition: all 0.2s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">Continue</button>
            </div>
        </div>
`;

if (!html.includes('id="view-mixed-topic-selection"')) {
    const diffIndex = html.indexOf('<div id="view-practice-difficulty" class="quiz-view">');
    html = html.substring(0, diffIndex) + mixedTopicViewHtml + '\n        ' + html.substring(diffIndex);
    fs.writeFileSync(quizHtmlPath, html, 'utf8');
    console.log("Updated quiz.html successfully.");
} else {
    console.log("quiz.html already has view-mixed-topic-selection.");
}

// 2. Update JS
let js = fs.readFileSync(quizJsPath, 'utf8');

if (!js.includes('selectedMixedTopics: []')) {
    // Add state variable
    js = js.replace('selectedFormat: null,', 'selectedFormat: null,\n    selectedMixedTopics: [],');
    
    // Replace startFlow logic to navigate to new view
    js = js.replace("} else if (flowName === 'mixed') {\n            this.startPracticeQuiz('Mixed Practice');", "} else if (flowName === 'mixed') {\n            this.selectedMixedTopics = [];\n            this.updateMixedTopicUI();\n            this.navigate('view-mixed-topic-selection');");

    // Add new methods
    const methodsToAdd = `
    toggleMixedTopic: function(topic) {
        const index = this.selectedMixedTopics.indexOf(topic);
        if (index > -1) {
            this.selectedMixedTopics.splice(index, 1);
        } else {
            this.selectedMixedTopics.push(topic);
        }
        this.updateMixedTopicUI();
    },

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
                    cb.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                } else {
                    el.style.borderColor = '#e2e8f0';
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

    submitMixedTopics: function() {
        if (this.selectedMixedTopics.length >= 2) {
            // They chose the topics, now proceed as Practice By Topic mode but for Mixed
            this.selectedCategory = 'Mixed Practice';
            this.currentFormat = 'Standard Quiz';
            this.currentMode = 'Mixed Practice';
            this.navigate('view-practice-difficulty');
        }
    },
`;

    js = js.replace('handleExamSelection: function(examName) {', methodsToAdd + '\n    handleExamSelection: function(examName) {');
    
    fs.writeFileSync(quizJsPath, js, 'utf8');
    console.log("Updated quiz.js successfully.");
} else {
    console.log("quiz.js already has Mixed Topic logic.");
}
