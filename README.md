# Document Editor (MERN)

This repository contains a minimal Document Editor built with the MERN stack (MongoDB, Express, React + Vite, Node).

Important notes about the current repository state
- The repository currently contains committed `node_modules` under `backend/node_modules` and `frontend/node_modules`. This greatly increases repository size and is not recommended.
- A `.env` file was added at the repository root containing the text `nodemodules`. Please update or remove this file if it contains any secrets.

How to run locally
- Backend:
	```bash
	cd backend
	npm install   # optional if node_modules already present
	npm start
	```
- Frontend:
	```bash
	cd frontend
	npm install
	npm run dev
	```

Recommended cleanup (remove committed node_modules)
1. Add a `.gitignore` with at least `node_modules/` and `.env`.
2. Remove tracked modules and commit:
	 ```bash
	 git rm -r --cached backend/node_modules frontend/node_modules
	 git add .gitignore
	 git commit -m "Remove node_modules from repo and add .gitignore"
	 git push origin main
	 ```
3. (Optional, more invasive) If you want to remove `node_modules` from the entire Git history to shrink the repository, use `git filter-repo` or BFG and then force-push. I can help with this if you confirm.

If you want, I can apply the `.gitignore` and remove the tracked `node_modules` now.
