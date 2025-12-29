import express from 'express';
import { 
    getAllSessions, 
    getSessionById, 
    createSession, 
    endSession, 
    updateSession, 
    deleteSession,
    markAsPaid
} from './session.controller.js';

const router = express.Router();

router.get('/', getAllSessions);
router.get('/:id', getSessionById);
router.post('/', createSession);
router.put('/:id/end', endSession);
router.put('/:id/pay', markAsPaid);
router.put('/:id', updateSession);
router.delete('/:id', deleteSession);

export default router;