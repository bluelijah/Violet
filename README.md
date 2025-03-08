# AntIscam
Hackathon X AI anti scam

THIS IS A HACKATHON PROJECT WITH ELIJAH OLSON, GUY BENZEEV, JOSH LEE, AND DYLAN SOMETHING

DEPENDENCIES:
npm init -y
npm install express multer tesseract.js axios dotenv cors

FOR MAC: 
brew install tesseract

FOR WINDOWS:
Download the Tesseract installer from the official Tesseract GitHub page.
Follow the instructions to install it.
Make sure to add Tesseract to your system's PATH (there's usually an option during installation to do this).

FOR LINUX: 
sudo apt-get install tesseract-ocr

WORK INSIDE VIRTUAL ENV: ----- TO DEACTIVATE VENV: deactivate
python3 -m venv venv
source venv/bin/activate

NEXT INSTALL PY TESSERACT LIBRARIES AND PILLOW:
pip install pytesseract Pillow
pip install Pillow


FOR FASTAPI:

If using Python:
pip install fastapi

If using Python 3:
pip3 install fastapi

NEXT INSTALL UVICORN (ASGI SERVER):

pip install 'uvicorn[standard]'

To run in development:
uvicorn main:app --reload

Check your shit on: http://127.0.0.1:8000

