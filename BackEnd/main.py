import uvicorn
from app import app  # Importing FastAPI app from app.py

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
