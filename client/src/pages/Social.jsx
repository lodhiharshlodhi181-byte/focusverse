import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Social = () => {
  const [friends, setFriends] = useState([
    { id: 1, name: 'Aman', productivity: 92, streak: 15, avatar: 'energetic' },
    { id: 2, name: 'Riya', productivity: 85, streak: 8, avatar: 'happy' },
    { id: 3, name: 'Sahil', productivity: 45, streak: 3, avatar: 'tired' },
  ]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-bold mb-2">Social <span className="text-neon-cyan">Hub</span></h1>
          <p className="text-gray-400">Connect with friends and compare your productivity.</p>
        </div>
        <button className="bg-neon-cyan text-black px-6 py-3 rounded-xl font-bold hover:shadow-[0_0_15px_rgba(0,255,255,0.5)] transition-all">
          + ADD FRIEND
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-gray-500">Your Friends</h2>
          {friends.map((friend) => (
            <motion.div 
              whileHover={{ x: 10 }}
              key={friend.id}
              className="glass-effect p-6 rounded-2xl flex items-center justify-between border border-white/5"
            >
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-purple/20 to-neon-pink/20 flex items-center justify-center border border-white/10 text-3xl">
                  {friend.avatar === 'energetic' ? '⚡' : friend.avatar === 'happy' ? '😊' : '😴'}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{friend.name}</h3>
                  <p className="text-xs text-neon-cyan uppercase font-bold tracking-tighter">🔥 {friend.streak} Day Streak</p>
                </div>
              </div>

              <div className="flex items-center space-x-12">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1 uppercase">Productivity</p>
                  <p className="text-2xl font-black text-white">{friend.productivity}%</p>
                </div>
                <button className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all border border-white/5">
                  ⚔️ CHALLENGE
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-8">
          <div className="glass-effect p-8 rounded-3xl border border-neon-cyan/20">
            <h3 className="text-2xl font-bold mb-6">Compare Stats</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span>Your Productivity</span>
                  <span className="text-neon-purple">88%</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-neon-purple w-[88%] h-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span>Friends Average</span>
                  <span className="text-neon-cyan">74%</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-neon-cyan w-[74%] h-full"></div>
                </div>
              </div>
              <p className="text-xs text-center text-gray-400 mt-4 italic">"You are 14% more productive than your friends today! Keep it up."</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-neon-purple/20 to-neon-pink/20 p-8 rounded-3xl border border-white/10">
            <h3 className="text-xl font-bold mb-4">Daily Battle</h3>
            <p className="text-sm text-gray-300 mb-6">Most focus time in the next 2 hours wins a Rare Badge!</p>
            <button className="w-full py-4 bg-white text-black font-black rounded-xl hover:bg-gray-200 transition-all">
              JOIN BATTLE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Social;
