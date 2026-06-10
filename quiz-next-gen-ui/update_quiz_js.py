import re
import os

file_path = r'C:\Projects\pocket-app-ui\quiz-next-gen-ui\variant-a\quiz.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

new_methods = """
    selectExamType: function(examType) {
        let titleMap = {
            'Sergeant': 'Constable to Sergeant',
            'Inspector': 'Sergeant to Inspector',
            'NIE': 'NIE (Detectives)'
        };
        document.getElementById('mock-exam-target-title').innerText = titleMap[examType] || examType;
        this.navigate('view-mock-exam-intro');
    },

    startPractice: function(numQuestions) {
        // Collect active categories
        const activeCards = document.querySelectorAll('#view-practice-selection .category-card.active');
        if (activeCards.length === 0) {
            this.showToast('Please select at least one syllabus area.');
            return;
        }
        let categories = Array.from(activeCards).map(card => card.querySelector('.card-title').innerText).join(', ');
        
        document.getElementById('difficulty-category-title').innerText = 'Practice: ' + categories;
        document.getElementById('preview-count').innerText = numQuestions;
        this.navigate('view-active', {mode: 'Practice Mode', count: numQuestions});
    },

    startMockExam: function() {
        document.getElementById('difficulty-category-title').innerText = document.getElementById('mock-exam-target-title').innerText;
        document.getElementById('preview-count').innerText = 150;
        this.navigate('view-active', {mode: 'Mock Exam', count: 150});
        // Note: For a true 3-hour timer, we would hook into the timer start logic in view-active.
    },
"""

# Insert these methods into QuizEngine just before navigate function
if 'navigate: function(viewId, params' in content:
    content = content.replace('navigate: function(viewId, params', new_methods + '\n    navigate: function(viewId, params')
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print('Methods injected successfully.')
else:
    print('Failed to find insertion point.')
