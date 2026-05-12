import User from '../models/User.js';

export const getLeaderboard = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select('username stats avatar createdAt')
      .sort({ 'stats.totalXp': -1 })
      .skip(skip)
      .limit(limit);

    const totalUsers = await User.countDocuments();

    res.json({
      success: true,
      users,
      pagination: {
        total: totalUsers,
        page,
        pages: Math.ceil(totalUsers / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '❌ Error fetching leaderboard',
      error: error.message
    });
  }
};

export const getUserRank = async (req, res) => {
  try {
    const userCount = await User.countDocuments({
      'stats.totalXp': { $gt: (await User.findById(req.userId)).stats.totalXp }
    });

    res.json({
      success: true,
      rank: userCount + 1
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '❌ Error fetching rank',
      error: error.message
    });
  }
};
