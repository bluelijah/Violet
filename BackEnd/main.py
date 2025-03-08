import uvicorn
from fastapi import FastAPI
from routes.gemini_routes import router

backendApp = FastAPI()

#Gemini routes
backendApp.include_router(router)

@backendApp.get("/")
async def root():
    return {"message": "FastAPI app is running!"}

if __name__ == "__main__":
    uvicorn.run(backendApp, host="0.0.0.0", port=8000, reload=True)