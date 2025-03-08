import os
import google.generativeai as genai
from fastapi import APIRouter
from config import GEMINI_API_KEY, TEXT_STORAGE

# Configure Gemini API
genai.configure(api_key=GEMINI_API_KEY)

router = APIRouter()

@router.get("/gemini-endpoint")
async def gemini_endpoint():
    return {"message": "Gemini endpoint is working!"}


# @router.post("/submit/")
# async def submit_text(text: str):
#     input_path = os.path.join(TEXT_STORAGE, "user_input.txt")
#     response_path = os.path.join(TEXT_STORAGE, "gemini_response.txt")

#     # Store user input in a file
#     os.makedirs(TEXT_STORAGE, exist_ok=True)
#     with open(input_path, "w") as file:
#         file.write(text)

#     # Send text to Gemini
#     model = genai.GenerativeModel("gemini-pro")
#     response = model.generate_content(text)

#     # Store Gemini's response in a file
#     gemini_text = response.text if response else "No response received."
#     with open(response_path, "w") as file:
#         file.write(gemini_text)

#     return {"message": "Text processed successfully.", "response_file": "gemini_response.txt"}