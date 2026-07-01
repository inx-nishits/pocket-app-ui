Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("c:\Users\Moksha Patel\Documents\quiz-next-gen-ui\images\exam_checklist_3d.png")
$bmp = New-Object System.Drawing.Bitmap($img)
$bmp.MakeTransparent([System.Drawing.Color]::White)
$bmp.Save("c:\Users\Moksha Patel\Documents\quiz-next-gen-ui\images\exam_checklist_3d_transparent.png", [System.Drawing.Imaging.ImageFormat]::Png)
$img.Dispose()
$bmp.Dispose()
