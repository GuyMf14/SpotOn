import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: String,
    role: {
        type: String,
        enum: ['admin', 'driver'],
        default: 'driver'
    }
}, { timestamps: true });

export default mongoose.model('User', userSchema);