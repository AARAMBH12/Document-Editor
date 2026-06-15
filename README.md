
# Document Editor (MERN)

A lightweight document editor built with the MERN stack (MongoDB, Express, React + Vite, Node). This repo contains the backend API and a modern single-page React frontend.

Features
- Create and save rich text documents
- User authentication (signup / login) with JWT
- Create / list / fetch / delete documents per user
- Centralized `apiFetch` helper for robust API calls

Tech stack
- Backend: Node.js, Express, Mongoose (MongoDB)
- Frontend: React, Vite, Jodit editor integration for rich text

Live demo (local)
- Backend: http://localhost:3000
- Frontend (Vite): http://localhost:5173 (or printed URL)

Quick start
1. Start the backend

```bash
cd backend
npm install
npm start
```

2. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Environment
Create a `.env` in the `backend/` folder containing the following (example):

```
MONGO_URI=mongodb://localhost:27017/documenteditor
PORT=3000

```

API endpoints (high level)
- POST `/signUp` — register a user
- POST `/login` — authenticate and receive `token` and `userId`
- POST `/createDoc` — create a new document (body: `{ userId, docName }`)
- POST `/getAllDocs` — get all documents for a user (body: `{ userId }`)
- POST `/getDoc` — load a document (body: `{ userId, docId }`)
- POST `/uploadDoc` — save document content (body: `{ userId, docId, content }`)
- POST `/deleteDoc` — delete a document (body: `{ userId, docId }`)





