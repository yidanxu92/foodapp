import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

async function testConnection() {
    try {
        await mongoose.connect(uri!, { useNewUrlParser: true, useUnifiedTopology: true } as mongoose.ConnectOptions);
        console.log('Connected to MongoDB');
        await mongoose.disconnect();
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

testConnection();