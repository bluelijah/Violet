from fastapi import FastAPI
from fastapi.responses import FileResponse
import os

backendApp = FastAPI()

@backendApp.get("/get_geminiResponse")
async def get_geminiResponse():
    user_txt_path = "/Users/eli/Desktop/Code/Projects/VIOLET/VIOLET/BackEnd/user.txt"
    user_query_path = "VIOLET/BackEnd/userQuery.txt"
    response_file_path = "/Users/eli/Desktop/Code/Projects/VIOLET/VIOLET/BackEnd/geminiResponse.txt"

    # Check if the file exists
    if os.path.exists(response_file_path):
        return FileResponse(response_file_path, media_type="text/plain", filename="geminiResponse.txt")
    else:
        return {"error": "Response file not found"}