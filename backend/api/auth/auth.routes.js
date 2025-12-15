// backend/api/auth/auth.routes.js
const express = require('express');
const { login, signup, logout } = require('./auth.controller');
const router = express.Router();

// ראוטים לניהול משתמשים
router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);

// ראוטר לבדיקת משתמש מחובר (נדרש ב-service ב-frontend)
router.get('/user', (req, res) => {
    // אם הקוקי קיים ו-middleware יוסיף את ה-user לאובייקט ה-req
    if (req.user) { 
        res.json(req.user);
    } else {
        res.status(401).send({ err: 'Not logged in' });
    }
});

module.exports = router;