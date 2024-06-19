# Candidate Management Backend

This is the backend service for the Candidate Management application, built using NestJS.

## Features

- Add, update, and retrieve candidate information
- RESTful API
- PostgreSQL as the database

## Technologies

- NestJS
- TypeScript
- PostgreSQL
- TypeORM

## Requirements

- Node.js
- npm or yarn
- PostgreSQL

## Installation

1. Clone the repository
2. Setup ENV:
   Example:
   NODE_ENV=dev
   APP_PORT=3001
   DB_CHARSET=utf8
   DB_COLLATE=utf8_general_ci
   DB_HOST=localhost
   DB_NAME=sigma-user-management
   DB_USER=postgres
   DB_PASSWORD=root
   DB_PORT=5432
3. npm install

API Endpoints
GET /candidates: Retrieve all candidates with pagination and searching filters
GET /candidates/:id: Retrieve a specific candidate by ID
POST /candidates: Add a new candidate
PUT /candidates/:id: Update a candidate by ID
