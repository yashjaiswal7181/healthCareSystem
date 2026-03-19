# Patient Visit Tracker — Architecture

## Overview

This is a full-stack Patient Visit Tracker designed to manage:

- clinicians
- patients
- visit history

The system is intentionally built to be:

- simple
- clean
- easy to understand
- interview-ready

It focuses on strong fundamentals instead of over-engineering.

---

## Tech Stack

### Frontend
- React (Vite + JavaScript)
- React Router
- React Hook Form
- Zod
- Axios
- Material UI

### Backend
- Node.js + Express (JavaScript)
- PostgreSQL
- Knex (query builder & migrations)
- Objection ORM
- Zod (validation)

---

## System Architecture

The project follows a **monorepo structure**:
patient-visit-tracker/
apps/
web/ → frontend
api/ → backend
docs/
architecture.md


### Architecture Style

- Layered backend architecture
- Feature-based frontend structure
- REST API communication
- Single PostgreSQL database

---

## High-Level Flow
User → React UI → API → Database


### Example Flow (Create Visit)

1. User fills visit form
2. Frontend validates using Zod
3. API request sent (`POST /api/visits`)
4. Backend validates using Zod
5. Service processes request
6. Data saved via Objection ORM
7. Response returned
8. UI refreshes data

---

## Frontend Architecture

### Folder Structure
apps/web/src/
components/
features/
auth/
clinicians/
patients/
visits/
pages/
services/
main.jsx



---

### Key Concepts

#### 1. Feature-based structure
Each domain is isolated:
- clinicians
- patients
- visits
- auth

---

#### 2. Routing

Routes:

- `/login` → public
- `/clinicians`
- `/patients`
- `/visits`

All non-login routes are protected.

---

#### 3. Forms

Handled using:

- React Hook Form
- Zod validation

Benefits:
- clean validation
- minimal re-renders
- predictable behavior

---

#### 4. API Communication

Handled using Axios:

- direct API calls
- async/await pattern
- manual data refresh after mutations

---

#### 5. State Management

- useState for local state
- useEffect for data fetching
- no global state libraries

---

## Frontend Authentication (Mock)

### Design

Authentication is implemented **only on the frontend**.

### Why

- not part of core requirement
- avoids unnecessary backend complexity
- keeps focus on domain logic

---

### Implementation

- React Context for auth state
- localStorage persistence
- ProtectedRoute component

---

### Behavior

- unauthenticated users → redirected to `/login`
- session persists across refresh
- logout clears session

---

### Scope

This is not real authentication.

Not included:
- JWT
- password hashing
- backend sessions

---

## Backend Architecture

### Folder Structure
apps/api/src/
app.js
server.js
config/
db/
knex.js
models/
middleware/
modules/
clinicians/
patients/
visits/
routes/


---

## Layered Architecture
Route → Controller → Service → Model → Database


---

### Responsibilities

#### Routes
- define endpoints
- attach middleware

#### Controllers
- handle request/response
- call service layer

#### Services
- contain business logic
- interact with models

#### Models (Objection)
- represent tables
- define relationships

---

## Database Design

### Tables

#### clinicians
- id
- first_name
- last_name
- specialty
- created_at
- updated_at

---

#### patients
- id
- first_name
- last_name
- date_of_birth
- created_at
- updated_at

---

#### visits
- id
- clinician_id
- patient_id
- visited_at
- notes (nullable)
- created_at

---

## Relationships
Clinician 1 ──── * Visit * ──── 1 Patient


- one clinician → many visits
- one patient → many visits

---

## Database Rules

- snake_case column naming
- foreign key constraints
- indexes on foreign keys
- minimal schema design

---

## ORM (Objection.js)

### Why Objection

- close to SQL
- explicit relations
- flexible and lightweight

---

### Model Responsibilities

- define table mapping
- define relations
- no business logic

---

## API Design

### Endpoints
GET /health

GET /api/clinicians
POST /api/clinicians

GET /api/patients
POST /api/patients

GET /api/visits
POST /api/visits


---

### Query Parameters
GET /api/visits?clinicianId=&patientId=


---

### Response Strategy

Visit responses include:

- clinician details
- patient details

This reduces frontend complexity.

---

## Validation Strategy

### Frontend
- Zod used in forms

### Backend
- Zod used for request validation

---

### Benefits

- consistent validation rules
- early error detection
- predictable API contracts

---

## Error Handling

- centralized error middleware
- consistent error responses
- avoid scattered try/catch blocks

---

## Key Design Decisions

### 1. Simplicity First
System is intentionally minimal and focused.

---

### 2. No Global State Library
Avoided Redux to keep complexity low.

---

### 3. Frontend-only Auth
Provides UX without backend overhead.

---

### 4. Minimal CRUD Scope
Only:
- create
- list

No:
- edit
- delete
- pagination

---

### 5. Explicit Data Flow
- manual API calls
- manual refresh
- no hidden caching layers

---

## Tradeoffs

| Decision | Tradeoff |
|--------|--------|
| No backend auth | Not production secure |
| No pagination | Limited scalability |
| No edit/delete | Reduced functionality |
| Minimal schema | No audit tracking |

---

## Future Improvements

### Backend
- authentication (JWT)
- role-based access
- pagination & sorting
- audit logs
- soft deletes

---

### Frontend
- edit/delete flows
- search
- better filters
- improved UX

---


## Interview Talking Points

Be ready to explain:

- why simplicity was prioritized
- why frontend-only auth was used
- why Objection ORM was chosen
- how data flows end-to-end
- how you would scale this system

---

## Summary

This system is designed to:

- demonstrate strong fundamentals
- maintain clean architecture
- avoid over-engineering
- remain easy to explain

