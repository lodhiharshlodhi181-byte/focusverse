import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();
  const menuItems = [
    { name: 'Dashboard', icon: '🏠', path: '/dashboard' },
    { name: 'Analytics', icon: '📊', path: '/analytics' },
    { name: 'App Blocker', icon: '🚫', path: '/blocker' },
    { name: 'Categorization', icon: '📁', path: '/categorization' },
    { name: 'Friends', icon: '👥', path: '/friends' },
    { name: 'Focus Timer', icon: '🍅', path: '/timer' },
    { name: 'Leaderboard', icon: '🏆', path: '/leaderboard' },
    { name: 'Streaks', icon: '🔥', path: '/streaks' },
    { name: 'Screen Time', icon: '📱', path: '/screen-time' },
    { name: 'AI Insights', icon: '🤖', path: '/ai-insights' },
    { name: 'Settings', icon: '⚙️', path: '/settings' },
  ];

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-0 top-0 h-screen w-64 glass-effect border-r border-neon-purple/30 p-6 flex flex-col z-50"
    >
      <div className="mb-10">
        <h1 className="text-2xl font-black bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
          FOCUSVERSE
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center space-x-4 p-3 rounded-xl transition-all duration-300
              ${isActive 
                ? 'bg-neon-purple/20 border border-neon-purple text-white shadow-[0_0_15px_rgba(191,0,255,0.3)]' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'}
            `}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-semibold">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="pt-6 border-t border-white/10">
        <div className="bg-gradient-to-br from-neon-purple/10 to-neon-pink/10 p-4 rounded-xl border border-white/5">
          <p className="text-xs text-gray-400 mb-1">Current Streak</p>
          <p className="text-xl font-bold text-neon-pink">🔥 {user?.stats?.currentStreak || 0} Days</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
