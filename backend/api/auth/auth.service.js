// backend/services/auth.service.js
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');

// יצירת משתמש חדש
async function signup(credentials) {
    const { username, email, password, role } = credentials;
    if (!username || !email || !password) throw 'Missing credentials';

    // הצפנת הסיסמה
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
        username,
        email,
        password: hashedPassword,
        role: role || 'driver'
    });

    await user.save();
    // מחזירים אובייקט נקי ללא סיסמה
    const userToReturn = { _id: user._id, username: user.username, role: user.role, email: user.email };
    return userToReturn;
}

// התחברות
async function login(credentials) {
    const { email, password } = credentials;
    if (!email || !password) throw 'Missing credentials';

    const user = await User.findOne({ email });
    if (!user) throw 'Invalid credentials (User not found)';

    // השוואת סיסמאות
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw 'Invalid credentials (Password mismatch)';

    // מחזירים אובייקט נקי ללא סיסמה
    const userToReturn = { _id: user._id, username: user.username, role: user.role, email: user.email };
    return userToReturn;
}

module.exports = {
    signup,
    login
};