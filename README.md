# Dragenda - Doctor Agenda - Medical Appointment Management

Digital healthcare revolutionizes the way we deliver and experience healthcare with a paradigm shift to more accessible, personalized and efficient approaches for all. **Dragenda** is an online version of the medical appointment management system, allowing patients to schedule, modify or cancel medical appointments effortlessly. By eliminating the need for in-person visits to schedule appointments, these patient appointment system platforms enable patients to conveniently book and manage their appointments online.

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/mateusribeirocampos/dragenda)
[![React](https://img.shields.io/badge/React-19.1.0-blue)](https://react.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.81.4-blue)](https://reactnative.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18.17.1-green)](https://nodejs.org/)
[![SQLite](https://img.shields.io/badge/SQLite-5.1.7-blue)](https://www.sqlite.org/)
[![Expo SDK](https://img.shields.io/badge/Expo%20SDK-54.0.0-lightgrey)](https://expo.dev/)

## Project Structure

The project is divided into three main components:

### Frontend (dragenda-web)

- Developed with React + Vite
- Deployed on Vercel: [https://dragenda.vercel.app](https://dragenda.vercel.app)

### Backend (dragenda-api)

- Developed with Node.js + Express
- Deployed on Render: [https://dragenda-api.onrender.com](https://dragenda-api.onrender.com)

### Mobile (dragenda-mobile)

- Developed with React Native + Expo
- Cross-platform iOS and Android support

## Local Development

1. Clone the repository

```bash
git clone https://github.com/mateusribeirocampos/dragenda.git
cd dragenda
```

2.Install frontend dependencies

```bash
cd dragenda-web
npm install
```

3.Install backend dependencies

```bash
cd dragenda-api
npm install
```

4.Install mobile dependencies

```bash
cd dragenda-mobile
npm install
```

5.Configure environment variables (see `.env.example`)

6.Start the frontend

```bash
cd dragenda-web
npm run dev
```

7.Start the backend

```bash
cd dragenda-api
npm start
```

8.Start the mobile app

```bash
cd dragenda-mobile
npx expo start
```

## Branches

- `main`: main branch with all code
- `deploy/render`: specific branch for deployment on Render

## Architecture

```mermaid
graph TD
    A["API (Node.js)"] -- Commands --> B["Frontend (React)"]
    A -- Commands --> C["Mobile App (React Native)"]
    A -- "Interacts with" --> D["Database (SQLite Studio)"]
```

A modern cross-platform application for managing medical appointments, built with cutting-edge technologies to streamline healthcare scheduling.

## ✨ Features

### Patient Features

- 🗓️ Intuitive appointment scheduling
- 👨⚕️ Doctor/service selection with real-time availability
- 📱 Mobile-first responsive design (iOS/Android)
- 🔐 JWT-based authentication
- 📅 Interactive appointment calendar

### Admin Features

- 📊 Comprehensive dashboard
- 👥 User/doctor management
- 📈 Appointment analytics
- ⚙️ Service configuration
- 🔔 Push notifications

## Components

```mermaid
flowchart TD
    A[Frontend Web] -->|Axios| B[API]
    C[Mobile App] -->|HTTP| B
    B -->|SQLite| D[(Database)]
    B -->|JWT| E[Auth Service]
    B -->|Rate Limiter| F[Security]
```

## 🛠️ Technical Stack

### Frontend Applications

| Component        | Technology       | Key Dependencies                                    |
|------------------|------------------|-----------------------------------------------------|
| Web Client       | React 19.1.0     | react-router-dom, axios, vite, react-bootstrap     |
| Mobile Client    | React Native 0.81.4 + Expo SDK 54 | expo, react-navigation, async-storage, calendars |
| State Management | Context API      | react-native-calendars, moment                     |

### Backend Services

| Component        | Technology       | Key Dependencies                        |
|------------------|------------------|-----------------------------------------|
| API Server       | Node.js/Express  | bcrypt, jsonwebtoken, sqlite3, cors    |
| Database         | SQLite 5.1.7     | express-rate-limit, dotenv             |
| Authentication   | JWT 9.0.2        | bcrypt 5.1.1                           |

## App Flow

```mermaid
flowchart TD
  A[Mobile App] --> B{Already 
  registered?}
  B -- Yes --> C[Enter email 
  and password]
  C --> b{Valid user 
  credentials?}
  B -- No --> G[Register]
  b -- Yes --> H[User logged in
  successfully]
  H --> D[Doctors list]
  H --> E[Calendar]
  H --> F[Profile]
  b -- No --> I[Login failed]
  I --> l{Forgot
  password?}
  l -- Yes --> J[Reset
  password]
  l -- No --> C
  G --> H
  F --> Exit

classDef red fill:#963946,stroke:#963946,stroke-width:4px;
classDef blue fill:#395d96,stroke:#395d96,stroke-width:4px;
classDef cyan fill:#326363,stroke:#326363,stroke-width:4px;

  class b,l,B red
  class C,D,E,F,G,H,J,I blue
  class A,Exit cyan
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Expo CLI (for mobile)
- SQLite Studio 3.4+

### Installation

1. Clone repository:

```bash
git clone https://github.com/mateusribeirocampos/dragenda.git
cd dragenda
```

Please read our Contribution Guidelines and Code of Conduct.

### Dependencies for each component

```bash
# API
cd dragenda-api && npm install

# Web Client
cd ../dragenda-web && npm install

# Mobile Client
cd ../dragenda-mobile && npm install
```

### Configuration

#### Ports

- **API Backend**: Port 3001
- **Web Client**: Port 3000 (Vite)
- **Mobile Client**: Port 8081 (Expo Metro Bundler)

#### API (.env)

```env
JWT_SECRET=your_secure_secret
EXPO_PUBLIC_API_KEY=your_api_key
EXPO_PUBLIC_PORT=3001
RATE_LIMIT_WINDOW=60000
GENERAL_RATE_LIMIT_MAX=100
LOGIN_RATE_LIMIT_MAX=5
```

#### Web Client (.env)

```env
VITE_API_URL=http://localhost:3001
```

#### Mobile Client (src/.env)

```env
EXPO_PUBLIC_API_URL=http://192.168.3.7:3001
```

#### CORS Configuration

The API is configured to accept requests from:

- `https://dragenda.vercel.app` (Production)
- `http://localhost:8081` (Mobile - Expo Web)
- `http://localhost:3000` (Web Client - Vite)

### Running the Application

```bash
cd dragenda-api && node --trace-warnings --watch src/index.js
```

### Start Web Client

```bash
cd dragenda-web && npm run dev
```

### Start Mobile Client

```bash
cd dragenda-mobile && npx expo start
```

## Database Diagram

```mermaid
erDiagram
    USERS {
        INTEGER id_user PK
        VARCHAR name
        VARCHAR email
        VARCHAR password
    }

    DOCTORS {
        INTEGER id_doctor PK
        VARCHAR name
        VARCHAR specialty
        VARCHAR crm
    }

    SERVICES {
        INTEGER id_service PK
        VARCHAR description
    }

    DOCTOR_SERVICES {
        INTEGER id_doctor_service PK
        INTEGER id_doctor FK
        INTEGER id_service FK
        DECIMAL price
    }

    APPOINTMENTS {
        INTEGER id_appointment PK
        INTEGER id_user FK
        INTEGER id_doctor FK
        INTEGER id_service FK
        DATE booking_date
        TIME booking_hour
    }

    ADMINS {
        INTEGER id_admin PK
        VARCHAR name
        VARCHAR email
        VARCHAR password
    }

    USERS ||--o{ APPOINTMENTS : "makes"
    DOCTORS ||--o{ APPOINTMENTS : "has"
    SERVICES ||--o{ APPOINTMENTS : "associated_with"
    DOCTORS ||--o{ DOCTOR_SERVICES : "offers"
    SERVICES ||--o{ DOCTOR_SERVICES : "available_in"
    ADMINS ||--|| USERS : "manages"
    ADMINS ||--|| DOCTORS : "manages" 
    ADMINS ||--|| SERVICES : "manages"
```

### 🤝 Contributing

#### Fork the repository

#### Create feature branch

```bash
git checkout -b feature/amazing-feature
```

#### Commit changes

```bash
git commit -m "feat: add amazing feature"
```

#### Push to branch

```bash
git push origin feature/amazing-feature
```

Open Pull Request

## 📄 License

This project is licensed under GNU AFFERO GENERAL PUBLIC LICENSE -
see [LICENSE](https://github.com/mateusribeirocampos/dragenda/tree/main?tab=AGPL-3.0-1-ov-file) file for details.

## 📦 Recent Updates

### Version 2.0 (2025)

- ⬆️ **Expo SDK Upgrade**: Updated from SDK 53 to SDK 54
- ⬆️ **React Native**: Upgraded to version 0.81.4 (from 0.79.5)
- ⬆️ **React**: Updated to version 19.1.0
- ⬆️ **React DOM**: Updated to version 19.1.0
- ⬆️ **Dependencies**: All Expo-related packages updated to latest compatible versions
- 🔧 **CORS Configuration**: Enhanced to support multiple client origins (Web + Mobile)
- 🐛 **Bug Fixes**: Resolved dependency conflicts and duplicate packages

### Breaking Changes

- Mobile app now requires Expo Go SDK 54 or higher
- Updated minimum versions for React Native dependencies

## 🙏 Acknowledgments

UI components powered by [React Bootstrap](https://react-bootstrap.netlify.app/)

Authentication system based on [JWT](https://jwt.io/introduction) best practices
