import express from 'express';
import { getLeaderboard, getUserRank } from '../controllers/leaderboardController.js';

const router = express.Router();

router.get('/', getLeaderboard);
router.get('/rank', getUserRank);

export default router;
