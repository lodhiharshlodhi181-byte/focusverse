import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { socialAPI } from '../api/axios';
import { FiUserPlus, FiCheck, FiX, FiSearch, FiZap, FiMessageSquare } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Friends = () => {
  const { user } = useAuth();
  const [friends, setFriends] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSocialData();
  }, []);

  const loadSocialData = async () => {
    try {
      const [friendsRes, requestsRes] = await Promise.all([
        socialAPI.getFriends(),
        socialAPI.getRequests()
      ]);
      setFriends(friendsRes.data.friends || []);
      setIncomingRequests(requestsRes.data.incoming || []);
      setOutgoingRequests(requestsRes.data.outgoing || []);
    } catch (err) {
      console.error('Error loading social data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (q.length > 2) {
      try {
        const res = await socialAPI.searchUsers(q);
        setSearchResults(res.data.users);
      } catch (err) {
        console.error('Search failed:', err);
      }
    } else {
      setSearchResults([]);
    }
  };

  const sendRequest = async (userId) => {
    try {
      await socialAPI.sendRequest(userId);
      loadSocialData();
      setIsSearchOpen(false);
      alert('✅ Request sent!');
    } catch (err) {
      alert(err.response?.data?.message || 'Error sending request');
    }
  };

  const respondRequest = async (requestId, status) => {
    try {
      await socialAPI.respondToRequest(requestId, status);
      loadSocialData();
    } catch (err) {
      console.error('Error responding:', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Social <span className="text-neon-cyan">Hub</span></h1>
          <p className="text-gray-400">Connect, compete, and stay focused together.</p>
        </div>
        <button 
          onClick={() => setIsSearchOpen(true)}
          className="bg-neon-cyan/20 border border-neon-cyan/50 text-neon-cyan px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-neon-cyan hover:text-black transition-all"
        >
          <FiUserPlus /> ADD NEW
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Friends List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative mb-6">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="Filter your friends..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-neon-cyan transition-all"
            />
          </div>

          <div className="space-y-4">
            {loading ? (
              <p className="text-center text-gray-500 py-10">Loading friends...</p>
            ) : friends.length === 0 ? (
              <div className="text-center py-12 bg-white/5 rounded-3xl border border-dashed border-white/10">
                <p className="text-gray-500">No friends yet. Start adding focus partners!</p>
              </div>
            ) : friends.map(friend => (
              <motion.div 
                layout
                key={friend._id}
                className="glass-effect p-6 rounded-3xl border border-white/5 flex items-center justify-between group hover:border-neon-cyan/30 transition-all"
              >
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-cyber rounded-2xl flex items-center justify-center text-2xl">
                      {friend.username ? friend.username[0].toUpperCase() : '?'}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-[#0a0a0c] ${friend.isOnline ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-gray-600'}`}></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{friend.username}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs px-2 py-0.5 bg-neon-purple/20 text-neon-purple font-black rounded-md border border-neon-purple/20 uppercase">
                        LV.{friend.stats?.level || 1}
                      </span>
                      <span className="text-xs text-gray-400">{friend.stats?.totalXp || 0} XP</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-4 bg-white/5 rounded-2xl text-gray-400 hover:text-neon-cyan hover:bg-neon-cyan/10 transition-all">
                    <FiMessageSquare />
                  </button>
                  <button className="p-4 bg-white/5 rounded-2xl text-gray-400 hover:text-neon-purple hover:bg-neon-purple/10 transition-all">
                    <FiZap />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Requests & Challenges */}
        <div className="space-y-6">
          {/* Friend Requests */}
          <div className="glass-effect p-6 rounded-3xl border border-white/10">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
               Requests <span className="bg-neon-cyan text-black text-[10px] px-2 py-0.5 rounded-full font-black">{incomingRequests.length}</span>
            </h3>
            
            <div className="space-y-4">
              {incomingRequests.length === 0 && (
                <p className="text-xs text-gray-500 text-center py-4 italic">No pending requests</p>
              )}
              {incomingRequests.map(req => (
                <div key={req._id} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm">{req.sender?.username || 'Unknown'}</p>
                    <p className="text-[10px] text-gray-500">Streak: {req.sender?.stats?.currentStreak || 0}d</p>
                  </div>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => respondRequest(req._id, 'accepted')}
                      className="p-2 bg-emerald-500/20 text-emerald-500 rounded-lg hover:bg-emerald-500 hover:text-white transition-all"
                    >
                      <FiCheck />
                    </button>
                    <button 
                      onClick={() => respondRequest(req._id, 'rejected')}
                      className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                    >
                      <FiX />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {outgoingRequests.length > 0 && (
               <div className="mt-8 pt-6 border-t border-white/5">
                 <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Outgoing</p>
                 <div className="space-y-3">
                   {outgoingRequests.map(req => (
                     <div key={req._id} className="flex items-center justify-between opacity-60">
                        <span className="text-sm">{req.recipient?.username || 'Unknown'}</span>
                        <span className="text-[10px] text-gray-500 italic">Pending...</span>
                     </div>
                   ))}
                 </div>
               </div>
            )}
          </div>

          {/* Online Friends for 1v1 */}
          <div className="glass-effect p-6 rounded-3xl border border-neon-purple/20">
            <h3 className="text-xl font-bold mb-4">Quick Challenge</h3>
            <div className="space-y-4">
              {friends.filter(f => f.isOnline).length === 0 ? (
                <div className="p-4 bg-white/5 rounded-2xl text-center">
                  <p className="text-xs text-gray-500">No friends online for 1v1 right now</p>
                </div>
              ) : (
                friends.filter(f => f.isOnline).map(friend => (
                  <div key={friend._id} className="p-4 bg-white/5 rounded-2xl border border-neon-purple/20 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-bold">{friend.username}</span>
                      </div>
                      <span className="text-[10px] text-neon-purple font-black uppercase">Battle Ready</span>
                    </div>
                    <button className="w-full py-3 bg-neon-purple text-white font-bold rounded-xl text-sm hover:shadow-[0_0_20px_rgba(191,0,255,0.4)] transition-all">
                      CHALLENGE {friend.username.toUpperCase()}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-[#0a0a0c] border border-white/10 w-full max-w-md rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Find Partners</h3>
                <button onClick={() => setIsSearchOpen(false)} className="text-gray-500 hover:text-white"><FiX size={24} /></button>
              </div>
              
              <div className="relative mb-6">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Type username..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-neon-cyan transition-all"
                />
              </div>

              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {searchResults.map(u => (
                  <div key={u._id} className="p-4 bg-white/5 rounded-2xl flex items-center justify-between border border-white/5">
                    <div>
                      <p className="font-bold">{u.username}</p>
                      <p className="text-[10px] text-gray-400">LV.{u.stats?.level || 1} • {u.stats?.totalXp || 0} XP</p>
                    </div>
                    <button 
                      onClick={() => sendRequest(u._id)}
                      className="p-2 bg-neon-cyan/20 text-neon-cyan rounded-xl hover:bg-neon-cyan hover:text-black transition-all"
                    >
                      <FiUserPlus />
                    </button>
                  </div>
                ))}
                {searchQuery.length > 2 && searchResults.length === 0 && (
                  <p className="text-center text-gray-500 py-4">No users found</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Friends;
