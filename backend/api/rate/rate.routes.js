import express from 'express';
import { getAllRates, getRateById, createRate, updateRate, deleteRate } from './rate.controller.js';

const router = express.Router();

router.get('/', getAllRates);
router.get('/:id', getRateById);
router.post('/', createRate);
router.put('/:id', updateRate);
router.delete('/:id', deleteRate);

export default router;