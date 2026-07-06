const fs = require('fs');

const path = 'c:/Users/Moksha Patel/Desktop/pocket-app-ui-main/quiz-next-gen-ui/variant-a/quiz.html';
let html = fs.readFileSync(path, 'utf8');

// 1. Add onclick handlers to Mock Exam items
const journeyMapRegex = /(Mock Exam Journey Map[\s\S]*?)<\/div>\s*<\/div>\s*<!-- View Previous Exams Button -->/g;

html = html.replace(journeyMapRegex, (match) => {
    // Replace the opening div of each mock exam row
    const rowDivRegex = /<div\s*style="position: relative; display: flex; align-items: center; justify-content: space-between; z-index: 2;">/g;
    const replacement = `<div style="position: relative; display: flex; align-items: center; justify-content: space-between; z-index: 2; cursor: pointer; transition: opacity 0.2s;" onclick="openExamReview(this)" onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'">`;
    return match.replace(rowDivRegex, replacement);
});


// 2. Inject the view-exam-review screen and JS
const examReviewHtml = `
        <!-- Screen: Exam Review Flow -->
        <div id="view-exam-review" class="quiz-view" style="background: #f8fafc;">
            <!-- Header -->
            <div class="header-wrapper">
                <div class="header-inner">
                    <button class="back-btn" onclick="closeExamReview()">←</button>
                    <div style="text-align: center;">
                        <h2 id="review-exam-title" style="margin: 0; font-size: 16px; font-weight: 700; color: #0f172a;">Mock Exam Review</h2>
                        <div id="review-exam-score" style="font-size: 12px; color: #16a34a; font-weight: 700;">Score: --</div>
                    </div>
                    <div style="width: 24px;"></div>
                </div>
            </div>

            <div class="view-content" style="padding-top: 16px; padding-bottom: 120px; background: #f8fafc;">
                <!-- Summary Card -->
                <div class="format-card" style="padding: 16px; margin-bottom: 16px; background: white; border-radius: 12px; border: 1.5px solid rgba(15,23,42,0.04);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <span style="font-size: 13px; font-weight: 600; color: #64748b;">Completed On</span>
                        <span id="review-exam-date" style="font-size: 13px; font-weight: 700; color: #0f172a;">--</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 13px; font-weight: 600; color: #64748b;">Performance Status</span>
                        <span id="review-exam-status" style="font-size: 13px; font-weight: 700; color: #16a34a;">--</span>
                    </div>
                </div>

                <!-- Navigation -->
                <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 8px; margin-bottom: 16px; scrollbar-width: none;">
                    <div id="review-nav-container" style="display: flex; gap: 8px;"></div>
                </div>

                <!-- Question View -->
                <div id="review-question-container" style="background: white; border-radius: 16px; padding: 20px; border: 1.5px solid rgba(15,23,42,0.04); margin-bottom: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 16px;">
                        <span id="review-q-num" style="font-size: 12px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Question 1 of 5</span>
                        <span id="review-q-status" style="font-size: 12px; font-weight: 700; color: #16a34a; background: #ecfdf5; padding: 4px 10px; border-radius: 12px;">Correct</span>
                    </div>
                    <h3 id="review-q-text" style="font-size: 16px; font-weight: 600; color: #0f172a; margin: 0 0 20px 0; line-height: 1.5;">
                        <!-- Question Text -->
                    </h3>
                    
                    <div id="review-options-container" style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
                        <!-- Options injected via JS -->
                    </div>

                    <!-- Explanation -->
                    <div style="background: #f8fafc; border-radius: 12px; padding: 16px; border: 1px solid rgba(15,23,42,0.04);">
                        <h4 style="font-size: 13px; font-weight: 700; color: #0f172a; margin: 0 0 8px 0; display: flex; align-items: center; gap: 6px;">
                            <span>💡</span> Explanation
                        </h4>
                        <p id="review-explanation-text" style="font-size: 13px; color: #475569; margin: 0; line-height: 1.6;">
                            <!-- Explanation text -->
                        </p>
                    </div>
                </div>

                <!-- Footer Nav -->
                <div style="display: flex; gap: 12px;">
                    <button id="review-prev-btn" class="btn-secondary" style="flex: 1; padding: 14px; border-radius: 12px; font-weight: 600;" onclick="changeReviewQuestion(-1)">Previous</button>
                    <button id="review-next-btn" class="btn-primary" style="flex: 1; padding: 14px; border-radius: 12px; font-weight: 600; background: linear-gradient(to bottom, rgb(134, 174, 244), #4b73b7, #345da5); color: white; border: none; box-shadow: 0 4px 12px rgba(70, 107, 169, 0.25); cursor: pointer; transition: all 0.2s;" onclick="changeReviewQuestion(1)">Next</button>
                </div>
            </div>
        </div>

        <script>
            // Dummy Data for Exam Review
            const dummyExamQuestions = [
                {
                    text: "Which of the following describes the primary function of the SA node in the heart?",
                    options: [
                        { text: "Pumping blood to the lungs", isCorrect: false },
                        { text: "Acting as the natural pacemaker", isCorrect: true },
                        { text: "Filtering out toxins from the blood", isCorrect: false },
                        { text: "Providing structural support to valves", isCorrect: false }
                    ],
                    userSelectedIndex: 1, // Correct
                    explanation: "The sinoatrial (SA) node generates an electrical signal that causes the upper heart chambers (atria) to contract. It acts as the heart's natural pacemaker."
                },
                {
                    text: "What is the primary mechanism of action for ACE inhibitors?",
                    options: [
                        { text: "Blocking angiotensin II receptors", isCorrect: false },
                        { text: "Inhibiting the conversion of angiotensin I to angiotensin II", isCorrect: true },
                        { text: "Increasing heart rate directly", isCorrect: false },
                        { text: "Promoting sodium retention", isCorrect: false }
                    ],
                    userSelectedIndex: 0, // Incorrect, selected first
                    explanation: "ACE inhibitors prevent the Angiotensin-Converting Enzyme from converting Angiotensin I to Angiotensin II, which normally causes blood vessels to constrict."
                },
                {
                    text: "In the context of respiratory physiology, what does the term 'tidal volume' refer to?",
                    options: [
                        { text: "The maximum amount of air a person can exhale", isCorrect: false },
                        { text: "The volume of air breathed in and out during normal resting breathing", isCorrect: true },
                        { text: "The amount of air remaining in the lungs after forced exhalation", isCorrect: false },
                        { text: "The total volume of the lungs", isCorrect: false }
                    ],
                    userSelectedIndex: 1, // Correct
                    explanation: "Tidal volume is the amount of air that moves in or out of the lungs with each respiratory cycle at rest, typically around 500 mL in an average adult."
                },
                {
                    text: "Which class of drugs is commonly used as a first-line treatment for Type 2 Diabetes?",
                    options: [
                        { text: "Sulfonylureas", isCorrect: false },
                        { text: "Biguanides (e.g., Metformin)", isCorrect: true },
                        { text: "Thiazolidinediones", isCorrect: false },
                        { text: "Insulin", isCorrect: false }
                    ],
                    userSelectedIndex: 3, // Incorrect
                    explanation: "Metformin, a biguanide, is widely considered the first-line medication for the treatment of type 2 diabetes due to its safety profile and effectiveness."
                },
                {
                    text: "What part of the brain is primarily responsible for regulating body temperature?",
                    options: [
                        { text: "Cerebellum", isCorrect: false },
                        { text: "Hypothalamus", isCorrect: true },
                        { text: "Medulla oblongata", isCorrect: false },
                        { text: "Thalamus", isCorrect: false }
                    ],
                    userSelectedIndex: 1, // Correct
                    explanation: "The hypothalamus acts as the body's thermostat, regulating temperature by triggering changes like sweating or shivering."
                }
            ];

            let currentReviewIndex = 0;

            function openExamReview(element) {
                // Extract data from the clicked element
                const titleEl = element.querySelector('div[style*="font-size: 14px"]');
                const dateEl = element.querySelector('div[style*="font-size: 12px"]');
                const scoreEl = element.querySelector('span[style*="font-size: 13px"]');

                const title = titleEl ? titleEl.innerText : "Mock Exam Review";
                const date = dateEl ? dateEl.innerText : "Recently";
                const score = scoreEl ? scoreEl.innerText : "N/A";

                document.getElementById('review-exam-title').innerText = title;
                document.getElementById('review-exam-score').innerText = "Score: " + score;
                document.getElementById('review-exam-date').innerText = date;

                // Make color of score dynamic
                const scoreNum = parseInt(score);
                const statusEl = document.getElementById('review-exam-status');
                if (!isNaN(scoreNum)) {
                    const color = scoreNum >= 70 ? '#16a34a' : (scoreNum >= 50 ? '#ea580c' : '#ef4444');
                    document.getElementById('review-exam-score').style.color = color;
                    statusEl.style.color = color;
                    statusEl.innerText = scoreNum >= 70 ? 'Passed' : (scoreNum >= 50 ? 'Needs Work' : 'Failed');
                }

                currentReviewIndex = 0;
                renderReviewNav();
                renderReviewQuestion();

                // Switch views
                document.querySelectorAll('.quiz-view').forEach(v => v.classList.remove('active'));
                document.getElementById('view-exam-review').classList.add('active');
                window.scrollTo(0,0);
            }

            function closeExamReview() {
                document.querySelectorAll('.quiz-view').forEach(v => v.classList.remove('active'));
                document.getElementById('view-progress').classList.add('active');
                window.scrollTo(0,0);
            }

            function renderReviewNav() {
                const navContainer = document.getElementById('review-nav-container');
                navContainer.innerHTML = '';
                dummyExamQuestions.forEach((q, idx) => {
                    const btn = document.createElement('button');
                    btn.innerText = idx + 1;
                    btn.onclick = () => {
                        currentReviewIndex = idx;
                        renderReviewNav();
                        renderReviewQuestion();
                    };
                    
                    let bg = '#ffffff';
                    let color = '#64748b';
                    let border = '1.5px solid #e2e8f0';
                    
                    if (idx === currentReviewIndex) {
                        bg = '#0f172a';
                        color = '#ffffff';
                        border = '1.5px solid #0f172a';
                    } else if (q.userSelectedIndex === q.options.findIndex(o => o.isCorrect)) {
                        color = '#16a34a'; // Subtle green hint for correct
                        border = '1.5px solid rgba(22,163,74,0.3)';
                    } else {
                        color = '#ef4444'; // Subtle red hint for incorrect
                        border = '1.5px solid rgba(239,68,68,0.3)';
                    }

                    btn.style = \`width: 36px; height: 36px; min-width: 36px; border-radius: 50%; border: \${border}; background: \${bg}; color: \${color}; font-weight: 700; font-size: 14px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;\`;
                    navContainer.appendChild(btn);
                });

                document.getElementById('review-prev-btn').disabled = currentReviewIndex === 0;
                document.getElementById('review-prev-btn').style.opacity = currentReviewIndex === 0 ? '0.4' : '1';
                
                document.getElementById('review-next-btn').disabled = currentReviewIndex === dummyExamQuestions.length - 1;
                document.getElementById('review-next-btn').style.opacity = currentReviewIndex === dummyExamQuestions.length - 1 ? '0.4' : '1';
            }

            function renderReviewQuestion() {
                const q = dummyExamQuestions[currentReviewIndex];
                
                document.getElementById('review-q-num').innerText = \`Question \${currentReviewIndex + 1} of \${dummyExamQuestions.length}\`;
                
                const isCorrect = q.userSelectedIndex === q.options.findIndex(o => o.isCorrect);
                const statusEl = document.getElementById('review-q-status');
                if (isCorrect) {
                    statusEl.innerText = "Correct";
                    statusEl.style.color = "#16a34a";
                    statusEl.style.background = "#ecfdf5";
                } else {
                    statusEl.innerText = "Incorrect";
                    statusEl.style.color = "#ef4444";
                    statusEl.style.background = "#fef2f2";
                }

                document.getElementById('review-q-text').innerText = q.text;
                document.getElementById('review-explanation-text').innerText = q.explanation;

                const optionsContainer = document.getElementById('review-options-container');
                optionsContainer.innerHTML = '';

                q.options.forEach((opt, idx) => {
                    const optDiv = document.createElement('div');
                    
                    let bg = '#ffffff';
                    let border = '1.5px solid rgba(15,23,42,0.06)';
                    let icon = '<div style="width: 22px; height: 22px; border-radius: 50%; border: 1.5px solid #cbd5e1;"></div>';
                    
                    if (opt.isCorrect) {
                        bg = '#ecfdf5';
                        border = '1.5px solid #10b981';
                        icon = '<div style="width: 22px; height: 22px; border-radius: 50%; background: #10b981; color: white; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: bold;">✓</div>';
                    } else if (idx === q.userSelectedIndex) {
                        // User selected this but it's wrong
                        bg = '#fef2f2';
                        border = '1.5px solid #ef4444';
                        icon = '<div style="width: 22px; height: 22px; border-radius: 50%; background: #ef4444; color: white; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: bold;">✗</div>';
                    }

                    optDiv.style = \`padding: 16px; border-radius: 12px; background: \${bg}; border: \${border}; display: flex; gap: 12px; align-items: flex-start;\`;
                    
                    optDiv.innerHTML = \`
                        \${icon}
                        <div style="font-size: 14px; font-weight: 600; color: #0f172a; line-height: 1.4;">\${opt.text}</div>
                    \`;
                    optionsContainer.appendChild(optDiv);
                });
            }

            function changeReviewQuestion(dir) {
                const newIdx = currentReviewIndex + dir;
                if (newIdx >= 0 && newIdx < dummyExamQuestions.length) {
                    currentReviewIndex = newIdx;
                    renderReviewNav();
                    renderReviewQuestion();
                }
            }
        </script>
`;

const insertIndex = html.indexOf('<script src="quiz.js?v=7"></script>');
if (insertIndex !== -1) {
    html = html.substring(0, insertIndex) + examReviewHtml + html.substring(insertIndex);
    fs.writeFileSync(path, html);
    console.log("Successfully implemented Exam Review Flow.");
} else {
    console.error("Could not find the script tag to inject the review flow.");
}
