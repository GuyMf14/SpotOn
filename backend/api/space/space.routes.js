import express from 'express';
import { getAllSpaces, createSpace, updateSpace, deleteSpace } from './space.controller.js';
import { verifyToken, verifyAdmin } from '../../middleware/auth.js';

const router = express.Router();

router.get('/', verifyToken, getAllSpaces);
router.post('/', verifyToken, verifyAdmin, createSpace);
router.put('/:id', verifyToken, verifyAdmin, updateSpace);
router.delete('/:id', verifyToken, verifyAdmin, deleteSpace);

export default router;
