import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { env } from './config/env.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiters.js';
import authRoutes from './routes/authRoutes.js';
import resultRoutes from './routes/resultRoutes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const clientDist = join(__dirname, '../../client/dist');

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', 1);

// CORS only needed in development (client on Vite :5174, server on :4000)
if (env.nodeEnv !== 'production') {
  app.use(
    cors({
      origin: env.clientUrl,
      credentials: true
    })
  );
}
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    referrerPolicy: { policy: 'no-referrer' }
  })
);
app.use(cookieParser());
app.use(express.json({ limit: '20kb' }));

if (env.nodeEnv !== 'production') {
  app.use(morgan('dev'));
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api', apiLimiter);
app.use('/api/auth', authRoutes);
app.use('/api/results', resultRoutes);

// Dedicated 404 for unmatched /api routes
app.use('/api', notFound);

// Serve the built React app for everything else
if (existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (_req, res) => {
    res.sendFile(join(clientDist, 'index.html'));
  });
} else {
  app.use(notFound);
}

app.use(errorHandler);

export default app;
