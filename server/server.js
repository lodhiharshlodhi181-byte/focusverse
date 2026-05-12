import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import leaderboardRoutes from './routes/leaderboard.js';
import statsRoutes from './routes/stats.js';
import aiRoutes from './routes/ai.js';
import socialRoutes from './routes/social.js';
import blockerRoutes from './routes/blocker.js';
import { verifyToken } from './middleware/auth.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.REACT_APP_API_URL || "http://localhost:3000",
    credentials: true
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/focusverse')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.log('❌ MongoDB Error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', verifyToken, userRoutes);
app.use('/api/leaderboard', verifyToken, leaderboardRoutes);
app.use('/api/stats', verifyToken, statsRoutes);
app.use('/api/ai', verifyToken, aiRoutes);
app.use('/api/social', verifyToken, socialRoutes);
app.use('/api/blocker', verifyToken, blockerRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: '✅ Server is running' });
});

// Socket.io Events
io.on('connection', (socket) => {
  console.log('👤 User connected:', socket.id);

  socket.on('update_productivity', (data) => {
    io.emit('productivity_updated', data);
  });

  socket.on('streak_updated', (data) => {
    io.emit('leaderboard_update', data);
  });

  socket.on('disconnect', () => {
    console.log('👤 User disconnected:', socket.id);
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export { io };
