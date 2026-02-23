import express from 'express';
import { register, login, logout, getMe, getAllUsers, getUserById, createUser, updateUser, deleteUser } from './user.controller.js';
import { verifyToken, verifyAdmin } from '../../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.get('/me', verifyToken, getMe);
router.get('/', verifyToken, getAllUsers);
router.get('/:id', verifyToken, getUserById);
router.post('/', verifyToken, verifyAdmin, createUser);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, verifyAdmin, deleteUser);

export default router;