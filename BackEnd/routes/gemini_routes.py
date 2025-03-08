from google import genai

# Initialize the GenAI client with your API key
client = genai.Client(api_key="AIzaSyAVLtku81ikOCpwZlgURi-rqbmsluX4tQI")

file_path = "/Users/eli/Desktop/Code/Projects/VIOLET/VIOLET/BackEnd/user.txt"

# Read the contents of User.txt
with open(file_path, "r") as file:
    user_input = file.read()

# Generate content based on the contents of User.txt
response = client.models.generate_content(
    model="gemini-2.0-flash", contents=user_input
)

response_file_path = "/Users/eli/Desktop/Code/Projects/VIOLET/VIOLET/BackEnd/geminiResponse.txt"
with open(response_file_path, "w") as response_file:
    response_file.write(response.text)

print(f"Response saved to {response_file_path}")