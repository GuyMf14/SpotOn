// backend/models/Rate.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rateSchema = new Schema({
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
    min_charge_minutes: { // חיוב מינימלי, לדוגמה 30 דקות
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Rate', rateSchema);