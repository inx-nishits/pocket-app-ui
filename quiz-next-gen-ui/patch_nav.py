import os
import glob
import re

directory = r'C:\Projects\pocket-app-ui\quiz-next-gen-ui\variant-a'

for file_path in glob.glob(os.path.join(directory, '*.html')):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'cctv.svg' not in content and 'phone-call.svg' in content:
        content = re.sub(
            r'(<button[^>]*>\s*<img[^>]*alt="Contact"[^>]*>\s*</button>)',
            r'\1\n                <button class="nav-btn" onclick="window.location.href=\'cctv-time-slip.html\'"><img src="images/cctv.svg" alt="CCTV"></button>',
            content,
            flags=re.IGNORECASE
        )
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated {file_path}')
