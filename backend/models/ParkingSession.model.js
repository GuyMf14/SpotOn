// backend/models/ParkingSession.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false // ייתכן וזה אורח
    },
    license_plate: { // לוחית זיהוי - חובה
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
        required: false // null כל עוד הרכב חונה
    },
    duration_minutes: {
        type: Number,
        default: 0
    },
    rate_id: { // קישור לתעריף שבתוקף בזמן החניה
        type: Schema.Types.ObjectId,
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

module.exports = mongoose.model('ParkingSession', sessionSchema);