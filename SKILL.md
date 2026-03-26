# dragenda — Project Reference

## Description
Dragenda (Doctor Agenda) is an online medical appointment management system. Patients can schedule, modify, or cancel appointments without visiting in person. The platform includes a web client, a REST API backend, and a React Native mobile app for iOS and Android. Deployed and in production.

## Tech Stack
- **Web client:** React 19.1.0, Vite 6, React Router 6, Axios, React Bootstrap 2, Bootstrap 5 (JavaScript, no TypeScript)
- **API backend:** Node.js 18+, Express 4, SQLite3 (sqlite3 5.1.7), JWT 9.0.2, bcrypt 6, express-rate-limit 7, dotenv
- **Mobile:** React Native 0.81.4 (via Expo SDK 54), React Navigation (bottom tabs + native stack), AsyncStorage, react-native-calendars, Moment.js, Axios, Expo Go
- **Database:** SQLite (file-based, persisted to Render disk at /data/)
- **Auth:** JWT tokens for both users and admins
- **Deploy:** Vercel (web) + Render (API with persistent disk) | License: AGPL-3.0

## Directory Structure
```
dragenda/
├── dragenda-web/                  # Web client
│   ├── src/                       # React components and pages
│   ├── public/
│   ├── vercel.json                # Vercel deploy config
│   └── vite.config.js
├── dragenda-api/                  # Backend API
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── controller.user.js
│   │   │   ├── controller.doctor.js
│   │   │   ├── controller.appointment.js
│   │   │   ├── controller.admin.js
│   │   │   ├── controller.user.admin.js
│   │   │   ├── controller.doctor.admin.js
│   │   │   └── controller.appointment.admin.js
│   │   ├── services/              # Business logic per entity
│   │   ├── repositories/          # SQLite data access per entity
│   │   ├── middlewares/
│   │   │   └── rateLimit.js
│   │   ├── database/
│   │   │   └── sqlite.js          # DB connection and table setup
│   │   ├── routes.js              # All routes
│   │   ├── token.js               # JWT utilities
│   │   └── index.js               # Entry point, Express app
│   ├── databaseBackup/            # SQLite DB backups
│   ├── .env / .env.example
│   └── src/.env                   # Additional env for src-level config
├── dragenda-mobile/               # React Native app
│   ├── src/                       # Screens, navigation, components
│   ├── assets/                    # Images and icons
│   ├── App.js                     # App entry point
│   ├── app.json                   # Expo config
│   ├── babel.config.js
│   └── src/.env                   # Mobile env (EXPO_PUBLIC_API_URL)
└── render.yaml                    # Render deploy: API + Web services
```

## Key Files
- `dragenda-api/src/index.js` — Express app entry, CORS config (allowed origins hardcoded)
- `dragenda-api/src/database/sqlite.js` — DB init, table creation (USERS, DOCTORS, SERVICES, DOCTOR_SERVICES, APPOINTMENTS, ADMINS)
- `dragenda-api/src/routes.js` — All API routes
- `dragenda-api/src/token.js` — JWT sign/verify helpers
- `dragenda-api/render.yaml` (root) — Defines both services, disk mount at /data/
- `dragenda-mobile/App.js` — Root navigation component
- `dragenda-mobile/src/.env` — Must use machine IP not localhost for mobile API URL

## Deploy & URLs
- **Web:** https://dragenda.vercel.app (Vercel, auto-deploy from main)
- **API:** https://dragenda-api.onrender.com (Render, `node src/index.js`, persistent disk 1GB at /data/)
- **CORS allowed origins:** `https://dragenda.vercel.app`, `http://localhost:8081`, `http://localhost:3000`

## Development Setup
```bash
# Terminal 1 — API (port 3001)
cd dragenda-api
cp .env.example .env   # fill JWT_SECRET and EXPO_PUBLIC_API_KEY
npm install
node --trace-warnings --watch src/index.js

# Terminal 2 — Web client (port 3000)
cd dragenda-web
npm install
npm run dev

# Terminal 3 — Mobile (Expo Metro port 8081)
cd dragenda-mobile
npm install   # or yarn install (yarn 1.22 configured)
npx expo start
# On device: use EXPO_PUBLIC_API_URL=http://<machine-ip>:3001
```

## Database Schema
Tables: USERS, DOCTORS, SERVICES, DOCTOR_SERVICES (price per service/doctor), APPOINTMENTS, ADMINS

## Git
- **Remote:** git@github.com:mateusribeirocampos/dragenda.git
- **Branch:** main (production), deploy/render (Render-specific deploy), add-tests, feature
- **Note:** deploy/render branch is used for Render deployments; main is the source of truth
