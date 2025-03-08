from PIL import Image
import pytesseract

# If Tesseract is not in your PATH, specify the path explicitly
# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'  # Windows example
# pytesseract.pytesseract.tesseract_cmd = '/usr/local/bin/tesseract'  # macOS/Linux example

# Open an image
img = Image.open('TESTIMAGE.png')

# Use Tesseract to extract text from the image
text = pytesseract.image_to_string(img)

print(text)