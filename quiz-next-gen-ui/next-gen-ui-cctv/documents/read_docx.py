import zipfile
import xml.etree.ElementTree as ET
import sys
import glob

for docx_path in glob.glob("*.docx"):
    print(f"--- {docx_path} ---")
    try:
        z = zipfile.ZipFile(docx_path)
        xml_content = z.read('word/document.xml')
        root = ET.fromstring(xml_content)
        ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        text = ' '.join([node.text for node in root.findall('.//w:t', ns) if node.text])
        print(text[:1000] + "...\n")
    except Exception as e:
        print(e)
