import express from 'express';
import {
    getAllSessions,
    getSessionById,
    createSession,
    endSession,
    updateSession,
    deleteSession,
    markAsPaid,
    getMySessions
} from './session.controller.js';
import { verifyToken } from '../../middleware/auth.js';

const router = express.Router();

router.get('/my-sessions', verifyToken, getMySessions);
router.get('/', getAllSessions);
router.get('/:id', getSessionById);
router.post('/', createSession);
router.put('/:id/end', endSession);
router.put('/:id/pay', markAsPaid);
router.put('/:id', updateSession);
router.delete('/:id', deleteSession);

export default router;