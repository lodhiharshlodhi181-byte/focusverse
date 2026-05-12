import express from 'express';
import { getStats, recordActivity } from '../controllers/statsController.js';

const router = express.Router();

router.get('/', getStats);
router.post('/record', recordActivity);

export default router;
