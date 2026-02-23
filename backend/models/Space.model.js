import mongoose from 'mongoose';

const spaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    capacity: {
        type: Number,
        required: true,
        min: 1
    },
    current_occupancy: {
        type: Number,
        default: 0,
        min: 0
    },
    is_active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export default mongoose.model('Space', spaceSchema);
