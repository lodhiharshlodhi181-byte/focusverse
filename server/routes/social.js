import express from 'express';
import { 
  searchUsers, 
  sendFriendRequest, 
  getFriendRequests, 
  respondToRequest, 
  getFriends 
} from '../controllers/socialController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/search', verifyToken, searchUsers);
router.get('/friends', verifyToken, getFriends);
router.get('/requests', verifyToken, getFriendRequests);
router.post('/request', verifyToken, sendFriendRequest);
router.post('/respond', verifyToken, respondToRequest);

export default router;
