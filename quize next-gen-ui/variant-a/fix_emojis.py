import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex to match the old em-content zobj URLs
    # Example: https://em-content.zobj.net/source/apple/354/hourglass-done_231b.png
    # Pattern: https://em-content\.zobj\.net/source/apple/354/[a-z0-9\-]+_([0-9a-f\-]+)\.png
    pattern = r'https://em-content\.zobj\.net/source/apple/354/[a-z0-9\-]+_([0-9a-f\-]+)\.png'
    replacement = r'https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/\1.png'
    
    new_content = re.sub(pattern, replacement, content)
    
    if content != new_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
    else:
        print(f"No changes in {filepath}")

process_file('quiz.js')
process_file('quiz.html')
