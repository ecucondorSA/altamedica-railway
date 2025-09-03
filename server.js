const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'AltaMedica API Server',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    platform: 'Glitch',
    version: '1.0.0',
    url: req.url,
    method: req.method
  });
});

// Health endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    platform: 'Glitch',
    message: 'AltaMedica API Server is running on Glitch'
  });
});

// API routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    message: 'API health check successful',
    platform: 'Glitch'
  });
});

app.post('/api/v1/auth/sso', (req, res) => {
  res.json({
    success: true,
    message: 'SSO endpoint ready',
    timestamp: new Date().toISOString(),
    platform: 'Glitch',
    data: {
      authStatus: 'endpoint_ready',
      supabaseConnected: !!process.env.SUPABASE_URL,
      jwtConfigured: !!process.env.JWT_SECRET
    }
  });
});

// Status endpoint
app.get('/api/v1/status', (req, res) => {
  res.json({
    status: 'operational',
    timestamp: new Date().toISOString(),
    platform: 'Glitch',
    environment: process.env.NODE_ENV || 'production',
    endpoints: {
      health: '/health',
      apiHealth: '/api/health',
      auth: '/api/v1/auth/sso',
      status: '/api/v1/status'
    }
  });
});

// Catch all other API routes
app.use('/api/*', (req, res) => {
  res.json({
    message: 'AltaMedica API Endpoint',
    endpoint: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
    platform: 'Glitch',
    availableEndpoints: [
      '/',
      '/health',
      '/api/health',
      '/api/v1/status',
      '/api/v1/auth/sso'
    ]
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
    platform: 'Glitch',
    availableEndpoints: [
      '/',
      '/health',
      '/api/health',
      '/api/v1/status',
      '/api/v1/auth/sso'
    ]
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
    timestamp: new Date().toISOString(),
    platform: 'Glitch'
  });
});

const listener = app.listen(port, () => {
  console.log(`🚀 AltaMedica API Server running on Glitch - Port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;