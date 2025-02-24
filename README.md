# Dragenda - Doctor agenda - Medical Appointment Management

Digital healthcare revolutionizes the way we deliver and experience healthcare with a paradigm shift to more accessible, personalized and efficient approaches for all. **Dragenda** is an online version of the medical appointment management system, allowing patients to schedule, modify or cancel medical appointments effortlessly. By eliminating the need for in-person visits to schedule appointments, these patient appointment system platforms enable patients to conveniently book and manage their appointments online.

[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://react.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.76.6-blue)](https://reactnative.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18.17.1-green)](https://nodejs.org/)
[![SQLite](https://img.shields.io/badge/SQLite-3.44.2-blue)](https://www.sqlite.org/)
[![Expo](https://img.shields.io/badge/Expo-52.0.25-lightgrey)](https://expo.dev/)

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

| Component        | Technology       | Key Dependencies                      |
|------------------|------------------|---------------------------------------|
| Web Client       | React 18         | react-router-dom, axios, vite         |
| Mobile Client    | React Native 0.76| expo, react-navigation, async-storage |
| State Management | Context API      | react-native-calendars, moment        |

### Backend Services

| Component        | Technology       | Key Dependencies               |
|------------------|------------------|--------------------------------|
| API Server       | Node.js/Express  | bcrypt, jsonwebtoken, sqlite3  |
| Database         | SQLite           | express-rate-limit, cors       |
| Authentication   | JWT              | dotenv                         |

## App flow to user

```mermaid

flowchart TD
  A[Mobile App] --> B{Alredy a 
  register}
  B -- Yes --> C[Enter email 
  and password]
  C --> b{Valid user 
  credentilas ?}
  B -- No --> G[Register]
  b -- Yes --> H[user logged
  sucessfully]
  H --> D[Doctors list]
  H --> E[Calendar]
  H --> F[Profile]
  b -- No --> I[Login failed]
  I --> l{Forgot
  password ?}
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

API(.env)

```env
JWT_SECRET=your_secure_secret
PORT=0000
```

Web Client(.env)

```env
REACT_APP_API_URL=http://localhost:0000
```

Mobile Clinet(app.config.js)

```javascrit
extra: {
  API_URL: process.env.API_URL || 'http://localhost:3001',
}
```

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
Commit changes:
````

```bash
git commit -m "feat: add amazing feature"
Push to branch:
````

```bash
git push origin feature/amazing-feature
Open Pull Request
```

## 📄 License

This project is licensed under GNU AFFERO GENERAL PUBLIC LICENSE -
see [LICENSE](https://github.com/mateusribeirocampos/dragenda/tree/main?tab=AGPL-3.0-1-ov-file) file for details.

## 🙏 Acknowledgments

UI components powered by [React Bootstrap](https://react-bootstrap.netlify.app/)

Authentication system based on [JWT](https://jwt.io/introduction) best practices
