import os
import glob

directory = r'C:\Projects\pocket-app-ui\quiz-next-gen-ui\variant-a'

for file_path in glob.glob(os.path.join(directory, '*.html')):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    if r"\'cctv-time-slip.html\'" in content:
        content = content.replace(r"\'cctv-time-slip.html\'", "'cctv-time-slip.html'")
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Fixed {file_path}')
