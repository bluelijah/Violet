from google import genai
from fastapi import FastAPI
from fastapi.responses import FileResponse
import os

# Initialize the GenAI client with your API key
client = genai.Client(api_key="AIzaSyAVLtku81ikOCpwZlgURi-rqbmsluX4tQI")

current_directory = os.path.dirname(os.path.abspath(__file__))
user_path = os.path.join(current_directory, "..", "..", "TextFiles", "user.txt")
query_path = os.path.join(current_directory, "..", "..", "TextFiles", "userQuery.txt")

# Read the contents of user.txt
with open(user_path, "r") as file:
    user_input = file.read()

# Read the contents of userQuery.txt
with open(query_path, "r") as file:
    user_query = file.read()

# Combine the contents of both files
combined_input = (
    "In the following prompt, you are to fill in the blanks, and only in areas I specify as 'FILL OUT WITH OWN DISCRESION' can you fill out completely. DO NOT RESPOND TO THIS LINE \n"
    "When I specify to include 'user preferences' you need to take the preferences in the following user preferences() area, and factor them into your response. DO NOT RESPOND TO THIS LINE\n"
    "User Preferences( " + user_input + " )\n"
    "Now write a complete course response for the subject the user is asking about. This should be  \n"
    
    "\nThis is the user's query: \n" + user_query
)

# Generate content based on the contents of User.txt
response = client.models.generate_content(
    model="gemini-2.0-flash", contents=combined_input
)

response_path = os.path.join(current_directory, "..", "..", "TextFiles", "geminiResponse.txt")

with open(response_path, "w") as response_file:
    response_file.write(response.text)

print(f"Response saved to {response_path}")