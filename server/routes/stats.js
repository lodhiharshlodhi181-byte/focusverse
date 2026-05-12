import express from 'express';
import { getStats, recordActivity, getCategorizedUsage, getAnalyticsData } from '../controllers/statsController.js';

const router = express.Router();

router.get('/', getStats);
router.get('/categorized', getCategorizedUsage);
router.get('/analytics', getAnalyticsData);
router.post('/record', recordActivity);

export default router;
