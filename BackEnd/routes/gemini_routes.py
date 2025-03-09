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
    "In the following prompt, you are an expert course designer and educator creating a comprehensive course on: " + user_query + ".\n"
    "When specified to include 'user preferences' you need to take the preferences in the following user preferences() area, and factor them into your response.\n"
    "User Preferences( " + user_input + " )\n"
    "The first section of this course should outline all the pre-existing knowledge one needs prior to learning the material they asked about (for example one needs to know algebra to pursue calculus, or have taken physics before doing some level of dynamic engineering)\n"
    "The second section should be a complete layout of the material that will be covered relating to their prompt and course they are asking about\n"
    "The third section should be one that provides the user with resources for each part of the covered material, containing attached links. This is where you factor in the User preferences I above mentioned. Based on the user's preferences, you are to suggest different medias for learning they may enjoy more, or benefit from greater. You should provide them with a plethora of resources, and majorly ones that fit within their preferences.\n"
)

# Generate content based on the contents of User.txt
response = client.models.generate_content(
    model="gemini-2.0-flash", contents=combined_input
)

response_path = os.path.join(current_directory, "..", "..", "TextFiles", "geminiResponse.txt")

with open(response_path, "w") as response_file:
    response_file.write(response.text)

print(f"Response saved to {response_path}")