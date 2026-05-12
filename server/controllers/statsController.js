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

    const user = await User.findById(req.userId);
    if (user) {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      if (category === 'productive') {
        const minutesSpent = timeSpent / 60;
        user.stats.totalFocus += minutesSpent;
        user.stats.productiveHours += (timeSpent / 3600);
        user.stats.totalXp += Math.floor(minutesSpent * 5);

        if (!user.stats.lastProductiveDate) {
          user.stats.currentStreak = 1;
        } else {
          const lastDate = new Date(user.stats.lastProductiveDate);
          const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
          if (diffDays === 1) user.stats.currentStreak += 1;
          else if (diffDays > 1) user.stats.currentStreak = 1;
        }
        user.stats.lastProductiveDate = now;
      } else {
        user.stats.nonProductiveHours += (timeSpent / 3600);
      }
      await user.save();
    }

    res.status(201).json({ success: true, log });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getCategorizedUsage = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const logs = await ProductivityLog.find({ userId: req.userId, timestamp: { $gte: today } });
    
    const categories = { 'Productive': [], 'Social Media': [], 'Entertainment': [], 'Education': [], 'Other': [] };
    logs.forEach(log => {
      let key = 'Other';
      const c = log.category.toLowerCase();
      if (c === 'productive') key = 'Productive';
      else if (c === 'social' || c === 'distracting') key = 'Social Media';
      else if (c === 'entertainment') key = 'Entertainment';
      else if (c === 'education') key = 'Education';

      const existing = categories[key].find(i => i.name === log.website);
      if (existing) existing.time += log.timeSpent;
      else categories[key].push({ name: log.website, time: log.timeSpent, icon: getIconForSite(log.website) });
    });
    res.json({ success: true, categories });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
};

export const getAnalyticsData = async (req, res) => {
  try {
    const { period } = req.query;
    const days = period === 'monthly' ? 30 : 7;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const logs = await ProductivityLog.find({ userId: req.userId, timestamp: { $gte: startDate } });
    const dailyData = {};
    const breakdown = { productive: 0, social: 0, entertainment: 0, other: 0 };

    logs.forEach(log => {
      const date = log.timestamp.toISOString().split('T')[0];
      if (!dailyData[date]) dailyData[date] = { productive: 0, distraction: 0 };
      
      const c = log.category.toLowerCase();
      if (c === 'productive') {
        dailyData[date].productive += log.timeSpent / 60;
        breakdown.productive += log.timeSpent;
      } else {
        dailyData[date].distraction += log.timeSpent / 60;
        if (c === 'social' || c === 'distracting') breakdown.social += log.timeSpent;
        else if (c === 'entertainment') breakdown.entertainment += log.timeSpent;
        else breakdown.other += log.timeSpent;
      }
    });
    res.json({ success: true, chartData: dailyData, breakdown });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
};

const getIconForSite = (url) => {
  if (url.includes('github') || url.includes('vscode')) return '💻';
  if (url.includes('youtube') || url.includes('netflix')) return '🎬';
  if (url.includes('instagram') || url.includes('facebook')) return '📱';
  return '🌐';
};
