<<<<<<< HEAD
# sentinel-ai-analysis-app
A full-stack AI-powered cyberbullying moderation dashboard that enables real-time reporting, automated AI analysis, and actionable insights for safer online communities.
=======
# Sentinel AI Analysis App

A full-stack AI-powered cyberbullying moderation dashboard. Sentinel enables real-time reporting, AI-driven analysis, and actionable insights for community safety teams and moderators.

## Features
- **User Reports:** Submit confidential reports of cyberbullying or threats.
- **AI Analysis:** Automated, explainable analysis of reports using OpenRouter AI.
- **Dashboard:** Visual analytics, status tracking, and admin controls.
- **Admin Tools:** Delete reports, review AI feedback, and monitor trends.
- **Robust Error Handling:** Production-ready error management and health checks.

## Project Structure
```
sentinel-ai-analysis-app/
├── backend/
│   ├── package.json
│   └── src/
│       ├── db.js
│       ├── server.js
│       ├── controllers/
│       │   └── reportController.js
│       └── routes/
│           └── reportRoutes.js
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── App.jsx
│       ├── hooks/
│       │   └── useReports.js
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── ReportModal.jsx
│       │   └── StatCard.jsx
│       ├── pages/
│       │   ├── Dashboard.jsx
│       │   ├── Home.jsx
│       │   └── SubmitReport.jsx
│       └── styles/
│           └── theme.css
└── README.md
```

## Tech Stack
- **Frontend:** React, Vite, Recharts, Bootstrap
- **Backend:** Node.js, Express, MySQL2, Axios, dotenv
- **AI Integration:** OpenRouter API
- **Deployment:** Render.com

## Getting Started

### Prerequisites
- Node.js (v18+)
- MySQL or MariaDB
- OpenRouter API Key

### Backend Setup
```sh
cd backend
npm install
# Configure your .env file with DB and AI keys
npm start
```

### Frontend Setup
```sh
cd frontend
npm install
npm run dev
```

### Build for Production
- **Frontend:**
  ```sh
  npm run build
  ```
- **Backend:**
  (No build step needed, just run with Node.js)

### Render Deployment
- Set up two services: one for backend (Node), one for frontend (Static Site).
- Example build/start commands:
  - **Backend:**
    - Build: `npm install`
    - Start: `node src/server.js`
  - **Frontend:**
    - Build: `npm install && npm run build`
    - Publish directory: `dist`

## Environment Variables
- `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` (backend)
- `OPEN_ROUTER_API_KEY` (backend)

## License
MIT

---

*Sentinel: Proactive AI for a safer digital world.*
>>>>>>> e104263 (save workspace + chat transcript)
