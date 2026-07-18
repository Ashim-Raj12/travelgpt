import "dotenv/config";
import app from './app';
import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Socket.io initialization
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

async function startServer() {
  try {
    if (process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('Connected to MongoDB');
    } else {
      console.warn('MONGO_URI is not defined, skipping DB connection.');
    }

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
