# SpotOn - Parking Management System

A modern parking management platform with clean architecture.

## Tech Stack

**Backend:** Node.js, Express, MongoDB, Mongoose
**Frontend:** React 18, Vite, Axios

## Quick Start

### Backend
\\\ash
cd backend
npm install
npm run dev
\\\
Runs on \http://localhost:3030\

### Frontend
\\\ash
cd frontend
npm install
npm run dev
\\\
Runs on \http://localhost:5173\

## Environment Setup

Create \ackend/.env\:
\\\
MONGODB_URI=mongodb://...
PORT=3030
NODE_ENV=development
\\\

## API Reference

See [backend/API.md](backend/API.md) for endpoints.

## Project Structure

\\\
SpotOn/
 backend/
    api/          (user, rate, session routes)
    models/       (User, Rate, ParkingSession)
    server.js
 frontend/
    src/          (components, services)
    package.json
 README.md
\\\

## Features

- User management
- Parking rate management
- Session tracking
- Automatic charge calculation
