import os

file_path = r'C:\Projects\pocket-app-ui\quiz-next-gen-ui\variant-a\quiz.html'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

start_idx = -1
end_idx = -1

for i, line in enumerate(lines):
    if '<div class="view-content format-list">' in line and start_idx == -1:
        start_idx = i
    if '<!-- Screen 1: Choose Category -->' in line:
        end_idx = i - 2
        break

if start_idx != -1 and end_idx != -1:
    new_content = '''        <div class="view-content format-list">
            
            <div class="section-title-wrapper" style="margin-top: 8px; margin-bottom: 12px; padding: 0 4px;">
                <h2 class="section-title" style="font-size: 18px; color: #1e293b;">Exam Preparation</h2>
            </div>

            <!-- Exam Hub: Mock Exam -->
            <div class="format-card" onclick="QuizEngine.navigate('view-exam-selection')">
                <div class="format-card-left">
                    <div class="category-icon-top" style="color: #4f46e5;">
                        <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f4da.png" style="width: 28px; height: 28px; object-fit: contain;">
                    </div>
                    <div class="format-info">
                        <h3>Mock Exams</h3>
                        <p>Full 150-question 3-hour exam.</p>
                    </div>
                </div>
                <div class="format-card-right">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </div>
            </div>

            <!-- Exam Hub: Targeted Practice -->
            <div class="format-card" onclick="QuizEngine.navigate('view-practice-selection')">
                <div class="format-card-left">
                    <div class="category-icon-top" style="color: #059669;">
                        <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f3af.png" style="width: 28px; height: 28px; object-fit: contain;">
                    </div>
                    <div class="format-info">
                        <h3>Targeted Practice</h3>
                        <p>Focus on your weaker subjects.</p>
                    </div>
                </div>
                <div class="format-card-right">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </div>
            </div>

            <!-- Exam Hub: Analytics -->
            <div class="format-card" onclick="QuizEngine.navigate('view-exam-analytics')">
                <div class="format-card-left">
                    <div class="category-icon-top" style="color: #ea580c;">
                        <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f4c8.png" style="width: 28px; height: 28px; object-fit: contain;">
                    </div>
                    <div class="format-info">
                        <h3>Performance</h3>
                        <p>Track your readiness and scores.</p>
                    </div>
                </div>
                <div class="format-card-right">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </div>
            </div>

            <div class="section-title-wrapper" style="margin-top: 24px; margin-bottom: 12px; padding: 0 4px;">
                <h2 class="section-title" style="font-size: 18px; color: #1e293b;">Casual & Competitive</h2>
            </div>
'''
    
    # Extract the original contents without the first <div class="view-content format-list">
    original_cards = ''.join(lines[start_idx+1:end_idx+1])
    
    lines = lines[:start_idx] + [new_content] + [original_cards] + lines[end_idx+1:]
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print('Successfully updated view-hub')
else:
    print('Could not find bounds')
