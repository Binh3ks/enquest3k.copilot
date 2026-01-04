/* eslint-env node */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // Import the database configuration

// Import routes
const authRoutes = require('./routes/auth');
const progressRoutes = require('./routes/progress');
const aiRoutes = require('./routes/ai');
const adminRoutes = require('./routes/admin');

const app = express();

// Middleware
app.use(cors()); // Cho phép Cross-Origin Resource Sharing
app.use(express.json({ limit: '10mb' })); // Tăng limit để nhận avatar base64 lớn
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/admin', adminRoutes);

// Simple health check route
app.get('/', (req, res) => {
  res.json({ message: 'MCP Server is up and running!' });
});

// Database connection test route
app.get('/api/db-test', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json({
      message: 'Database connection successful!',
      timestamp: result.rows[0].now,
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ 
      message: 'Database connection failed.',
      error: error.message 
    });
  }
});

const PORT = process.env.PORT || 5001; // Sử dụng cổng 5001 làm mặc định cho backend

app.listen(PORT, () => {
  console.log(`MCP Server is listening on port ${PORT}`);
});
