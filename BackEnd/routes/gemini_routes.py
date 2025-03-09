from google import genai
from fastapi import FastAPI
from fastapi.responses import FileResponse
import os
import re

# Initialize the GenAI client with your API key
client = genai.Client(api_key="AIzaSyAVLtku81ikOCpwZlgURi-rqbmsluX4tQI")

current_directory = os.path.dirname(os.path.abspath(__file__))
user_path = os.path.join(current_directory, "..", "..", "TextFiles", "user.txt")
query_path = os.path.join(current_directory, "..", "..", "TextFiles", "userQuery.txt")
structure_path = os.path.join(current_directory, "..", "..", "TextFiles", "structure.txt")
#response_path = os.path.join(current_directory, "..", "..", "TextFiles", "geminiResponse.txt")

# Read the contents of user.txt
with open(user_path, "r") as file:
    user_input = file.read().strip()

# Read the contents of userQuery.txt
with open(query_path, "r") as file:
    user_query = file.read().strip()
    
with open(structure_path, "r") as file:
    structure_template = file.read().strip()

# Combine the contents of both files
combined_input = (
    "In the following prompt, you are an expert course designer and educator creating a comprehensive course on: " + user_query + " using the following format" + structure_template + "\n"
    "1. **Course Title**: A clear and concise course title."
    "2. **Prerequisites**: The second section of this course should outline all the pre-existing knowledge one needs prior to learning the material they asked about (for example one needs to know algebra to pursue calculus, or have taken physics before doing some level of dynamic engineering)\n"
    "3. **Course Content**: The third section should be a complete layout of the material that will be covered relating to their prompt and course they are asking about\n"
    "4. **Resources**: The fourth section should be one that provides the user with resources for each part of the covered material, containing attached links. This is where you factor in the User preferences I above mentioned. Based on the user's preferences, you are to suggest different medias for learning they may enjoy more, or benefit from greater. You should provide them with a plethora of resources, and majorly ones that fit within their preferences.\n"
    "When specified to include 'user preferences' you need to take the preferences in the following user preferences() area, and factor them into your response.\n"
    "User Preferences( " + user_input + " )\n"
)

# Generate content based on the contents of User.txt
response = client.models.generate_content(
    model="gemini-2.0-flash", contents=combined_input
)

# Assume the AI response follows a structured format, parse it into sections
sections = response.text.split("\n\n")  # Split by double newline for logical separation

# Extract individual components (handling missing data safely)
course_title = sections[0] if len(sections) > 0 else user_query  # Default to query if title missing
prerequisites = sections[1] if len(sections) > 1 else "No prerequisites found."
course_content = sections[2] if len(sections) > 2 else "No course content found."
resources = sections[3] if len(sections) > 3 else "No resources found."

# Extract the course title from the response text
match = re.search(r'## Course Title:\s*(.*)', response.text)
if match:
    course_title = match.group(1).strip()  # Extract the course title after "## Course Title:"
else:
    course_title = "Default Course Title"  # Fallback if no match is found

# Sanitize the course title to create a valid file name
sanitized_course_title = re.sub(r'[\\/*?:"<>|]', "", course_title)

file_name = f"{sanitized_course_title}.txt"

response_directory = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "FrontEnd", "public")

os.makedirs(response_directory, exist_ok=True)

response_path = os.path.join(response_directory, file_name)

# Replace placeholders in structure.txt with generated content
formatted_response = structure_template.format(
    course_title=course_title.strip(),
    prerequisites=prerequisites.strip(),
    course_content=course_content.strip(),
    resources=resources.strip()
)

with open(response_path, "w") as response_file:
    response_file.write(response.text)

print(f"Response saved to {response_path}")




def generateGeminiResponse():

    # Initialize the GenAI client with your API key
    client = genai.Client(api_key="AIzaSyAVLtku81ikOCpwZlgURi-rqbmsluX4tQI")

    current_directory = os.path.dirname(os.path.abspath(__file__))
    user_path = os.path.join(current_directory, "..", "..", "TextFiles", "user.txt")
    query_path = os.path.join(current_directory, "..", "..", "TextFiles", "userQuery.txt")
    structure_path = os.path.join(current_directory, "..", "..", "TextFiles", "structure.txt")

    # Read the contents of user.txt
    with open(user_path, "r") as file:
        user_input = file.read().strip()

    # Read the contents of userQuery.txt
    with open(query_path, "r") as file:
        user_query = file.read().strip()
        
    with open(structure_path, "r") as file:
        structure_template = file.read().strip()

    # Combine the contents of both files
    combined_input = (
        "In the following prompt, you are an expert course designer and educator creating a comprehensive course on: " + user_query + " using the following format" + structure_template + "\n"
        "1. **Course Title**: A clear and concise course title, no more than 3 words, descriptive about the subject of study\n"
        "2. **Prerequisites**: The second section of this course should outline all the pre-existing knowledge one needs prior to learning the material they asked about (for example one needs to know algebra to pursue calculus, or have taken physics before doing some level of dynamic engineering)\n"
        "3. **Course Content**: The third section should be a complete layout of the material that will be covered relating to their prompt and course they are asking about\n"
        "4. **Resources**: The fourth section should be one that provides the user with resources for each part of the covered material, containing attached links. This is where you factor in the User preferences mentioned above. Based on the user's preferences, you are to suggest different media for learning they may enjoy more, or benefit from greater. You should provide them with a plethora of resources, and majorly ones that fit within their preferences.\n"
        "User Preferences( " + user_input + " )\n"
    )

    # Generate content based on the contents of User.txt
    response = client.models.generate_content(
        model="gemini-2.0-flash", contents=combined_input
    )

    # Assume the AI response follows a structured format, parse it into sections
    sections = response.text.split("\n\n")  # Split by double newline for logical separation

    # Extract individual components (handling missing data safely)
    course_title = sections[0] if len(sections) > 0 else user_query  # Default to query if title missing
    prerequisites = sections[1] if len(sections) > 1 else "No prerequisites found."
    course_content = sections[2] if len(sections) > 2 else "No course content found."
    resources = sections[3] if len(sections) > 3 else "No resources found."

    # Extract the course title from the response text
    match = re.search(r'## Course Title:\s*(.*)', response.text)
    if match:
        course_title = match.group(1).strip()  # Extract the course title after "## Course Title:"
    else:
        course_title = "Default Course Title"  # Fallback if no match is found

    # Sanitize the course title to create a valid file name
    sanitized_course_title = re.sub(r'[\\/*?:"<>|]', "", course_title)

    # Define the path for GeminiReturn.txt in the public directory
    response_directory = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "FrontEnd", "public")
    os.makedirs(response_directory, exist_ok=True)
    response_path = os.path.join(response_directory, "GeminiReturn.txt")

    # Replace placeholders in structure.txt with generated content
    formatted_response = structure_template.format(
        course_title=course_title.strip(),
        prerequisites=prerequisites.strip(),
        course_content=course_content.strip(),
        resources=resources.strip()
    )

    # Write the response to GeminiReturn.txt (overwrites on each call)
    with open(response_path, "w") as response_file:
        response_file.write(response.text)

    # Path to store all course titles, relative path for portability
    all_titles_path = os.path.join(current_directory, "..", "..", "FrontEnd", "frontEndTextFiles", "allTitles.txt")

    # Append the sanitized course title to allTitles.txt
    with open(all_titles_path, "a") as titles_file:
        titles_file.write(f"{sanitized_course_title}\n")

    print(f"Response saved to {response_path}")
    print(f"Course title '{sanitized_course_title}' added to allTitles.txt")
