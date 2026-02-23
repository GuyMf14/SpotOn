import User from '../../models/User.model.js';
import { registerSchema, loginSchema, updateUserSchema } from './user.validation.js';
import { generateToken } from '../../middleware/auth.js';
import bcrypt from 'bcrypt';

export async function register(req, res) {
    try {
        const validated = registerSchema.parse(req.body);

        const existingUser = await User.findOne({ email: validated.email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        const user = new User(validated);
        await user.save();

        const token = generateToken(user._id.toString(), user.role);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    } catch (err) {
        if (err.name === 'ZodError') {
            return res.status(400).json({ error: err.errors[0].message });
        }
        res.status(400).json({ error: err.message });
    }
}

export async function login(req, res) {
    try {
        const validated = loginSchema.parse(req.body);

        const user = await User.findOne({ email: validated.email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(validated.password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = generateToken(user._id.toString(), user.role);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    } catch (err) {
        if (err.name === 'ZodError') {
            return res.status(400).json({ error: err.errors[0].message });
        }
        res.status(401).json({ error: 'Invalid email or password' });
    }
}

export async function logout(req, res) {
    res.clearCookie('token');
    res.json({ msg: 'Logged out' });
}

export async function getMe(req, res) {
    try {
        console.log('req.user:', req.user);
        const userId = req.user.userId || req.user.id || req.user._id;

        if (!userId) {
            return res.status(400).json({ error: 'User ID missing from token payload' });
        }

        const user = await User.findById(userId).select('-password');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        console.error('Error in getMe:', err);
        res.status(500).json({ error: err.message });
    }
}

export async function getAllUsers(req, res) {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function getUserById(req, res) {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function createUser(req, res) {
    try {
        const validated = registerSchema.parse(req.body);

        const existingUser = await User.findOne({ email: validated.email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        const user = new User(validated);
        await user.save();

        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    } catch (err) {
        if (err.name === 'ZodError') {
            return res.status(400).json({ error: err.errors[0].message });
        }
        res.status(400).json({ error: err.message });
    }
}

export async function updateUser(req, res) {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        const validated = updateUserSchema.parse(req.body);

        const user = await User.findByIdAndUpdate(req.params.id, validated, { new: true }).select('-password');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        if (err.name === 'ZodError') {
            return res.status(400).json({ error: err.errors[0].message });
        }
        res.status(400).json({ error: err.message });
    }
}

export async function deleteUser(req, res) {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        await User.findByIdAndDelete(req.params.id);
        res.json({ msg: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}