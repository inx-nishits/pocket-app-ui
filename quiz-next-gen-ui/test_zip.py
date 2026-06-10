import zipfile
import xml.etree.ElementTree as ET

docx_path = r"C:\Projects\pocket-app-ui\next-gen-ui-cctv\documents\CCTV scoping form Generic.docx"
with zipfile.ZipFile(docx_path) as z:
    xml_content = z.read('word/document.xml')
    root = ET.fromstring(xml_content)
    
    # Let's find the body
    body = root.find('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}body')
    if body is not None:
        print("Body tag children:")
        for el in list(body)[:20]:
            print(f"Tag: {el.tag}")
            # print text content if any
            texts = [t.text for t in el.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if t.text]
            if texts:
                print(f"  Text: {''.join(texts)}")
            
            # check for drawings
            drawings = list(el.iter('{http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing}inline')) or list(el.iter('{http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing}anchor'))
            if drawings:
                print(f"  Drawing count: {len(drawings)}")
    else:
        print("No body tag found")
