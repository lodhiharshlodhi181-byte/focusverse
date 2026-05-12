import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { blockerAPI } from '../api/axios';
import { FiPlus, FiTrash2, FiClock, FiShield, FiEye, FiSettings } from 'react-icons/fi';

const AppBlocker = () => {
  const [sites, setSites] = useState([]);
  const [newSite, setNewSite] = useState('');
  const [selectedMode, setSelectedMode] = useState('blocked');
  const [timeLimit, setTimeLimit] = useState(15);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      const res = await blockerAPI.getSites();
      if (res.data.success) setSites(res.data.sites);
    } catch (err) {
      console.error('Error fetching sites:', err);
    } finally {
      setLoading(false);
    }
  };

  const addSite = async (e) => {
    e.preventDefault();
    if (!newSite) return;
    
    try {
      const res = await blockerAPI.addSite({
        url: newSite.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0],
        mode: selectedMode,
        timeLimit: selectedMode === 'timer' ? timeLimit : 0
      });
      if (res.data.success) {
        setSites(res.data.sites);
        setNewSite('');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding site');
    }
  };

  const removeSite = async (id) => {
    try {
      const res = await blockerAPI.removeSite(id);
      if (res.data.success) setSites(res.data.sites);
    } catch (err) {
      console.error('Error removing site:', err);
    }
  };

  const getModeIcon = (mode) => {
    switch (mode) {
      case 'blocked': return <FiShield className="text-red-500" />;
      case 'timer': return <FiClock className="text-amber-500" />;
      case 'monitored': return <FiEye className="text-blue-500" />;
      default: return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-10"
      >
        <h1 className="text-4xl font-bold mb-2">Focus <span className="text-neon-pink">Blocker</span></h1>
        <p className="text-gray-400">Enforce discipline by managing distracting digital environments.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Add Site Form */}
          <div className="glass-effect p-6 rounded-3xl border border-white/10 shadow-xl">
            <form onSubmit={addSite} className="space-y-6">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Enter website URL (e.g. instagram.com)"
                  value={newSite}
                  onChange={(e) => setNewSite(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-neon-purple transition-all placeholder:text-gray-600"
                />
                <button className="bg-neon-purple px-8 py-4 rounded-2xl font-bold hover:shadow-[0_0_20px_rgba(191,0,255,0.4)] transition-all flex items-center gap-2">
                  <FiPlus /> ADD
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'blocked', label: 'Strict Block', icon: <FiShield />, desc: 'No access allowed' },
                  { id: 'timer', label: 'Set Timer', icon: <FiClock />, desc: 'Limited daily access' },
                  { id: 'monitored', label: 'Monitor Only', icon: <FiEye />, desc: 'Record usage logs' }
                ].map(mode => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setSelectedMode(mode.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
                      selectedMode === mode.id 
                        ? 'bg-neon-purple/20 border-neon-purple shadow-[0_0_15px_rgba(191,0,255,0.2)]' 
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <span className={`text-xl ${selectedMode === mode.id ? 'text-neon-purple' : 'text-gray-400'}`}>
                      {mode.icon}
                    </span>
                    <span className="text-xs font-bold">{mode.label}</span>
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {selectedMode === 'timer' && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                      <div className="flex justify-between mb-2">
                        <label className="text-sm text-gray-400 font-medium">Daily Time Limit (minutes)</label>
                        <span className="text-neon-purple font-bold">{timeLimit}m</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="120" 
                        value={timeLimit}
                        onChange={(e) => setTimeLimit(parseInt(e.target.value))}
                        className="w-full accent-neon-purple"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* List of Sites */}
          <div className="space-y-3">
            {loading ? (
              <div className="text-center py-10 text-gray-500">Loading your blocked list...</div>
            ) : sites.length === 0 ? (
              <div className="text-center py-10 bg-white/5 rounded-3xl border border-dashed border-white/10">
                <p className="text-gray-500">Your block list is empty. Add a site to stay focused!</p>
              </div>
            ) : sites.map((site) => (
              <motion.div 
                layout
                key={site._id}
                className="glass-effect p-5 rounded-2xl flex items-center justify-between border border-white/5 hover:border-white/20 transition-all group"
              >
                <div className="flex items-center space-x-5">
                  <div className="p-3 bg-white/5 rounded-xl">
                    {getModeIcon(site.mode)}
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">{site.url}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      {site.mode === 'timer' ? `Time limit: ${site.timeLimit}m` : site.mode.toUpperCase()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => removeSite(site._id)}
                    className="p-3 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-effect p-8 rounded-3xl border border-neon-purple/20 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-neon-purple/20 rounded-lg">
                <FiSettings className="text-neon-purple" />
              </div>
              <h3 className="text-xl font-bold">Blocker Status</h3>
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                <span className="text-sm font-medium">Protection</span>
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black rounded-full border border-emerald-500/20">
                  ACTIVE
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Daily Savings</span>
                  <span>45m saved</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-neon-purple to-neon-pink w-3/4 h-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-effect p-8 rounded-3xl border border-neon-pink/20 shadow-lg relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <FiShield className="text-6xl text-neon-pink" />
             </div>
            <h3 className="text-xl font-bold mb-2">Panic Button</h3>
            <p className="text-xs text-gray-400 mb-6">
              Need urgent access? Unlocking all sites will result in a 24-hour streak freeze.
            </p>
            <button className="w-full py-4 bg-neon-pink text-black font-black rounded-2xl hover:shadow-[0_0_25px_rgba(255,0,128,0.4)] transition-all transform active:scale-95">
              UNLOCK ALL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppBlocker;
