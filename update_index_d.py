import sys, re

path = './index-d.html'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Introduce slate
content = content.replace('--accent-blue: #546EA4;', '--accent-blue: #546EA4;\n            --accent-slate: #475569;')

# Shadows to neutral slate
content = content.replace('rgba(84, 110, 164', 'rgba(15, 23, 42')

# Search changes
content = content.replace('padding: 14px 0;\n            font-size: 15px;', 'padding: 14px 0;\n            font-size: 16px;')
content = content.replace('color: var(--accent-blue);\n            font-size: 13px;', 'color: var(--accent-slate);\n            font-size: 14px;')
content = content.replace('stroke: var(--accent-blue);', 'stroke: var(--accent-slate);')

# Top tabs
content = content.replace('.m-tab span {\n            font-size: 11px;', '.m-tab span {\n            font-size: 13px;')
content = content.replace('.m-tab.m-tab-active {\n            color: var(--accent-blue);\n        }', '.m-tab.m-tab-active {\n            color: var(--accent-slate);\n        }')
content = content.replace(
    'invert(41%) sepia(28%) saturate(677%) hue-rotate(185deg) brightness(92%) contrast(87%)',
    'invert(31%) sepia(19%) saturate(464%) hue-rotate(176deg) brightness(95%) contrast(88%)'
)

# Section title
content = content.replace('.section-header h2 {\n            font-size: 26px;', '.section-header h2 {\n            font-size: 28px;')

# View buttons
content = content.replace(
'''        .view-btn.active {
            background: var(--accent-blue);
            color: #ffffff;
            box-shadow: 0 4px 12px rgba(10, 132, 255, 0.3);
        }''',
'''        .view-btn.active {
            background: #e2e8f0;
            color: #334155;
            box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
        }''')
content = content.replace(
'''        .view-btn.active {
            background: var(--accent-blue);
            color: #ffffff;
            box-shadow: 0 4px 12px rgba(15, 23, 42, 0.3);
        }''',
'''        .view-btn.active {
            background: #e2e8f0;
            color: #334155;
            box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
        }''') # if already changed shadows above

# Cards text
content = content.replace('.card-title {\n            font-size: 14px;', '.card-title {\n            font-size: 16px;')
content = content.replace('.card-subtitle {\n            font-size: 12px;', '.card-subtitle {\n            font-size: 14px;')
content = content.replace('.cjs-code {\n            font-size: 10px;', '.cjs-code {\n            font-size: 11px;')

# Strip pin buttons
pin_regex = re.compile(r'\s*<button class="pin-btn">.*?<\/button>', re.DOTALL)
content = pin_regex.sub('', content)

# Remove pin button css
css_pin_regex = re.compile(r'\s*\.pin-btn\s*\{[^}]+\}\s*\.pin-btn img\s*\{[^}]+\}', re.DOTALL)
content = css_pin_regex.sub('', content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updates applied")
