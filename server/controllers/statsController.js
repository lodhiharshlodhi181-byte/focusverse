import ProductivityLog from '../models/ProductivityLog.js';
import User from '../models/User.js';

export const getStats = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const logs = await ProductivityLog.find({ userId: req.userId }).sort({ timestamp: -1 }).limit(10);

    const totalProductive = logs.filter(log => log.category === 'productive').length;
    const totalNonProductive = logs.filter(log => log.category === 'non-productive' || log.category === 'mindless-consumption').length;

    res.json({
      success: true,
      stats: {
        userStats: user.stats,
        recentLogs: logs,
        summary: {
          productive: totalProductive,
          nonProductive: totalNonProductive,
          total: logs.length
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '❌ Error fetching stats',
      error: error.message
    });
  }
};

export const recordActivity = async (req, res) => {
  try {
    const { website, category, timeSpent, scrollSpeed } = req.body;

    const log = new ProductivityLog({
      userId: req.userId,
      website,
      category,
      timeSpent,
      scrollSpeed
    });

    await log.save();

    // Update User Stats (Streaks and Challenges)
    const user = await User.findById(req.userId);
    if (user) {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      // 1. Weekly Challenge Logic
      const lastReset = new Date(user.stats.weeklyChallenge.lastReset);
      const daysSinceReset = (now - lastReset) / (1000 * 60 * 60 * 24);
      
      if (daysSinceReset >= 7) {
        user.stats.weeklyChallenge.progress = 0;
        user.stats.weeklyChallenge.lastReset = now;
      }

      if (category === 'productive') {
        // Update total focus and weekly progress
        const minutesSpent = timeSpent / 60;
        user.stats.totalFocus += minutesSpent;
        user.stats.weeklyChallenge.progress += minutesSpent;
        user.stats.productiveHours += (timeSpent / 3600);
        
        // XP Reward: 5 XP per productive minute
        user.stats.totalXp += Math.floor(minutesSpent * 5);

        // 2. Daily Streak Logic
        if (!user.stats.lastProductiveDate) {
          user.stats.currentStreak = 1;
          user.stats.lastProductiveDate = now;
        } else {
          const lastDate = new Date(user.stats.lastProductiveDate);
          const lastDay = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());
          const diffDays = (today - lastDay) / (1000 * 60 * 60 * 24);

          if (diffDays === 1) {
            // Consecutive day
            user.stats.currentStreak += 1;
            user.stats.lastProductiveDate = now;
          } else if (diffDays > 1) {
            // Streak broken
            user.stats.currentStreak = 1;
            user.stats.lastProductiveDate = now;
          } else if (diffDays === 0) {
            // Already active today
            user.stats.lastProductiveDate = now;
          }
        }

        if (user.stats.currentStreak > user.stats.longestStreak) {
          user.stats.longestStreak = user.stats.currentStreak;
        }

        // 3. No-Scroll Challenge Logic
        if (scrollSpeed !== undefined && scrollSpeed < 50) {
           if (!user.stats.noScrollStreak) user.stats.noScrollStreak = 0;
           user.stats.noScrollStreak += 0.5; // Gain more points for low scroll
        } else if (scrollSpeed > 500) {
          // Penalize for high scroll speed
          user.stats.noScrollStreak = Math.max(0, user.stats.noScrollStreak - 2);
        }
      } else if (category === 'non-productive' || category === 'mindless-consumption') {
        user.stats.nonProductiveHours += (timeSpent / 3600);
        
        // Penalize streaks if mindless consumption detected
        if (category === 'mindless-consumption') {
          user.stats.noScrollStreak = Math.max(0, user.stats.noScrollStreak - 5);
          user.stats.totalXp = Math.max(0, user.stats.totalXp - 10);
        }
      }

      user.lastActive = now;
      await user.save();
    }

    res.status(201).json({
      success: true,
      message: '✅ Activity recorded and stats updated',
      log,
      stats: user ? user.stats : null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '❌ Error recording activity',
      error: error.message
    });
  }
};

