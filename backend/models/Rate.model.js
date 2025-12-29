import mongoose from 'mongoose';

const rateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price_per_hour: {
        type: Number,
        required: true
    },
    is_active: {
        type: Boolean,
        default: true
    },
    min_charge_minutes: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export default mongoose.model('Rate', rateSchema);