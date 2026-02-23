import ParkingSession from '../../models/ParkingSession.model.js';
import Rate from '../../models/Rate.model.js';
import Space from '../../models/Space.model.js';

export async function getAllSessions(req, res) {
    try {
        const sessions = await ParkingSession.find()
            .populate('user_id')
            .populate('rate_id')
            .populate('space_id');
        res.json(sessions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function getMySessions(req, res) {
    try {
        const userId = req.user.userId || req.user.id || req.user._id;
        const sessions = await ParkingSession.find({ user_id: userId })
            .populate('rate_id')
            .populate('space_id')
            .sort({ createdAt: -1 }); // Newest first
        res.json(sessions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function getSessionById(req, res) {
    try {
        const session = await ParkingSession.findById(req.params.id)
            .populate('user_id')
            .populate('rate_id');
        if (!session) return res.status(404).json({ error: 'Session not found' });
        res.json(session);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function createSession(req, res) {
    try {
        const { user_id, license_plate, space_id, rate_id } = req.body;

        const rate = await Rate.findById(rate_id);
        if (!rate) return res.status(404).json({ error: 'Rate not found' });

        const space = await Space.findById(space_id);
        if (!space) return res.status(404).json({ error: 'Space not found' });

        if (space.current_occupancy >= space.capacity) {
            return res.status(400).json({ error: 'Parking space is full' });
        }

        const session = new ParkingSession({
            user_id,
            license_plate,
            space_id,
            rate_id,
            entry_time: new Date()
        });

        // Increment occupancy
        space.current_occupancy += 1;
        await space.save();
        await session.save();

        res.status(201).json(session);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function endSession(req, res) {
    try {
        const session = await ParkingSession.findById(req.params.id)
            .populate('rate_id')
            .populate('space_id');

        if (!session) return res.status(404).json({ error: 'Session not found' });
        if (session.exit_time) return res.status(400).json({ error: 'Session already ended' });

        const exit_time = new Date();
        const duration_minutes = Math.ceil((exit_time - session.entry_time) / 60000);

        const rate = session.rate_id;
        const charge_minutes = Math.max(duration_minutes, rate.min_charge_minutes);
        const total_amount = charge_minutes * rate.price_per_minute;

        session.exit_time = exit_time;
        session.duration_minutes = duration_minutes;
        session.total_amount = total_amount;
        session.is_paid = true;

        // Decrement occupancy
        if (session.space_id && session.space_id.current_occupancy > 0) {
            session.space_id.current_occupancy -= 1;
            await session.space_id.save();
        }

        await session.save();
        res.json(session);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function updateSession(req, res) {
    try {
        const session = await ParkingSession.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate('user_id')
            .populate('rate_id');
        if (!session) return res.status(404).json({ error: 'Session not found' });
        res.json(session);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function deleteSession(req, res) {
    try {
        await ParkingSession.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Session deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function markAsPaid(req, res) {
    try {
        const session = await ParkingSession.findByIdAndUpdate(
            req.params.id,
            { is_paid: true },
            { new: true }
        );
        if (!session) return res.status(404).json({ error: 'Session not found' });
        res.json(session);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
