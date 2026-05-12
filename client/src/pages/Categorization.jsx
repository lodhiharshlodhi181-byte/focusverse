import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Categorization = () => {
  const [categories] = useState([
    {
      id: 'productive',
      name: 'Productive',
      icon: '🚀',
      color: 'from-green-400 to-cyan-500',
      glow: 'neon-glow-green',
      apps: [
        { name: 'VS Code', time: '4h 20m', icon: '💻' },
        { name: 'GitHub', time: '1h 45m', icon: '🐙' },
        { name: 'Stack Overflow', time: '30m', icon: '📚' },
        { name: 'Notion', time: '1h 10m', icon: '📝' },
      ]
    },
    {
      id: 'social',
      name: 'Social Media',
      icon: '🤳',
      color: 'from-pink-500 to-rose-500',
      glow: 'neon-glow-pink',
      apps: [
        { name: 'Instagram', time: '2h 15m', icon: '📸' },
        { name: 'WhatsApp', time: '1h 05m', icon: '💬' },
        { name: 'Twitter', time: '45m', icon: '🐦' },
        { name: 'Facebook', time: '20m', icon: '👥' },
      ]
    },
    {
      id: 'entertainment',
      name: 'Entertainment',
      icon: '🎬',
      color: 'from-purple-500 to-indigo-600',
      glow: 'neon-glow-purple',
      apps: [
        { name: 'YouTube', time: '3h 30m', icon: '📺' },
        { name: 'Netflix', time: '2h 00m', icon: '🍿' },
        { name: 'Spotify', time: '1h 50m', icon: '🎵' },
      ]
    },
    {
      id: 'education',
      name: 'Education',
      icon: '🎓',
      color: 'from-yellow-400 to-orange-500',
      glow: 'neon-glow-cyan',
      apps: [
        { name: 'Coursera', time: '1h 20m', icon: '📜' },
        { name: 'Udemy', time: '50m', icon: '🎓' },
        { name: 'Khan Academy', time: '30m', icon: '🦉' },
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const calculateTotalTime = (apps) => {
    let totalMinutes = 0;
    apps.forEach(app => {
      const hoursMatch = app.time.match(/(\d+)h/);
      const minutesMatch = app.time.match(/(\d+)m/);
      if (hoursMatch) totalMinutes += parseInt(hoursMatch[1]) * 60;
      if (minutesMatch) totalMinutes += parseInt(minutesMatch[1]);
    });
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return `${h > 0 ? h + 'h ' : ''}${m}m`;
  };

  const filteredCategories = categories.map(cat => ({
    ...cat,
    apps: cat.apps.filter(app => app.name.toLowerCase().includes(searchTerm.toLowerCase()))
  })).filter(cat => cat.apps.length > 0);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-black mb-2 tracking-tight">
          App <span className="bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">Categorization</span>
        </h1>
        <p className="text-gray-400">Analyze your digital habits by category.</p>
      </motion.div>

      {/* Search Bar */}
      <div className="mb-8 relative max-w-md">
        <input 
          type="text" 
          placeholder="Search apps or websites..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 pl-12 text-white focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/50 transition-all glass-effect"
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredCategories.map((category) => (
          <motion.div 
            key={category.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            className={`glass-effect rounded-3xl p-6 border border-white/5 transition-all duration-300 ${category.glow}`}
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{category.icon}</span>
                <div>
                  <h2 className={`text-2xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                    {category.name}
                  </h2>
                  <p className="text-xs text-gray-400 font-mono">Total: <span className="text-neon-cyan">{calculateTotalTime(category.apps)}</span></p>
                </div>
              </div>
              <span className="text-xs font-black px-3 py-1 bg-white/5 rounded-full border border-white/10 text-gray-400">
                {category.apps.length} APPS
              </span>
            </div>

            <div className="space-y-4">
              {category.apps.map((app, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl group-hover:scale-110 transition-transform">{app.icon}</span>
                    <div>
                      <h4 className="font-bold text-gray-200">{app.name}</h4>
                      <p className="text-xs text-gray-500">Active Today</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold text-neon-cyan">{app.time}</p>
                    <div className="w-20 h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${category.color}`}
                        style={{ width: `${Math.random() * 80 + 20}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Categorization;
