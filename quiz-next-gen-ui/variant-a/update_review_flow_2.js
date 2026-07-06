const fs = require('fs');

const path = 'c:/Users/Moksha Patel/Desktop/pocket-app-ui-main/quiz-next-gen-ui/variant-a/quiz.html';
let html = fs.readFileSync(path, 'utf8');

const scriptStartTag = '<!-- Screen: Exam Review Flow -->';
const scriptEndTag = 'function changeReviewQuestion(dir) {'; // We will replace up to the end of the script tag manually using regex

const reviewBlockRegex = /(<!-- Screen: Exam Review Flow -->[\s\S]*?)<\/script>/;

const newReviewHtml = `<!-- Screen: Exam Review Flow -->
        <div id="view-exam-review" class="quiz-view" style="background: #f8fafc;">
            <!-- Header -->
            <div class="header-wrapper">
                <div class="header-inner">
                    <div class="header-left">
                        <button class="back-btn" onclick="closeExamReview()">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 19l-7-7 7-7" stroke="currentColor" stroke-width="2.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                        <h1 id="review-exam-title" class="header-title">Mock Exam Review</h1>
                    </div>
                </div>
            </div>

            <div class="view-content" style="padding-top: 16px; padding-bottom: 120px; background: #f8fafc;">
                <!-- Summary Card -->
                <div class="format-card" style="padding: 20px; margin-bottom: 24px; background: white; border-radius: 16px; border: 1.5px solid rgba(15,23,42,0.04); box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 16px;">
                        <span style="font-size: 14px; font-weight: 600; color: #64748b;">Completed On</span>
                        <span id="review-exam-date" style="font-size: 14px; font-weight: 700; color: #0f172a;">--</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 16px;">
                        <span style="font-size: 14px; font-weight: 600; color: #64748b;">Final Score</span>
                        <span id="review-exam-score" style="font-size: 18px; font-weight: 800; color: #16a34a;">--</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 14px; font-weight: 600; color: #64748b;">Performance Status</span>
                        <span id="review-exam-status" style="font-size: 14px; font-weight: 700; color: #16a34a; background: #ecfdf5; padding: 4px 12px; border-radius: 20px;">--</span>
                    </div>
                </div>

                <!-- Navigation -->
                <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 12px; margin-bottom: 16px; scrollbar-width: none;">
                    <div id="review-nav-container" style="display: flex; gap: 8px;"></div>
                </div>

                <!-- Question View -->
                <div id="review-question-container" style="background: white; border-radius: 16px; padding: 24px; border: 1.5px solid rgba(15,23,42,0.04); margin-bottom: 24px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                        <span id="review-q-num" style="font-size: 13px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Question 1 of 5</span>
                        <span id="review-q-status" style="font-size: 13px; font-weight: 700; color: #16a34a; background: #ecfdf5; padding: 4px 12px; border-radius: 20px;">Correct</span>
                    </div>
                    
                    <div class="quiz-content-area" style="padding: 0; min-height: auto;">
                        <h2 class="question-text" id="review-q-text" style="font-size: 18px; line-height: 1.5; margin-bottom: 24px;">
                            <!-- Question Text -->
                        </h2>
                        
                        <div class="answers-grid" id="review-options-container" style="margin-bottom: 24px;">
                            <!-- Options injected via JS -->
                        </div>
                    </div>

                    <!-- Explanation -->
                    <div style="background: #f8fafc; border-radius: 12px; padding: 20px; border: 1px solid rgba(15,23,42,0.04);">
                        <h4 style="font-size: 14px; font-weight: 700; color: #0f172a; margin: 0 0 12px 0; display: flex; align-items: center; gap: 8px;">
                            <span>💡</span> Explanation
                        </h4>
                        <p id="review-explanation-text" style="font-size: 14px; color: #475569; margin: 0; line-height: 1.6;">
                            <!-- Explanation text -->
                        </p>
                    </div>
                </div>

                <!-- Footer Nav -->
                <div style="display: flex; gap: 16px;">
                    <button id="review-prev-btn" class="btn-secondary" style="flex: 1; padding: 16px; border-radius: 14px; font-weight: 600; font-size: 15px;" onclick="changeReviewQuestion(-1)">Previous</button>
                    <button id="review-next-btn" class="btn-primary" style="flex: 1; padding: 16px; border-radius: 14px; font-weight: 600; font-size: 15px; background: linear-gradient(to bottom, rgb(134, 174, 244), #4b73b7, #345da5); color: white; border: none; box-shadow: 0 4px 12px rgba(70, 107, 169, 0.25); cursor: pointer; transition: all 0.2s;" onclick="changeReviewQuestion(1)">Next</button>
                </div>
            </div>
        </div>

        <script>
            // Multiple Banks of questions depending on Mock Exam clicked
            const examBanks = {
                default: [
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
                        userSelectedIndex: 0, // Incorrect
                        explanation: "ACE inhibitors prevent the Angiotensin-Converting Enzyme from converting Angiotensin I to Angiotensin II, which normally causes blood vessels to constrict."
                    }
                ],
                mock1: [
                    {
                        text: "A 45-year-old male presents with acute chest pain radiating to his left arm. An ECG shows ST elevation in leads II, III, and aVF. Which coronary artery is most likely occluded?",
                        options: [
                            { text: "Left Anterior Descending (LAD)", isCorrect: false },
                            { text: "Left Circumflex (LCx)", isCorrect: false },
                            { text: "Right Coronary Artery (RCA)", isCorrect: true },
                            { text: "Left Main Coronary Artery", isCorrect: false }
                        ],
                        userSelectedIndex: 0, // Incorrect
                        explanation: "ST elevations in II, III, and aVF indicate an inferior myocardial infarction, which is most commonly caused by an occlusion of the Right Coronary Artery."
                    },
                    {
                        text: "Which of the following medications is considered the gold standard for long-term treatment of bipolar I disorder?",
                        options: [
                            { text: "Sertraline", isCorrect: false },
                            { text: "Haloperidol", isCorrect: false },
                            { text: "Lithium", isCorrect: true },
                            { text: "Diazepam", isCorrect: false }
                        ],
                        userSelectedIndex: 2, // Correct
                        explanation: "Lithium is widely considered the first-line and gold-standard mood stabilizer for the long-term maintenance treatment of bipolar disorder."
                    }
                ],
                mock2: [
                    {
                        text: "Which of the following signs is highly specific for acute appendicitis?",
                        options: [
                            { text: "Murphy's sign", isCorrect: false },
                            { text: "McBurney's point tenderness", isCorrect: true },
                            { text: "Cullen's sign", isCorrect: false },
                            { text: "Grey Turner's sign", isCorrect: false }
                        ],
                        userSelectedIndex: 1, // Correct
                        explanation: "McBurney's point tenderness is a classic and highly specific physical exam finding associated with acute appendicitis."
                    },
                    {
                        text: "What is the most common cause of community-acquired pneumonia in adults?",
                        options: [
                            { text: "Staphylococcus aureus", isCorrect: false },
                            { text: "Mycoplasma pneumoniae", isCorrect: false },
                            { text: "Streptococcus pneumoniae", isCorrect: true },
                            { text: "Haemophilus influenzae", isCorrect: false }
                        ],
                        userSelectedIndex: 2, // Correct
                        explanation: "Streptococcus pneumoniae (pneumococcus) is by far the most common bacterial cause of typical community-acquired pneumonia in adults."
                    }
                ]
            };

            let currentReviewIndex = 0;
            let currentActiveBank = examBanks.default;

            function openExamReview(element) {
                // Robust text parsing
                const text = element.innerText || "";
                let title = "Mock Exam Review";
                let date = "Recently";
                let score = "N/A";

                const titleMatch = text.match(/Mock Exam #[0-9]+/);
                if (titleMatch) title = titleMatch[0];

                const dateMatch = text.match(/(Oct|Sep|Aug|Jul|Jun|May|Apr|Mar|Feb|Jan)\\s\\d{2},\\s\\d{4}.*?[AM|PM]{2}/);
                if (dateMatch) date = dateMatch[0];

                const scoreMatch = text.match(/\\d+%/);
                if (scoreMatch) score = scoreMatch[0];

                document.getElementById('review-exam-title').innerText = title;
                document.getElementById('review-exam-score').innerText = score;
                document.getElementById('review-exam-date').innerText = date;

                // Load specific questions depending on the mock exam
                if (title.includes('#1')) {
                    currentActiveBank = examBanks.mock1;
                } else if (title.includes('#2')) {
                    currentActiveBank = examBanks.mock2;
                } else {
                    currentActiveBank = examBanks.default;
                }

                // Make color of score dynamic
                const scoreNum = parseInt(score);
                const statusEl = document.getElementById('review-exam-status');
                if (!isNaN(scoreNum)) {
                    const color = scoreNum >= 70 ? '#16a34a' : (scoreNum >= 50 ? '#ea580c' : '#ef4444');
                    const bg = scoreNum >= 70 ? '#ecfdf5' : (scoreNum >= 50 ? '#fff7ed' : '#fef2f2');
                    document.getElementById('review-exam-score').style.color = color;
                    statusEl.style.color = color;
                    statusEl.style.background = bg;
                    statusEl.innerText = scoreNum >= 70 ? 'Passed' : (scoreNum >= 50 ? 'Needs Work' : 'Failed');
                } else {
                    document.getElementById('review-exam-score').style.color = '#0f172a';
                    statusEl.style.color = '#0f172a';
                    statusEl.style.background = '#f1f5f9';
                    statusEl.innerText = 'Completed';
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
                currentActiveBank.forEach((q, idx) => {
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

                    btn.style = \`width: 40px; height: 40px; min-width: 40px; border-radius: 50%; border: \${border}; background: \${bg}; color: \${color}; font-weight: 700; font-size: 15px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;\`;
                    navContainer.appendChild(btn);
                });

                document.getElementById('review-prev-btn').disabled = currentReviewIndex === 0;
                document.getElementById('review-prev-btn').style.opacity = currentReviewIndex === 0 ? '0.4' : '1';
                
                document.getElementById('review-next-btn').disabled = currentReviewIndex === currentActiveBank.length - 1;
                document.getElementById('review-next-btn').style.opacity = currentReviewIndex === currentActiveBank.length - 1 ? '0.4' : '1';
            }

            function renderReviewQuestion() {
                const q = currentActiveBank[currentReviewIndex];
                
                document.getElementById('review-q-num').innerText = \`Question \${currentReviewIndex + 1} of \${currentActiveBank.length}\`;
                
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
                optionsContainer.innerHTML = q.options.map((opt, idx) => {
                    let btnClass = 'answer-btn';
                    
                    if (opt.isCorrect) {
                        btnClass += ' correct correct-revealed';
                    } else if (idx === q.userSelectedIndex) {
                        btnClass += ' wrong';
                    }
                    
                    const letter = String.fromCharCode(65 + idx);
                    return \`<button class="\${btnClass}" style="display: flex; gap: 12px; align-items: flex-start; cursor: default; pointer-events: none;">
                        <span style="font-weight: 700; opacity: 0.7; flex-shrink: 0;">\${letter}.</span>
                        <span style="text-align: left;">\${opt.text}</span>
                    </button>\`;
                }).join('');
            }

            function changeReviewQuestion(dir) {
                const newIdx = currentReviewIndex + dir;
                if (newIdx >= 0 && newIdx < currentActiveBank.length) {
                    currentReviewIndex = newIdx;
                    renderReviewNav();
                    renderReviewQuestion();
                }
            }
        </script>`;

if (html.match(reviewBlockRegex)) {
    html = html.replace(reviewBlockRegex, newReviewHtml);
    fs.writeFileSync(path, html);
    console.log("Successfully rebuilt the Exam Review Flow UI and logic.");
} else {
    console.error("Could not find the existing review flow to replace.");
}
