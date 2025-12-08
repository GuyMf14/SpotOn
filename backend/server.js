// backend/server.js
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// 1. הגדרת MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/spoton_db';

async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ MongoDB connected successfully!');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        // יציאה מהאפליקציה אם יש שגיאת חיבור
        process.exit(1); 
    }
}

connectDB();

// 2. הגדרת Express
const app = express();
const port = process.env.PORT || 3030;

// 3. Middlewares
const corsOptions = {
    // חשוב: פורט ה-React הוא 5173 (של Vite)
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'], 
    credentials: true 
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// 4. ניתוב (Routing) - קורא למודולים שנעדכן בהמשך

// נניח שיש לנו 3 קולקציות: User, ParkingSession, Rate
const authRoutes = require('./api/auth/auth.routes');
const sessionRoutes = require('./api/session/session.routes');

app.use('/api/auth', authRoutes);
app.use('/api/session', sessionRoutes);

// 5. הפעלת השרת
app.listen(port, () => {
    console.log(`Server listening on port ${port} at http://localhost:${port}`);
});