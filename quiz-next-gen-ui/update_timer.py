import os

file_path = r'C:\Projects\pocket-app-ui\quiz-next-gen-ui\variant-a\quiz.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace time left logic
old_time_logic = "this.timeLeft = this.totalQuestions * 30; // 30 seconds per question"
new_time_logic = """if (this.currentMode === 'Mock Exam') {
            this.timeLeft = 3 * 60 * 60; // 3 hours
        } else {
            this.timeLeft = this.totalQuestions * 30; // 30 seconds per question
        }"""
content = content.replace(old_time_logic, new_time_logic)

# Replace formatting logic
old_format = """            const m = Math.floor(this.timeLeft / 60);
            const s = this.timeLeft % 60;
            timerText.innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;"""

new_format = """            const h = Math.floor(this.timeLeft / 3600);
            const m = Math.floor((this.timeLeft % 3600) / 60);
            const s = this.timeLeft % 60;
            if (h > 0) {
                timerText.innerText = `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
            } else {
                timerText.innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
            }"""
content = content.replace(old_format, new_format)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Timer logic updated.")
