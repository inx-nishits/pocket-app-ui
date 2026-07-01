const fs = require('fs');

const path = 'quiz.js';
const content = fs.readFileSync(path, 'utf8');

const regex = /initProgress: function\(\) \{[\s\S]*?startTopicRevision: function\(\) \{[\s\S]*?\},/m;

const newCode = `
    // --- Progress Data ---
    progressChartInstance: null,
    allProgressData: [45, 50, 48, 55, 52, 60, 58, 62, 65, 61, 68, 70, 72, 71, 75, 78, 80, 82, 85, 88],
    recentProgressData: [78, 80, 82, 85, 88],
    topicsPerformance: [
        { id: 'fraud', name: 'Fraud', score: 92, prevScore: 90 },
        { id: 'criminal_law', name: 'Criminal Law', score: 85, prevScore: 80 },
        { id: 'evidence', name: 'Evidence', score: 76, prevScore: 79 },
        { id: 'pace', name: 'PACE', score: 65, prevScore: 64 },
        { id: 'disclosure', name: 'Disclosure', score: 58, prevScore: 62 },
        { id: 'sexual_offences', name: 'Sexual Offences', score: 45, prevScore: 47 }
    ],
    selectedAiQuestionCount: 10,
    weakestSubjectsList: [],

    initProgress: function() {
        this.renderTopicPerformance();
        this.renderFocusAreas();
        this.renderAiFocusSection();
        
        setTimeout(() => {
            this.initProgressChart('recent');
        }, 100);
    },

    initProgressChart: function(mode) {
        const ctx = document.getElementById('progressChart');
        if (!ctx) return;
        
        if (this.progressChartInstance) {
            this.progressChartInstance.destroy();
        }

        const isRecent = mode === 'recent';
        const data = isRecent ? this.recentProgressData : this.allProgressData;
        const labels = data.map((_, i) => isRecent ? \`Mock \${i+1}\` : \`M\${i+1}\`);

        const btnRecent = document.getElementById('chart-btn-recent');
        const btnAll = document.getElementById('chart-btn-all');
        if (btnRecent && btnAll) {
            if (isRecent) {
                btnRecent.style.background = 'white';
                btnRecent.style.color = '#0f172a';
                btnRecent.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                
                btnAll.style.background = 'transparent';
                btnAll.style.color = '#64748b';
                btnAll.style.boxShadow = 'none';
            } else {
                btnAll.style.background = 'white';
                btnAll.style.color = '#0f172a';
                btnAll.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                
                btnRecent.style.background = 'transparent';
                btnRecent.style.color = '#64748b';
                btnRecent.style.boxShadow = 'none';
            }
        }

        const chartConfig = {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Score %',
                    data: data,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: isRecent ? '#10b981' : 'transparent',
                    pointBorderColor: isRecent ? '#ffffff' : 'transparent',
                    pointBorderWidth: isRecent ? 2 : 0,
                    pointRadius: isRecent ? 6 : 0,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) { return context.parsed.y + '%'; }
                        }
                    },
                    zoom: isRecent ? false : {
                        pan: { enabled: true, mode: 'x' },
                        zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'x' }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: { color: '#f1f5f9' },
                        ticks: { color: '#94a3b8', stepSize: 25, callback: function(value) { return value + '%'; } }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#94a3b8', maxTicksLimit: isRecent ? 5 : 10 }
                    }
                }
            }
        };

        if (window.Chart) {
            this.progressChartInstance = new Chart(ctx, chartConfig);
        } else {
            console.warn('Chart.js not loaded yet.');
            setTimeout(() => this.initProgressChart(mode), 500);
        }
    },

    toggleChartMode: function(mode) {
        this.initProgressChart(mode);
    },

    renderTopicPerformance: function() {
        const container = document.getElementById('topic-performance-list');
        if (!container) return;

        let html = '';
        this.topicsPerformance.forEach(topic => {
            let color, bgColor, icon, title;
            if (topic.score >= 90) {
                color = '#16a34a'; bgColor = '#ecfdf5'; icon = '🏅'; title = 'Mastered';
            } else if (topic.score >= 80) {
                color = '#10b981'; bgColor = '#d1fae5'; icon = '✅'; title = 'Strong';
            } else if (topic.score >= 65) {
                color = '#f59e0b'; bgColor = '#fef3c7'; icon = '📈'; title = 'Developing';
            } else {
                color = '#ef4444'; bgColor = '#fee2e2'; icon = '⚠️'; title = 'Weak';
            }

            const diff = topic.score - topic.prevScore;
            let trendHtml = '';
            if (diff > 0) {
                trendHtml = \`<span style="font-size: 11px; font-weight: 700; color: #16a34a; margin-left: 6px;">↑ +\${diff}%</span>\`;
            } else if (diff < 0) {
                trendHtml = \`<span style="font-size: 11px; font-weight: 700; color: #ef4444; margin-left: 6px;">↓ \${diff}%</span>\`;
            } else {
                trendHtml = \`<span style="font-size: 11px; font-weight: 700; color: #94a3b8; margin-left: 6px;">- 0%</span>\`;
            }

            html += \`
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="font-size: 14px; font-weight: 700; color: #1e293b;">\${topic.name}</span>
                            <span style="font-size: 10px; font-weight: 700; color: \${color}; background: \${bgColor}; padding: 2px 6px; border-radius: 6px; display: flex; align-items: center; gap: 4px;">\${icon} \${title}</span>
                        </div>
                        <div style="display: flex; align-items: center;">
                            <span style="font-size: 15px; font-weight: 800; color: \${color};">\${topic.score}%</span>
                            \${trendHtml}
                        </div>
                    </div>
                    <div style="height: 6px; background: #f1f5f9; border-radius: 3px; width: 100%; overflow: hidden;">
                        <div style="height: 100%; background: \${color}; width: \${topic.score}%; border-radius: 3px;"></div>
                    </div>
                </div>
            \`;
        });
        container.innerHTML = html;
    },

    renderFocusAreas: function() {
        const container = document.getElementById('focus-areas-list');
        if (!container) return;

        const weakTopics = this.topicsPerformance.filter(t => t.score < 65).sort((a,b) => a.score - b.score);
        let html = '';
        weakTopics.forEach(topic => {
            const pooIcon = topic.score < 50 ? '💩 ' : '';
            html += \`
                <div onclick="QuizEngine.startTopicRevision('\${topic.name}')" style="cursor: pointer; display: flex; align-items: center; justify-content: space-between; background: #fff7ed; padding: 14px 16px; border-radius: 12px; border: 1px solid #ffedd5; transition: transform 0.1s ease, box-shadow 0.2s; box-shadow: 0 1px 2px rgba(234, 88, 12, 0.05);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(234, 88, 12, 0.1)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 1px 2px rgba(234, 88, 12, 0.05)';">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 15px; font-weight: 800; color: #c2410c;">\${pooIcon}\${topic.name}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 12px; font-weight: 700; color: #ea580c; background: rgba(234, 88, 12, 0.1); padding: 4px 8px; border-radius: 6px;">\${topic.score}% Accuracy</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#ea580c" stroke-width="2" style="width: 16px; height: 16px;"><path d="M9 18l6-6-6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </div>
                </div>
            \`;
        });
        container.innerHTML = html;
    },

    renderAiFocusSection: function() {
        const container = document.getElementById('ai-weak-subjects-container');
        if (!container) return;

        this.weakestSubjectsList = this.topicsPerformance.filter(t => t.score < 65).sort((a,b) => a.score - b.score).slice(0, 3).map(t => t.name);
        
        if (this.weakestSubjectsList.length === 0) {
            this.weakestSubjectsList = this.topicsPerformance.sort((a,b) => a.score - b.score).slice(0, 2).map(t => t.name);
        }

        let html = '';
        this.weakestSubjectsList.forEach(name => {
            html += \`<span style="font-size: 12px; font-weight: 700; color: #1e3a8a; background: #bfdbfe; padding: 4px 10px; border-radius: 20px;">\${name}</span>\`;
        });
        container.innerHTML = html;
    },

    setAiCount: function(count) {
        this.selectedAiQuestionCount = count;
        document.querySelectorAll('.ai-count-btn').forEach(btn => {
            if (parseInt(btn.dataset.count) === count) {
                btn.classList.add('selected');
                btn.style.background = '#eff6ff';
                btn.style.border = '2px solid #3b82f6';
                btn.style.color = '#466ba9';
            } else {
                btn.classList.remove('selected');
                btn.style.background = 'white';
                btn.style.border = '2px solid #e2e8f0';
                btn.style.color = '#64748b';
            }
        });
    },

    startAiPractice: function() {
        this.selectedMixedTopics = this.weakestSubjectsList;
        this.selectedCategory = 'AI Focus Tutor';
        this.currentFormat = 'Standard Quiz';
        this.currentMode = 'Practice Weak Areas';
        
        // Setup state for new quiz
        this.totalQuestions = this.selectedAiQuestionCount;
        this.currentQuestion = 0;
        this.score = 0;
        this.streak = 0;
        this.totalXp = 0;
        this.timeLeft = 600; // arbitrary 10 min for AI tutor
        this.isTimeUp = false;
        
        this.navigate('view-active', 'view-progress');
        this.startQuiz();
    },

    startTopicRevision: function(topicName) {
        this.currentFlow = 'topic';
        this.navigate('view-practice-topic');
        
        setTimeout(() => {
            const titles = document.querySelectorAll('.topic-title');
            titles.forEach(title => {
                if(title.innerText.includes(topicName)) {
                    const opt = title.closest('.topic-option');
                    if (opt) opt.click();
                }
            });
        }, 100);
    },
`;

if (content.match(regex)) {
    const updated = content.replace(regex, newCode);
    fs.writeFileSync(path, updated);
    console.log('quiz.js updated successfully.');
} else {
    console.error('quiz.js regex did not match!');
}
