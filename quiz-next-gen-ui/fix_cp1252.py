import os

def fix_file(path):
    with open(path, 'rb') as f:
        content = f.read()
    
    try:
        # The content was saved as UTF-8, but it's actually double-encoded cp1252
        # Let's decode as utf-8, which gives us a string with cp1252 characters
        text = content.decode('utf-8')
        
        # Now encode that string as cp1252 to get the original bytes back
        original_bytes = text.encode('cp1252')
        
        # Now decode those original bytes as utf-8
        fixed_text = original_bytes.decode('utf-8')
        
        with open(path, 'w', encoding='utf-8') as f:
            f.write(fixed_text)
        print("Successfully fixed", path)
    except Exception as e:
        print("Could not fix", path, ":", e)

fix_file('variant-a/quiz.html')
fix_file('variant-a/quiz.js')
