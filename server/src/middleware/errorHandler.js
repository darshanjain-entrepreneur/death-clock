export function notFound(_req, res) {
  return res.status(404).json({ message: 'Resource not found.' });
}

export function errorHandler(err, _req, res, _next) {
  const status = err.status || 500;

  if (status >= 500) {
    process.stderr.write(`[${new Date().toISOString()}] ${err.stack || err.message}\n`);
  }

  const isProd = process.env.NODE_ENV === 'production';
  const message = status >= 500 && isProd ? 'Internal server error.' : (err.message || 'Internal server error.');

  return res.status(status).json({ message });
}
