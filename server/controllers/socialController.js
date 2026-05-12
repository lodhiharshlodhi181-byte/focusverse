import User from '../models/User.js';
import FriendRequest from '../models/FriendRequest.js';

export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    const users = await User.find({
      username: { $regex: query, $options: 'i' },
      _id: { $ne: req.userId } // Don't include self
    }).select('username avatar stats.currentStreak stats.totalXp');
    
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const sendFriendRequest = async (req, res) => {
  try {
    const { recipientId } = req.body;
    
    // Check if request already exists
    const existing = await FriendRequest.findOne({
      $or: [
        { sender: req.userId, recipient: recipientId },
        { sender: recipientId, recipient: req.userId }
      ]
    });

    if (existing) {
      return res.status(400).json({ success: false, message: 'Request already exists or you are already friends' });
    }

    const request = new FriendRequest({
      sender: req.userId,
      recipient: recipientId
    });

    await request.save();
    res.json({ success: true, message: '✅ Friend request sent' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getFriendRequests = async (req, res) => {
  try {
    const incoming = await FriendRequest.find({ recipient: req.userId, status: 'pending' })
      .populate('sender', 'username avatar stats.currentStreak');
    
    const outgoing = await FriendRequest.find({ sender: req.userId, status: 'pending' })
      .populate('recipient', 'username avatar stats.currentStreak');

    res.json({ success: true, incoming, outgoing });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const respondToRequest = async (req, res) => {
  try {
    const { requestId, status } = req.body; // status: 'accepted' or 'rejected'
    
    const request = await FriendRequest.findById(requestId);
    if (!request) return res.status(404).json({ success: false, message: 'Request not found' });

    if (status === 'accepted') {
      request.status = 'accepted';
      await request.save();

      // Add to both users' friends list
      await User.findByIdAndUpdate(request.sender, { $addToSet: { 'stats.friends': request.recipient } });
      await User.findByIdAndUpdate(request.recipient, { $addToSet: { 'stats.friends': request.sender } });
    } else {
      await FriendRequest.findByIdAndDelete(requestId);
    }

    res.json({ success: true, message: `Request ${status}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate({
      path: 'stats.friends',
      select: 'username avatar stats lastActive'
    });

    // Determine online status (last active within 5 minutes)
    const friends = user.stats.friends.map(friend => {
      const isOnline = friend.lastActive && (new Date() - new Date(friend.lastActive) < 5 * 60 * 1000);
      return {
        ...friend.toObject(),
        isOnline
      };
    });

    res.json({ success: true, friends });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
