import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { statsAPI } from '../api/axios';

const Categorization = () => {
  const [categoriesData, setCategoriesData] = useState({
    'Productive': [],
    'Social Media': [],
    'Entertainment': [],
    'Education': [],
    'Other': []
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await statsAPI.getCategorizedUsage();
        if (res.data.success) {
          setCategoriesData(res.data.categories);
        }
      } catch (err) {
        console.error('Error fetching categorized data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h > 0 ? h + 'h ' : ''}${m}m`;
  };

  const calculateTotalTimeForCategory = (apps) => {
    const totalSeconds = apps.reduce((acc, app) => acc + app.time, 0);
    return formatTime(totalSeconds);
  };

  const categoriesConfig = [
    { id: 'productive', name: 'Productive', icon: '🚀', color: 'from-green-400 to-cyan-500', glow: 'neon-glow-green' },
    { id: 'social', name: 'Social Media', icon: '🤳', color: 'from-pink-500 to-rose-500', glow: 'neon-glow-pink' },
    { id: 'entertainment', name: 'Entertainment', icon: '🎬', color: 'from-purple-500 to-indigo-600', glow: 'neon-glow-purple' },
    { id: 'education', name: 'Education', icon: '🎓', color: 'from-yellow-400 to-orange-500', glow: 'neon-glow-cyan' },
    { id: 'other', name: 'Other', icon: '🌐', color: 'from-gray-400 to-slate-500', glow: 'neon-glow-white' }
  ];

  const filteredCategories = categoriesConfig.map(config => {
    const apps = (categoriesData[config.name] || []).filter(app => 
      app.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return { ...config, apps };
  }).filter(cat => cat.apps.length > 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-bold text-neon-cyan animate-pulse">Scanning digital environment...</div>
      </div>
    );
  }

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
        <p className="text-gray-400">Analyze your real-world digital habits by category.</p>
      </motion.div>

      {/* Search Bar */}
      <div className="mb-8 relative max-w-md">
        <input 
          type="text" 
          placeholder="Search your real apps..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 pl-12 text-white focus:outline-none focus:border-neon-purple transition-all glass-effect"
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredCategories.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white/5 rounded-3xl border border-dashed border-white/10">
            <p className="text-gray-500 text-xl">No data detected for today yet. Start browsing to see your categorization!</p>
          </div>
        ) : filteredCategories.map((category) => (
          <motion.div 
            key={category.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`glass-effect rounded-3xl p-6 border border-white/5 transition-all duration-300 ${category.glow}`}
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{category.icon}</span>
                <div>
                  <h2 className={`text-2xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                    {category.name}
                  </h2>
                  <p className="text-xs text-gray-400 font-mono">Total: <span className="text-neon-cyan">{calculateTotalTimeForCategory(category.apps)}</span></p>
                </div>
              </div>
              <span className="text-xs font-black px-3 py-1 bg-white/5 rounded-full border border-white/10 text-gray-400">
                {category.apps.length} {category.apps.length === 1 ? 'APP' : 'APPS'}
              </span>
            </div>

            <div className="space-y-4">
              {category.apps.sort((a,b) => b.time - a.time).map((app, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-all group"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl group-hover:scale-110 transition-transform">{app.icon}</span>
                    <div>
                      <h4 className="font-bold text-gray-200">{app.name}</h4>
                      <p className="text-xs text-gray-500">Real Usage Today</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold text-neon-cyan">{formatTime(app.time)}</p>
                    <div className="w-24 h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        className={`h-full bg-gradient-to-r ${category.color}`}
                      ></motion.div>
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
