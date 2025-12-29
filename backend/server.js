import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import userRoutes from './api/user/user.routes.js';
import sessionRoutes from './api/session/session.routes.js';
import rateRoutes from './api/rate/rate.routes.js';

dotenv.config();

// Connect to MongoDB
async function connectDB() {
    try {
        const MONGODB_URI = process.env.MONGODB_URI;
        if (!MONGODB_URI) {
            console.error("❌ MONGODB_URI is not defined in .env file!");
            process.exit(1);
        }
        await mongoose.connect(MONGODB_URI);
        console.log('✅ MongoDB connected');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1);
    }
}

connectDB();

// Initialize Express
const app = express();
const port = process.env.PORT || 3030;

// Middleware
app.use(cors({
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/session', sessionRoutes);
app.use('/api/rate', rateRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Start server
app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
});