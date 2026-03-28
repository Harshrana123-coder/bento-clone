const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');

const app = express();

// Logging
app.use(morgan('combined'));

// Security headers
app.use(helmet());

// JSON parsing
app.use(express.json({ limit: '50mb' }));

// CORS – frontend only
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

// Rate limiting
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

// Compression
app.use(compression());

// Health check route
app.get('/', (req, res) => {
  res.send('Backend running. Supabase handles auth & profiles.');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;
