# Patient Visit Tracker

A full-stack Patient Visit Tracker for managing clinicians, patients, and visit history. Built with React (Vite), Material UI, Node.js (Express), PostgreSQL (Neon), Knex, and Objection ORM.

---

## Prerequisites

- **Node.js** 18+ (required for Vite 5)
- **PostgreSQL** or a [Neon](https://neon.tech) account (serverless Postgres)
- **npm** 7+ (for workspaces)

---

## Project Structure

```
Woundtech/
├── apps/
│   ├── api/          # Express backend
│   │   ├── src/
│   │   ├── migrations/
│   │   └── package.json
│   └── web/          # React frontend (Vite)
│       ├── src/
│       └── package.json
├── docs/
├── run.beLocal.sh    # Backend run script
├── run.feLocal.sh    # Frontend run script
└── package.json      # Monorepo root
```

---

## Setup

### 1. Install Dependencies

From the project root:

```bash
npm install
```

This installs dependencies for all workspaces (api + web).

### 2. Configure Database (Neon)

1. Sign up at [neon.tech](https://neon.tech) and create a project.
2. Copy your connection string from the Neon dashboard.
3. Edit `run.beLocal.sh` and set `DATABASE_URL` to your Neon connection string:

```bash
export DATABASE_URL="postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"
```

### 3. Run Migrations

Migrations run automatically when you start the backend via `run.beLocal.sh`. To run them manually:

```bash
# Set DATABASE_URL first, then:
npm run db:migrate
```

---

## Running the Application

### Option A: Run Backend and Frontend Separately (recommended)

**Terminal 1 – Backend**
```bash
./run.beLocal.sh
```
Or with `bash`:
```bash
bash run.beLocal.sh
```

This will:
- Run migrations
- Start the API on **http://localhost:3001**

**Terminal 2 – Frontend**
```bash
./run.feLocal.sh
```
Or:
```bash
bash run.feLocal.sh
```

This starts the React dev server on **http://localhost:5173**.

The Vite dev server proxies `/api` and `/health` to the backend, so the frontend talks to the API through the same origin.

### Option B: Run Both Together

```bash
npm run dev
```

This runs the backend and frontend concurrently. You still need two terminals if you prefer to see logs separately.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api/clinicians` | List clinicians |
| POST | `/api/clinicians` | Create clinician |
| GET | `/api/patients` | List patients |
| POST | `/api/patients` | Create patient |
| GET | `/api/visits` | List visits (optional: `?clinicianId=&patientId=`) |
| POST | `/api/visits` | Create visit |

---

## Backend Tests

Tests use Jest and Supertest. The database is **mocked** (services are stubbed), so no database connection is required.

### Run Tests

From the project root:

```bash
npm run test:api
```

Or from `apps/api`:

```bash
cd apps/api && npm test
```

---

## Tech Stack

- **Frontend:** React, Vite, Material UI, React Router, React Hook Form, Zod, Axios  
- **Backend:** Node.js, Express, PostgreSQL, Knex, Objection ORM, Zod, CORS  
- **Database:** PostgreSQL (Neon serverless)

---

## Documentation

- [Architecture](docs/architecture.md)
- [UI Architecture](docs/UI_architecture.md)
