// backend/models/User.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'driver'], // הרשאות
        default: 'driver'
    },
    car_plate: {
        type: String,
        // זהו רכב ברירת המחדל של המשתמש הרשום
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);