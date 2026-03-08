# Death Clock

A premium full-stack Death Clock application built with React, Express, and MongoDB. Users answer ten weighted lifestyle questions, get a projected lifespan, watch a live countdown, and experiment with habit changes that instantly reshape their forecast.

## Stack

- React + Vite frontend
- Node.js + Express backend
- MongoDB + Mongoose persistence
- JWT authentication with bcrypt password hashing
- Zod validation, Helmet, CORS, and rate limiting

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create environment files:

   - Copy `server/.env.example` to `server/.env`
   - Copy `client/.env.example` to `client/.env`

3. Provide values for MongoDB, JWT secret, and API URL.

4. Start the app:

   ```bash
   npm run dev
   ```

## Production notes

- Set `NODE_ENV=production`
- Use a long random `JWT_SECRET`
- Restrict `CLIENT_URL` to the deployed frontend origin
- Run MongoDB with authentication and backups enabled
