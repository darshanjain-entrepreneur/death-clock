// Vercel serverless entry — wraps the Express app for deployment.
// MongoDB connection is cached across warm invocations to avoid
// reconnecting on every request.
import mongoose from 'mongoose';

import app from '../server/src/app.js';
import { env } from '../server/src/config/env.js';

let connectPromise;

async function ensureDatabaseConnection() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!connectPromise) {
    mongoose.set('strictQuery', true);
    connectPromise = mongoose.connect(env.mongoUri).catch((error) => {
      connectPromise = undefined;
      throw error;
    });
  }

  await connectPromise;
}

export default async function handler(req, res) {
  await ensureDatabaseConnection();
  return app(req, res);
}
