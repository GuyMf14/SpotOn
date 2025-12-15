// backend/api/auth/auth.controller.js
const authService = require('../../services/auth.service');
const jwt = require('jsonwebtoken');

// מפתח סודי ל-JWT (נשלף מ-.env)
const JWT_SECRET = process.env.JWT_SECRET;

// פונקציה ליצירת Token ושמירתו כ-Cookie
function setAuthCookie(res, user) {
    const token = jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, {
        httpOnly: true, // לא ניתן לגשת לקוקי באמצעות JavaScript
        secure: process.env.NODE_ENV === 'production', // נשלח רק ב-HTTPS ב-Prod
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 ימים
    });
}

async function login(req, res) {
    try {
        const user = await authService.login(req.body);
        setAuthCookie(res, user);
        res.json(user);
    } catch (err) {
        console.error('Failed to Login:', err);
        res.status(401).send({ err: 'Invalid username or password' });
    }
}

async function signup(req, res) {
    try {
        const user = await authService.signup(req.body);
        setAuthCookie(res, user);
        res.json(user);
    } catch (err) {
        console.error('Failed to Signup:', err);
        res.status(500).send({ err: 'Could not sign up' });
    }
}

function logout(req, res) {
    try {
        res.clearCookie('token');
        res.send({ msg: 'Logged out successfully' });
    } catch (err) {
        res.status(500).send({ err: 'Failed to logout' });
    }
}

module.exports = {
    login,
    signup,
    logout
};