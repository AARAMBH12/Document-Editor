# Document Editor (MERN)
# Document Editor (MERN)

This repository contains a Document Editor application built with the MERN stack:

- MongoDB (Mongoose) — data storage
- Express — backend API and server
- React (Vite) — frontend UI
- Node.js — runtime

This README explains how to run the project locally, what environment variables are required, and recommended next steps for cleanup and deployment.

**Status**
- The repository was recently cleaned to stop tracking `node_modules` in the tip. If you cloned earlier, you may need to reclone to get the cleaned history.

**Preview**
- Backend: runs on port 3000 (default)
- Frontend (Vite dev): runs on port 5173/5174

**Prerequisites**
- Node.js (>= 18 recommended)
- npm or yarn
- MongoDB (local or Atlas)

**Environment variables**
Create a `.env` file in the `backend/` directory (or set env vars in your environment). Example values:

```
MONGO_URI=mongodb://localhost:27017/documenteditor
PORT=3000
JWT_SECRET=your_jwt_secret_here
```

Do NOT commit secrets to the repository. The repo root contains a `.env` placeholder; replace it or remove it.

**Run locally**

1) Backend

```bash
cd backend
npm install
npm start
# server listens on PORT (default: 3000)
```

2) Frontend

```bash
cd frontend
npm install
npm run dev
# open http://localhost:5173 (or the printed Vite URL)
```

**Common API endpoints**
- `POST /signUp` — create user
- `POST /login` — authenticate and receive token + userId
- `POST /createDoc` — create a document (requires `userId` in body)
- `POST /getAllDocs` — list documents for a user (requires `userId`)

**Recommended repository cleanup (if not already done)**
1. Add `.gitignore` with at least `node_modules/` and `.env`.
2. Remove tracked modules and commit:
```bash
git rm -r --cached backend/node_modules frontend/node_modules
git add .gitignore
git commit -m "Remove node_modules from repo and add .gitignore"
git push origin main
```
3. (Optional, more invasive) If you want to remove `node_modules` from the entire Git history to shrink the repository, use `git filter-repo` or BFG and then force-push. I can help with this if you confirm.

If you want, I can apply the `.gitignore` and remove the tracked `node_modules` now.
