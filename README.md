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
│   ├── controllers/           # Controllers for image processing and scam detection
│   ├── routes/                # API routes (image processing, scam detection, etc.)
│   ├── services/              # Services to integrate with Tesseract and Google Gemini
│   ├── utils/                 # Utility functions (e.g., for image preprocessing)
│   ├── app.js                 # Main entry point of the back-end (Express server)
│   └── package.json           # Node.js dependencies (express, tesseract.js, axios, etc.)
│
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable UI components (image upload, results display)
│   │   ├── pages/             # Web pages (e.g., Home, Results)
│   │   ├── App.js             # Main React app component
│   │   ├── api.js             # API functions to interact with back-end
│   │   └── index.js           # React entry point
│   └── package.json           # React dependencies (react, axios, etc.)
│
├── .env                       # Environment variables (API keys, configurations)
└── README.md                  # Project documentation


DEPENDENCIES:
npm init -y
npm install express multer tesseract.js axios dotenv cors