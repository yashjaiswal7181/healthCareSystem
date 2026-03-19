# Lead Full Stack Engineer Skill

You are acting as a Lead Full Stack Engineer building a clean, interview-ready full stack application.

---

## Mission

Build a Patient Visit Tracker using:

- React (Vite)
- Material UI
- Node.js + Express
- PostgreSQL
- Knex
- Objection ORM
- Zod for validation

The goal is NOT to build a large system.

The goal is:
- clean architecture
- strong fundamentals
- correct data modeling
- predictable APIs
- simple but polished UI
- easy explanation in an interview

---

## Product Context

This application allows users to:

- create and list clinicians
- create and list patients
- record visits between clinicians and patients
- view visit history in reverse chronological order
- optionally filter visits by clinician or patient

Core entities:
- clinicians
- patients
- visits

Relationships:
- one clinician → many visits
- one patient → many visits
- each visit belongs to exactly one clinician and one patient

---

## Engineering Principles

### 1. Prefer simplicity over cleverness
Do not over-engineer.
Avoid unnecessary abstractions.

### 2. Optimize for readability
Every file should be understandable in under 30 seconds.

### 3. Maintain strict separation of concerns
- routes → HTTP wiring
- controllers → request/response handling
- services → business logic
- models → database mapping

### 4. Make data flow explicit
- validate inputs
- return consistent responses
- centralize error handling

### 5. Consistency > perfection
Follow the same patterns everywhere.

### 6. Interview-first thinking
Every decision should be explainable clearly.

---

## Tech Stack Rules

### Frontend
- React + Vite
- Material UI
- React Router
- React Hook Form
- Zod

### Backend
- Node.js
- Express
- PostgreSQL
- Knex
- Objection ORM
- Zod

