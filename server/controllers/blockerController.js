import User from '../models/User.js';

export const getBlockedSites = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({
      success: true,
      sites: user.stats.blockedSites || []
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addBlockedSite = async (req, res) => {
  try {
    const { url, mode, timeLimit } = req.body;
    console.log('Adding site:', { url, mode, timeLimit });
    const user = await User.findById(req.userId);
    
    if (!user.stats.blockedSites) user.stats.blockedSites = [];

    // Safety: Check if current data is valid
    if (user.stats.blockedSites.length > 0 && typeof user.stats.blockedSites[0] === 'string') {
      console.log('Detected old string-based blockedSites. Resetting for migration.');
      user.stats.blockedSites = [];
    }

    // Check if site already exists
    if (user.stats.blockedSites.some(s => s && s.url === url)) {
      return res.status(400).json({ success: false, message: 'Site already blocked' });
    }

    user.stats.blockedSites.push({ url, mode, timeLimit });
    await user.save();
    
    res.json({
      success: true,
      message: '✅ Site added to blocker',
      sites: user.stats.blockedSites
    });
  } catch (error) {
    console.error('Error in addBlockedSite:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBlockedSite = async (req, res) => {
  try {
    const { siteId, mode, timeLimit } = req.body;
    const user = await User.findById(req.userId);
    
    const site = user.stats.blockedSites.id(siteId);
    if (!site) return res.status(404).json({ success: false, message: 'Site not found' });

    site.mode = mode || site.mode;
    site.timeLimit = timeLimit !== undefined ? timeLimit : site.timeLimit;
    
    await user.save();
    res.json({ success: true, sites: user.stats.blockedSites });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeBlockedSite = async (req, res) => {
  try {
    const { siteId } = req.params;
    const user = await User.findById(req.userId);
    
    user.stats.blockedSites = user.stats.blockedSites.filter(s => s._id.toString() !== siteId);
    await user.save();
    
    res.json({ success: true, sites: user.stats.blockedSites });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
