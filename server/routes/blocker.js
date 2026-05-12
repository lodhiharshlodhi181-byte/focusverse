import express from 'express';
import { 
  getBlockedSites, 
  addBlockedSite, 
  updateBlockedSite, 
  removeBlockedSite 
} from '../controllers/blockerController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getBlockedSites);
router.post('/add', addBlockedSite);
router.put('/update', updateBlockedSite);
router.delete('/:siteId', removeBlockedSite);

export default router;
