import os

file_path = r'C:\Projects\pocket-app-ui\quiz-next-gen-ui\variant-a\quiz.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

new_views = """
    <!-- Screen: Exam Selection -->
    <div id="view-exam-selection" class="quiz-view">
        <div class="header-wrapper">
            <div class="header-inner">
                <div class="header-left">
                    <button class="back-btn" onclick="QuizEngine.navigateBack()">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 19l-7-7 7-7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <h1 class="header-title">Select Target Exam</h1>
                </div>
            </div>
        </div>
        <div class="view-content format-list" style="padding-top: 16px;">
            <div class="format-card" onclick="QuizEngine.selectExamType('Sergeant')">
                <div class="format-card-left">
                    <div class="category-icon-top" style="color: #2563eb;"><img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f4ae.png" style="width: 24px; height: 24px;"></div>
                    <div class="format-info">
                        <h3>Constable to Sergeant</h3>
                        <p>NPPF Step 2 Legal Examination.</p>
                    </div>
                </div>
            </div>
            <div class="format-card" onclick="QuizEngine.selectExamType('Inspector')">
                <div class="format-card-left">
                    <div class="category-icon-top" style="color: #7c3aed;"><img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f393.png" style="width: 24px; height: 24px;"></div>
                    <div class="format-info">
                        <h3>Sergeant to Inspector</h3>
                        <p>NPPF Step 2 Legal Examination.</p>
                    </div>
                </div>
            </div>
            <div class="format-card" onclick="QuizEngine.selectExamType('NIE')">
                <div class="format-card-left">
                    <div class="category-icon-top" style="color: #059669;"><img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f50d.png" style="width: 24px; height: 24px;"></div>
                    <div class="format-info">
                        <h3>NIE (Detectives)</h3>
                        <p>National Investigators' Examination.</p>
                    </div>
                </div>
            </div>
            <div style="height: 100px;"></div>
        </div>
    </div>

    <!-- Screen: Targeted Practice Selection -->
    <div id="view-practice-selection" class="quiz-view">
        <div class="header-wrapper">
            <div class="header-inner">
                <div class="header-left">
                    <button class="back-btn" onclick="QuizEngine.navigateBack()">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 19l-7-7 7-7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <h1 class="header-title">Targeted Practice</h1>
                </div>
            </div>
        </div>
        <div class="view-content" style="padding-top: 16px;">
            <p style="padding: 0 16px; color: #64748b; margin-bottom: 16px;">Select syllabus areas to focus on:</p>
            <div class="grid-2-col">
                <div class="category-card card active" onclick="this.classList.toggle('active')">
                    <div class="card-content">
                        <div class="card-title">Crime</div>
                        <div class="card-subtitle">Offences, theft, assault, etc.</div>
                    </div>
                </div>
                <div class="category-card card" onclick="this.classList.toggle('active')">
                    <div class="card-content">
                        <div class="card-title">Evidence & Procedure</div>
                        <div class="card-subtitle">PACE, disclosure, evidence.</div>
                    </div>
                </div>
                <div class="category-card card" onclick="this.classList.toggle('active')">
                    <div class="card-content">
                        <div class="card-title">General Police Duties</div>
                        <div class="card-subtitle">Traffic, public order, weapons.</div>
                    </div>
                </div>
            </div>
            <div style="padding: 24px 16px;">
                <label style="font-weight: 600; margin-bottom: 8px; display: block;">Number of Questions:</label>
                <div style="display: flex; gap: 8px;">
                    <button class="btn-secondary" style="flex: 1;" onclick="QuizEngine.startPractice(10)">10</button>
                    <button class="btn-secondary" style="flex: 1;" onclick="QuizEngine.startPractice(20)">20</button>
                    <button class="btn-primary" style="flex: 1;" onclick="QuizEngine.startPractice(50)">50</button>
                </div>
            </div>
            <div style="height: 100px;"></div>
        </div>
    </div>

    <!-- Screen: Exam Analytics Dashboard -->
    <div id="view-exam-analytics" class="quiz-view">
        <div class="header-wrapper">
            <div class="header-inner">
                <div class="header-left">
                    <button class="back-btn" onclick="QuizEngine.navigateBack()">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 19l-7-7 7-7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <h1 class="header-title">Performance</h1>
                </div>
            </div>
        </div>
        <div class="view-content" style="padding-top: 16px;">
            <div class="card" style="padding: 20px; text-align: center; margin-bottom: 16px;">
                <h3 style="margin: 0; color: #64748b; font-weight: 500; font-size: 14px;">Readiness Score</h3>
                <div style="font-size: 42px; font-weight: 700; color: #059669; margin: 8px 0;">72%</div>
                <p style="margin: 0; font-size: 13px; color: #94a3b8;">Based on your last 3 mock exams</p>
            </div>
            
            <h3 style="padding: 0 16px; margin-bottom: 12px; font-size: 16px;">Syllabus Breakdown</h3>
            <div class="card" style="padding: 16px; margin-bottom: 16px;">
                <div style="margin-bottom: 12px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 14px;"><span>Crime</span><span style="font-weight: 600;">85%</span></div>
                    <div style="height: 6px; background: #e2e8f0; border-radius: 3px;"><div style="height: 100%; width: 85%; background: #4f46e5; border-radius: 3px;"></div></div>
                </div>
                <div style="margin-bottom: 12px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 14px;"><span>Evidence & Procedure</span><span style="font-weight: 600;">60%</span></div>
                    <div style="height: 6px; background: #e2e8f0; border-radius: 3px;"><div style="height: 100%; width: 60%; background: #f59e0b; border-radius: 3px;"></div></div>
                </div>
                <div style="margin-bottom: 12px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 14px;"><span>General Duties</span><span style="font-weight: 600;">71%</span></div>
                    <div style="height: 6px; background: #e2e8f0; border-radius: 3px;"><div style="height: 100%; width: 71%; background: #10b981; border-radius: 3px;"></div></div>
                </div>
            </div>
            
            <button class="btn-primary" style="width: 100%;" onclick="QuizEngine.navigate('view-practice-selection')">Practice Weak Areas</button>
            <div style="height: 100px;"></div>
        </div>
    </div>

    <!-- Screen: Mock Exam Intro -->
    <div id="view-mock-exam-intro" class="quiz-view">
        <div class="header-wrapper">
            <div class="header-inner">
                <div class="header-left">
                    <button class="back-btn" onclick="QuizEngine.navigateBack()">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 19l-7-7 7-7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <h1 class="header-title">Mock Exam</h1>
                </div>
            </div>
        </div>
        <div class="view-content" style="padding-top: 24px; text-align: center;">
            <div style="width: 80px; height: 80px; background: #eff6ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f4da.png" style="width: 40px; height: 40px;">
            </div>
            <h2 id="mock-exam-target-title" style="margin-bottom: 8px;">Constable to Sergeant</h2>
            <p style="color: #64748b; margin-bottom: 32px; padding: 0 16px;">This mock exam simulates real conditions. You will have 3 hours to answer 150 questions across all syllabus areas.</p>
            
            <div class="card" style="text-align: left; padding: 16px; margin-bottom: 32px;">
                <ul style="list-style-type: none; padding: 0; margin: 0; color: #334155; font-size: 14px; line-height: 1.6;">
                    <li style="margin-bottom: 8px; display: flex; gap: 8px;"><svg style="flex-shrink: 0; width: 20px; color: #10b981;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> 150 Multiple Choice Questions</li>
                    <li style="margin-bottom: 8px; display: flex; gap: 8px;"><svg style="flex-shrink: 0; width: 20px; color: #f59e0b;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> 3 Hour Time Limit</li>
                    <li style="display: flex; gap: 8px;"><svg style="flex-shrink: 0; width: 20px; color: #3b82f6;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> You can pause and resume later</li>
                </ul>
            </div>
            
            <div style="padding: 0 16px;">
                <button class="btn-primary" style="width: 100%; font-size: 18px; padding: 16px;" onclick="QuizEngine.startMockExam()">Start Mock Exam</button>
            </div>
        </div>
    </div>
"""

content = content.replace('<!-- Screen 1: Choose Category -->', new_views + '\n    <!-- Screen 1: Choose Category -->')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Added new views')
