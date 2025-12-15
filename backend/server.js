// backend/server.js
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken'); // נדרש כדי לבדוק את הטוקן ב-Middleware

dotenv.config();

// 1. הגדרת MongoDB
const MONGODB_URI = process.env.MONGODB_URI; 

async function connectDB() {
    try {
        // ודא שהכתובת קיימת לפני שמנסים להתחבר
        if (!MONGODB_URI) {
            console.error("❌ MONGODB_URI is not defined in .env file!");
            process.exit(1);
        }

        await mongoose.connect(MONGODB_URI);
        console.log('✅ MongoDB connected successfully!');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1); 
    }
}

connectDB();

// 2. הגדרת Express
const app = express();
const port = process.env.PORT || 3030;
const JWT_SECRET = process.env.JWT_SECRET; // מפתח סודי ל-JWT

// 3. Middlewares
const corsOptions = {
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'], 
    credentials: true 
};

app.use(cors(corsOptions));
app.use(express.json()); // לטפל ב-body כ-JSON
app.use(cookieParser()); // לטפל ב-Cookies

// Middleware גלובלי לזיהוי משתמש באמצעות JWT ב-Cookie
app.use((req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            // אם הטוקן תקין, מוסיפים את המשתמש לבקשה (req.user)
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded;
        } catch (e) {
            // טוקן לא תקין או פג תוקף, נמשיך בלי יוזר מחובר
            console.log('Token verification failed:', e.message);
        }
    }
    next();
});


// 4. ניתוב (Routing)
// נניח שיש לנו 3 קולקציות: User (Auth), ParkingSession, Rate
const authRoutes = require('./api/auth/auth.routes');
const sessionRoutes = require('./api/session/session.routes');
const rateRoutes = require('./api/rate/rate.routes'); // הוספת ניתוב לתעריפים

app.use('/api/auth', authRoutes); // /api/auth/login, /api/auth/signup, etc.
app.use('/api/session', sessionRoutes); // /api/session/...
app.use('/api/rate', rateRoutes); // /api/rate/...

// 5. הגשת קבצי Frontend (אם פורסים לפרודקשן)
// השלב הזה קריטי כשעושים Deploy לשרת אחד
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
    
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
}

// 6. הפעלת השרת
app.listen(port, () => {
    console.log(`Server listening on port ${port} in ${process.env.NODE_ENV} mode`);
});