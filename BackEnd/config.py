import os

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
print(f"GEMINI_API_KEY: {GEMINI_API_KEY}")  # For testing purposes to show whether or not your gemini api key is loaded
TEXT_STORAGE = "storage"