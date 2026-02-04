const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Allow both localhost and Vercel frontend
const allowedOrigins = [
  'http://localhost:5173',
  'https://align-together-2.vercel.app'
];

app.use(cors({ 
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true 
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Task Manager API', status: 'running' });
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/todos', require('./routes/todoRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n✅ Server is running on port ${PORT}`);
  console.log(`📋 Task Manager API ready\n`);
});

module.exports = app;
