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
- `CLIENT_URL` is only needed for local development when the client and API run on different ports
- Run MongoDB with authentication and backups enabled

## Vercel deployment

Deploy the repository root as a single Vercel project.

- Select `death-clock (root)` as the project root during import
- Use `Other` as the framework preset if Vercel asks
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `client/dist`
- Add these environment variables in Vercel:
   - `NODE_ENV=production`
   - `MONGO_URI=...`
   - `JWT_SECRET=...`
   - `JWT_EXPIRES_IN=7d`
   - `JWT_ISSUER=death-clock-api`
   - `JWT_AUDIENCE=death-clock-client`
   - `AUTH_COOKIE_NAME=death_clock_session`

The React app is served from the same Vercel domain, and `/api/*` is routed to the Express serverless function.
