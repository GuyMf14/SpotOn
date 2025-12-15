// backend/middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// 1. Middleware לזיהוי משתמש מחובר
function requireAuth(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).send('Not Authenticated');

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // מוסיף את פרטי המשתמש לאובייקט הבקשה
        req.user = decoded; 
        next();
    } catch (err) {
        // אם הטוקן פג תוקף
        res.status(401).send('Invalid token or token expired');
    }
}

// 2. Middleware לאכיפת הרשאת אדמין
function requireAdmin(req, res, next) {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).send('Not Authorized - Admin required');
    }
    next();
}

module.exports = {
    requireAuth,
    requireAdmin
};