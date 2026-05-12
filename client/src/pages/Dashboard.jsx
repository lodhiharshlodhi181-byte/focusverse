import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Avatar from '../avatar/Avatar';
import { useAuth } from '../context/AuthContext';
import { userAPI, leaderboardAPI } from '../api/axios';

const Dashboard = () => {
  const { user, updateUser, socket } = useAuth();
  const [rank, setRank] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchUserRank();
    }
  }, [user]);

  useEffect(() => {
    if (socket) {
      socket.on('productivity_updated', (data) => {
        console.log('Productivity updated:', data);
      });
    }
  }, [socket]);

  const fetchUserRank = async () => {
    try {
      const response = await leaderboardAPI.getUserRank();
      setRank(response.data.rank);
    } catch (error) {
      console.error('Error fetching rank:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user || loading) {
    return <div className="min-h-screen bg-gradient-cyber flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-cyber p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-12"
        >
          <div>
            <h1 className="text-5xl font-bold mb-2">Welcome, <span className="bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">{user.username}</span></h1>
            <p className="text-gray-400">🎮 Your rank: <span className="text-neon-cyan">#{rank}</span></p>
          </div>
          <button className="bg-neon-purple px-6 py-2 rounded-lg font-semibold hover:bg-neon-pink transition-colors">
            Settings
          </button>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Avatar Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 glass-effect rounded-xl p-6 neon-glow flex flex-col items-center justify-center"
          >
            <Avatar
              productivity={user.stats.productivityScore || 0}
              focusTime={user.stats.totalFocus || 0}
              scrollAddiction={user.stats.scrollSpeed || 0}
              level={user.avatar.level}
            />
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 grid grid-cols-2 gap-4"
          >
            {/* Total Focus Time */}
            <div className="glass-effect rounded-xl p-6 neon-glow hover:neon-glow-pink transition-all">
              <p className="text-gray-400 text-sm mb-2">⏱️ Total Focus</p>
              <h3 className="text-3xl font-bold text-neon-cyan">{user.stats.totalFocus}</h3>
              <p className="text-gray-400 text-sm mt-2">minutes</p>
            </div>

            {/* Current Streak */}
            <div className="glass-effect rounded-xl p-6 neon-glow hover:neon-glow-cyan transition-all">
              <p className="text-gray-400 text-sm mb-2">🔥 Current Streak</p>
              <h3 className="text-3xl font-bold text-neon-pink">{user.stats.currentStreak}</h3>
              <p className="text-gray-400 text-sm mt-2">days</p>
            </div>

            {/* Total XP */}
            <div className="glass-effect rounded-xl p-6 neon-glow hover:neon-glow-cyan transition-all">
              <p className="text-gray-400 text-sm mb-2">⭐ Total XP</p>
              <h3 className="text-3xl font-bold text-neon-green">{user.stats.totalXp}</h3>
              <p className="text-gray-400 text-sm mt-2">points</p>
            </div>

            {/* Longest Streak */}
            <div className="glass-effect rounded-xl p-6 neon-glow hover:neon-glow-pink transition-all">
              <p className="text-gray-400 text-sm mb-2">🏆 Longest Streak</p>
              <h3 className="text-3xl font-bold text-neon-purple">{user.stats.longestStreak}</h3>
              <p className="text-gray-400 text-sm mt-2">days</p>
            </div>

            {/* Productive Hours */}
            <div className="glass-effect rounded-xl p-6 neon-glow hover:neon-glow-cyan transition-all">
              <p className="text-gray-400 text-sm mb-2">✅ Productive</p>
              <h3 className="text-3xl font-bold text-neon-green">{Math.round(user.stats.productiveHours * 10) / 10}</h3>
              <p className="text-gray-400 text-sm mt-2">hours</p>
            </div>

            {/* Weekly Progress */}
            <div className="glass-effect rounded-xl p-6 neon-glow hover:neon-glow-pink transition-all">
              <p className="text-gray-400 text-sm mb-2">📅 Weekly Goal</p>
              <h3 className="text-3xl font-bold text-neon-cyan">{Math.round(user.stats.weeklyChallenge?.progress || 0)}</h3>
              <p className="text-gray-400 text-sm mt-2">/ {user.stats.weeklyChallenge?.goal || 1000} mins</p>
            </div>

            {/* No-Scroll Streak */}
            <div className="glass-effect rounded-xl p-6 neon-glow hover:neon-glow-cyan transition-all">
              <p className="text-gray-400 text-sm mb-2">🛡️ No-Scroll</p>
              <h3 className="text-3xl font-bold text-neon-green">{Math.floor(user.stats.noScrollStreak || 0)}</h3>
              <p className="text-gray-400 text-sm mt-2">points</p>
            </div>

            {/* Non-Productive Hours */}
            <div className="glass-effect rounded-xl p-6 neon-glow hover:neon-glow-pink transition-all">
              <p className="text-gray-400 text-sm mb-2">❌ Non-Productive</p>
              <h3 className="text-3xl font-bold text-neon-pink">{Math.round(user.stats.nonProductiveHours * 10) / 10}</h3>
              <p className="text-gray-400 text-sm mt-2">hours</p>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 glass-effect rounded-xl p-6 neon-glow"
        >
          <h2 className="text-2xl font-bold mb-4">⚡ Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => navigate('/timer')}
              className="bg-neon-purple/20 hover:bg-neon-purple/40 border border-neon-purple rounded-lg p-4 transition-all text-center font-semibold"
            >
              🍅 Pomodoro
            </button>
            <button 
              onClick={() => navigate('/analytics')}
              className="bg-neon-cyan/20 hover:bg-neon-cyan/40 border border-neon-cyan rounded-lg p-4 transition-all text-center font-semibold"
            >
              📊 Analytics
            </button>
            <button 
              onClick={() => navigate('/friends')}
              className="bg-neon-pink/20 hover:bg-neon-pink/40 border border-neon-pink rounded-lg p-4 transition-all text-center font-semibold"
            >
              👥 Friends
            </button>
            <button 
              onClick={() => navigate('/leaderboard')}
              className="bg-neon-green/20 hover:bg-neon-green/40 border border-neon-green rounded-lg p-4 transition-all text-center font-semibold"
            >
              🏆 Leaderboard
            </button>
            <button 
              onClick={() => navigate('/streaks')}
              className="bg-orange-500/20 hover:bg-orange-500/40 border border-orange-500 rounded-lg p-4 transition-all text-center font-semibold"
            >
              🔥 Streaks
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
