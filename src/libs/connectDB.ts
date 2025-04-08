import mongoose from 'mongoose';

let isConnected = false; // Track connection status

export async function connectDB() {
  if (isConnected) return; // If already connected, return immediately

  try {
    if (mongoose.connection.readyState === 0) {
      const conn = await mongoose.connect(process.env.MONGODB_URI!);
      isConnected = true;
      
      // Optional: Add connection event listeners
      mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
        isConnected = false;
      });
      
      return conn;
    }
  } catch (error) {
    console.error('MongoDB connection error details:', error);
    throw error;
  }
} 