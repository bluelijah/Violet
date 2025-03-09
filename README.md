# VIOLET
Hackathon X - VIOLET

THIS IS A HACKATHON PROJECT WITH ELIJAH OLSON, GUY BENZEEV, JOSH LEE, AND DYLAN SOMETHING

STEP 1: 
WORK INSIDE VIRTUAL ENV: ----- TO DEACTIVATE VENV: deactivate
MAC:
/opt/homebrew/bin/python3 -m venv venv
source venv/bin/activate
WINDOWS
python3 -m venv venv
venv\Scripts\activate

STEP 2:
INSTALL DEPENDENCIES:
pip install fastapi uvicorn google-genai google-generativeai 


STEP 3: 
RUN FAST API (in backend folder with venv and dependencies)
uvicorn main:backendApp --reload
Check your page on: http://127.0.0.1:8000 to see for fastapi and http://127.0.0.1:8000/gemini-endpoint to see gemini is working

STEP 4:
TO RUN UI WEBPAGE (in frontend folder with venv and dependencies + react-router-dom):
npm install react-router-dom 
npm run dev







EXTRAS:

MUST RUN YOUR API KEY IN YOUR ENVIRONMENT (run config.py to test after api key command):
export GEMINI_API_KEY="your_actual_api_key_here" 

SOURCES:
ai.google.dev/gemini-api/docs/quickstart?lang=python 
openai.com/index/chatgpt/
aistudio.google.com
geeksforgeeks.org
stackoverflow.com 
