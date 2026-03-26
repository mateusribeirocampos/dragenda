# dragenda — Claude Instructions

## Status
production | Branch: main

## Structure
```
dragenda/
├── dragenda-web/    # React 19 + Vite (web client)
│   └── src/        # Components, pages, routing
├── dragenda-api/    # Node.js + Express + SQLite (backend)
│   └── src/
│       ├── controllers/  # user, doctor, appointment, admin variants
│       ├── services/     # business logic
│       ├── repositories/ # data access
│       ├── middlewares/  # rateLimit.js
│       ├── database/     # sqlite.js
│       ├── routes.js
│       ├── token.js      # JWT helpers
│       └── index.js      # entry point
├── dragenda-mobile/ # React Native + Expo SDK 54
│   └── src/        # Screens, navigation, components
└── render.yaml     # Render deploy config
```

## Key Commands
```bash
# API (port 3001)
cd dragenda-api && node --trace-warnings --watch src/index.js
# or: node src/index.js

# Web client (port 3000 via Vite)
cd dragenda-web && npm run dev

# Mobile (port 8081 Expo Metro)
cd dragenda-mobile && npx expo start
cd dragenda-mobile && npx expo start --ios
cd dragenda-mobile && npx expo start --android
```

## Rules
- SQLite database file stored at persistent disk on Render (`/data/` mount)
- Do not change DB_PATH without updating Render disk mount configuration
- CORS is configured for specific origins — adding new clients requires updating API cors config
- Mobile app requires Expo Go SDK 54+ on device for testing
- JWT_SECRET is mandatory; no fallback
- render.yaml defines both dragenda-api and dragenda-web services — edit carefully

## Environment
```
# dragenda-api/.env
JWT_SECRET=
EXPO_PUBLIC_API_KEY=
EXPO_PUBLIC_PORT=3001
RATE_LIMIT_WINDOW=60000
GENERAL_RATE_LIMIT_MAX=100
LOGIN_RATE_LIMIT_MAX=5
DB_PATH=./database/dragenda.db   # local; Render uses /data/

# dragenda-web/.env
VITE_API_URL=http://localhost:3001

# dragenda-mobile/src/.env
EXPO_PUBLIC_API_URL=http://<local-ip>:3001   # use machine IP, not localhost
```
