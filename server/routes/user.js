import express from 'express';
import { getUserProfile, updateAvatar, updateStats } from '../controllers/userController.js';

const router = express.Router();

router.get('/profile', getUserProfile);
router.put('/avatar', updateAvatar);
router.put('/stats', updateStats);

export default router;
