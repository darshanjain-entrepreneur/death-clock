import dotenv from 'dotenv';

dotenv.config();

const required = ['MONGO_URI', 'JWT_SECRET'];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 4000),
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  jwtIssuer: process.env.JWT_ISSUER || 'death-clock-api',
  jwtAudience: process.env.JWT_AUDIENCE || 'death-clock-client',
  authCookieName: process.env.AUTH_COOKIE_NAME || 'death_clock_session',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173'
};
