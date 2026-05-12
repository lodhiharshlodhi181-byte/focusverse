import User from '../models/User.js';
import Streak from '../models/Streak.js';

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: '❌ User not found'
      });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '❌ Error fetching profile',
      error: error.message
    });
  }
};

export const updateAvatar = async (req, res) => {
  try {
    const { expression, level } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        'avatar.expression': expression,
        'avatar.level': level
      },
      { new: true }
    );

    res.json({
      success: true,
      message: '✅ Avatar updated',
      avatar: user.avatar
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '❌ Error updating avatar',
      error: error.message
    });
  }
};

export const updateStats = async (req, res) => {
  try {
    const { totalFocus, productiveHours, nonProductiveHours } = req.body;
    
    const user = await User.findById(req.userId);
    
    if (totalFocus) user.stats.totalFocus += totalFocus;
    if (productiveHours) user.stats.productiveHours += productiveHours;
    if (nonProductiveHours) user.stats.nonProductiveHours += nonProductiveHours;
    
    // Update XP: 1 minute focus = 10 XP
    user.stats.totalXp += (totalFocus || 0) * 10;
    
    // Update avatar health based on productivity
    const productivityRatio = user.stats.productiveHours / 
      (user.stats.productiveHours + user.stats.nonProductiveHours || 1);
    user.avatar.health = Math.min(100, productivityRatio * 100);
    
    // Update avatar expression based on stats
    if (user.stats.totalFocus > 300) {
      user.avatar.expression = 'energetic';
    } else if (user.stats.totalFocus > 180) {
      user.avatar.expression = 'happy';
    } else if (user.stats.totalFocus < 30) {
      user.avatar.expression = 'sick';
    } else {
      user.avatar.expression = 'neutral';
    }
    
    await user.save();

    res.json({
      success: true,
      message: '✅ Stats updated',
      stats: user.stats,
      avatar: user.avatar
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '❌ Error updating stats',
      error: error.message
    });
  }
};
