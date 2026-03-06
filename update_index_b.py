import sys, re

path = './index-b.html'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. CSS adjustments (Typography & Slate variable)
content = content.replace('--accent-blue: #546EA4;', '--accent-blue: #546EA4;\n            --accent-slate: #475569;')
# search input font-size
content = content.replace('padding: 14px 0;\n            font-size: 15px;', 'padding: 14px 0;\n            font-size: 16px;')
# search cta font and color
content = content.replace('color: var(--accent-blue);\n            font-size: 13px;', 'color: var(--accent-slate);\n            font-size: 14px;')
content = content.replace('stroke: var(--accent-blue);', 'stroke: var(--accent-slate);')

# tab sizes
content = content.replace('.m-tab span {\n            font-size: 11px;', '.m-tab span {\n            font-size: 13px;')
content = content.replace('color: var(--accent-blue);', 'color: var(--accent-slate);')

# Update the active tab filter to be slate grey (using the provided filter)
content = content.replace(
    'invert(41%) sepia(28%) saturate(677%) hue-rotate(185deg) brightness(92%) contrast(87%)', 
    'invert(31%) sepia(19%) saturate(464%) hue-rotate(176deg) brightness(95%) contrast(88%)'
)

# card text sizing
content = content.replace('.card-title {\n            font-size: 14px;', '.card-title {\n            font-size: 16px;')
content = content.replace('.card-subtitle {\n            font-size: 12px;', '.card-subtitle {\n            font-size: 14px;')
content = content.replace('.cjs-code {\n            font-size: 10px;', '.cjs-code {\n            font-size: 11px;')

# 2. Section Subtitle Size
content = content.replace('.section-header h2 {\n            font-size: 26px;', '.section-header h2 {\n            font-size: 28px;')

# 3. Strip pin buttons
pin_regex = re.compile(r'\s*<button class="pin-btn">.*?<\/button>', re.DOTALL)
content = pin_regex.sub('', content)

# Clean up CSS for pin-btn too
css_pin_regex = re.compile(r'\s*\.pin-btn\s*\{[^}]+\}\s*\.pin-btn img\s*\{[^}]+\}', re.DOTALL)
content = css_pin_regex.sub('', content)

# 4. Strip redundant javascript blocks about .cat-icon
js_regex = re.compile(r'const spatialIcons = document\.querySelectorAll\(\'\.cat-icon\'\);.*?spatialIcons\.forEach\(icon => \{.*?\}\);\s*', re.DOTALL)
content = js_regex.sub('', content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated successfully')
