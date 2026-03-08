// Vercel serverless entry — wraps the Express app for deployment.
// MongoDB connection is cached across warm invocations to avoid
// reconnecting on every request.
import mongoose from 'mongoose';

import app from '../server/src/app.js';
import { env } from '../server/src/config/env.js';

let isConnected = false;

export default async function handler(req, res) {
  if (!isConnected) {
    await mongoose.connect(env.mongoUri);
    isConnected = true;
  }
  return app(req, res);
}
