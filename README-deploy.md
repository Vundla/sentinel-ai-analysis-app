Deployment checklist for Sentinel (GitHub + Render)

1) Repositories
- You can keep a monorepo (this repo) or split into two repos: `sentinel-backend` and `sentinel-frontend`.

2) Prepare .env files
- Backend: copy `backend/.env.example` to `backend/.env` and fill DB and JWT_SECRET.
- Frontend: copy `frontend/.env.example` to `frontend/.env` and set `VITE_API_URL` to your backend URL.

3) Git
- Commit all changes and push to GitHub.

4) Render setup (backend)
- Create a new Web Service.
  - Connect GitHub repo and select branch `main`.
  - Root Directory: `backend` (for monorepo) or repo root if separate.
  - Build Command: `npm install`
  - Start Command: `npm start`
  - Environment: set DB_*, JWT_SECRET, OPEN_ROUTER_API_KEY

5) Render setup (frontend)
- Create a new Static Site.
  - Connect GitHub repo and select branch `main`.
  - Root Directory: `frontend`.
  - Build Command: `npm install && npm run build`
  - Publish Directory: `dist`
  - Environment: set `VITE_API_URL=https://<your-backend>.onrender.com`

6) Post-deploy checks
- Register a user via the frontend.
- Login and confirm JWT returned.
- Check logs on Render for errors.

Notes
- Remove debug logs before pushing to production.
- Use strong `JWT_SECRET` and store secrets only in Render/GitHub secrets.
