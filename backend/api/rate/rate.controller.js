import Rate from '../../models/Rate.model.js';

export async function getAllRates(req, res) {
    try {
        const rates = await Rate.find({ is_active: true });
        res.json(rates);
    } catch (err) {
        console.error('Error fetching rates:', err);
        res.status(500).json({ error: err.message });
    }
}

export async function getRateById(req, res) {
    try {
        const rate = await Rate.findById(req.params.id);
        if (!rate) return res.status(404).json({ error: 'Rate not found' });
        res.json(rate);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function createRate(req, res) {
    try {
        const { name, price_per_hour, min_charge_minutes } = req.body;
        const rate = new Rate({
            name,
            price_per_hour,
            min_charge_minutes: min_charge_minutes || 0
        });
        await rate.save();
        res.status(201).json(rate);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function updateRate(req, res) {
    try {
        const rate = await Rate.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!rate) return res.status(404).json({ error: 'Rate not found' });
        res.json(rate);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function deleteRate(req, res) {
    try {
        await Rate.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Rate deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
