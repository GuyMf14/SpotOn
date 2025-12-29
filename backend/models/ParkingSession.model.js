import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    license_plate: {
        type: String,
        required: true
    },
    spot_number: {
        type: String,
        required: true
    },
    entry_time: {
        type: Date,
        default: Date.now
    },
    exit_time: {
        type: Date,
        required: false
    },
    duration_minutes: {
        type: Number,
        default: 0
    },
    rate_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rate',
        required: true
    },
    total_amount: {
        type: Number,
        default: 0
    },
    is_paid: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default mongoose.model('ParkingSession', sessionSchema);