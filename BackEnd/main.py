from fastapi import FastAPI, Request
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import os

backendApp = FastAPI()

# @backendApp.get("/get_geminiResponse")
# async def get_geminiResponse():
#     user_txt_path = "/Users/eli/Desktop/Code/Projects/VIOLET/VIOLET/BackEnd/user.txt"
#     user_query_path = "VIOLET/BackEnd/userQuery.txt"
#     response_file_path = "/Users/eli/Desktop/Code/Projects/VIOLET/VIOLET/BackEnd/geminiResponse.txt"

#     # Check if the file exists
#     if os.path.exists(response_file_path):
#         return FileResponse(response_file_path, media_type="text/plain", filename="geminiResponse.txt")
#     else:
#         return {"error": "Response file not found"}

backendApp.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # adjust port if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@backendApp.post("/capture_user_input")
async def capture_user_input(request: Request):
    data = await request.json()
    user_text = data.get("user_text")
    if not user_text:
        return {"error": "No user_text provided"}
        
    current_directory = os.path.dirname(os.path.abspath(__file__))
    # Adjust the relative path to your TextFiles directory
    file_path = os.path.join(current_directory, "..", "TextFiles", "user.txt")
    
    with open(file_path, "w") as file:
        file.write(user_text)
    
    return {"message": "User text saved successfully!"}