import app from './app.js';
import { connectDatabase } from './config/db.js';
import { env } from './config/env.js';

async function start() {
  await connectDatabase(env.mongoUri);
  app.listen(env.port);
}

start().catch((error) => {
  process.stderr.write(`Failed to start server: ${error.message}\n`);
  process.exit(1);
});