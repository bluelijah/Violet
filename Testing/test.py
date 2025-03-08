from google import genai

# Initialize the GenAI client with your API key
client = genai.Client(api_key="AIzaSyAVLtku81ikOCpwZlgURi-rqbmsluX4tQI")

# Read the contents of User.txt
with open("User.txt", "r") as file:
    user_input = file.read()

# Generate content based on the contents of User.txt
response = client.models.generate_content(
    model="gemini-2.0-flash", contents=user_input
)

# Print the response
print(response.text)