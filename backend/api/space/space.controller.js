import Space from '../../models/Space.model.js';

export async function getAllSpaces(req, res) {
    try {
        const spaces = await Space.find();
        res.json(spaces);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function createSpace(req, res) {
    try {
        const { name, capacity } = req.body;

        // Basic validation
        if (!name || !capacity) {
            return res.status(400).json({ error: 'Name and capacity are required' });
        }

        const space = new Space({
            name,
            capacity
        });

        await space.save();
        res.status(201).json(space);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ error: 'A space with this name already exists' });
        }
        res.status(400).json({ error: err.message });
    }
}

export async function updateSpace(req, res) {
    try {
        const space = await Space.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!space) return res.status(404).json({ error: 'Space not found' });
        res.json(space);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function deleteSpace(req, res) {
    try {
        const space = await Space.findByIdAndDelete(req.params.id);
        if (!space) return res.status(404).json({ error: 'Space not found' });
        res.json({ msg: 'Space deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
