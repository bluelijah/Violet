# AntIscam
Hackathon X AI anti scam

THIS IS A HACKATHON PROJECT WITH ELIJAH OLSON, GUY BENZEEV, JOSH LEE, AND DYLAN SOMETHING

AFTER CLONE:
git checkout --track origin/NameOfYourBranch

git status - (Shows modified files, staged files, and untracked files.)

git add <file>      # Add a specific file  
git add .           # Add all files in the directory  
git add -u          # Add only modified/deleted files  

git commit -m "Your commit message"

git log
git log --oneline --graph --all

git branch               # List all branches  
git branch <branch-name> # Create a new branch  
git checkout <branch>    # Switch to a branch  
git switch <branch>      # Alternative to checkout  
git checkout -b <branch> # Create and switch to a new branch  

git branch -d <branch-name>   # Delete local branch  
git push origin --delete <branch-name>  # Delete remote branch  

git fetch                # Fetch latest changes from remote  
git pull                 # Pull latest changes into current branch  
git push origin <branch> # Push local changes to GitHub


anti-scam-web-service/
│
├── backend/
│   ├── app/                   # Main application folder
│   │   ├── controllers/       # Controllers to handle image processing & scam detection
│   │   ├── routes/            # API routes (image upload, scam check, etc.)
│   │   ├── services/          # Services like Tesseract OCR, Google Gemini integration
│   │   ├── utils/             # Utility functions (e.g., image preprocessing)
│   │   ├── app.py             # Main entry point (FastAPI server)
│   │   ├── config.py          # Configuration file for environment variables
│   │   └── requirements.txt   # Python dependencies (FastAPI, pytesseract, etc.)
│   └── .env                   # Environment variables (API keys, configurations)
│
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable UI components (image upload, results display)
│   │   ├── pages/             # Web pages (e.g., Home, Results)
│   │   ├── App.jsx            # Main React app component
│   │   ├── api.js             # API functions to interact with back-end
│   │   └── index.js           # React entry point
│   └── package.json           # React dependencies (react, axios, etc.)
│
├── .env                       # Environment variables (API keys, configurations)
└── README.md                  # Project documentation


DEPENDENCIES:
npm init -y
npm install express multer tesseract.js axios dotenv cors