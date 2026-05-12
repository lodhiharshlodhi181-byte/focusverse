import express from 'express';
import { classifyActivity } from '../services/aiService.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/classify', verifyToken, async (req, res) => {
  try {
    const { appName, title, scrollSpeed, duration } = req.body;
    
    if (!appName) {
      return res.status(400).json({ message: "App name is required" });
    }

    const insight = await classifyActivity({ appName, title, scrollSpeed, duration });
    res.json(insight);
  } catch (error) {
    res.status(500).json({ message: "AI classification failed" });
  }
});

export default router;
