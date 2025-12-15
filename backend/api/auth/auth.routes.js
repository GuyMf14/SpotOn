// backend/api/auth/auth.routes.js
const express = require('express');
const { login, signup, logout } = require('./auth.controller');
const router = express.Router();

// ראוטר בדיקה בסיסי 
router.get('/', (req, res) => {
    res.send('Auth API is running');
});

// ראוטים לניהול משתמשים
router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);

// ראוטר לבדיקת משתמש מחובר (פותר את ה-404 בבקשה 4)
router.get('/user', (req, res) => { 
    if (req.user) { 
        res.json(req.user);
    } else {
        res.status(401).send({ err: 'Not logged in' });
    }
});

module.exports = router;