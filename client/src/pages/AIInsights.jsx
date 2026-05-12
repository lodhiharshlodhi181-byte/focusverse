import React from 'react';
import { motion } from 'framer-motion';

const AIInsights = () => {
  const insights = [
    { id: 1, type: 'warning', title: 'Mindless Scrolling Detected', desc: 'You spent 28 minutes on Reels/Shorts in the last hour. Want to switch to Focus Mode?', icon: '⚠️' },
    { id: 2, type: 'success', title: 'Deep Work Master', desc: 'Your focus session on "Coding" was highly efficient. Level up your Avatar!', icon: '🏆' },
    { id: 3, type: 'info', title: 'Productivity Tip', desc: 'Users like you are 20% more productive after a 5-minute break now.', icon: '💡' },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">AI <span className="bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">Insights</span></h1>
        <p className="text-gray-400">Our AI analyzes your digital habits to provide real-time coaching.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="glass-effect p-8 rounded-3xl border border-neon-purple/30 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-4">Habit Analysis</h3>
            <p className="text-gray-400 text-sm mb-6">"Your dopamine-driven scrolling peaks between 2 PM and 4 PM. We suggest scheduling a 15-minute meditation then."</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-neon-purple uppercase tracking-widest">AI Confidence: 94%</span>
          </div>
        </div>

        <div className="glass-effect p-8 rounded-3xl border border-neon-cyan/30">
          <h3 className="text-2xl font-bold mb-4">Productivity Score</h3>
          <div className="flex items-end space-x-4 mb-4">
            <span className="text-6xl font-black text-white">82</span>
            <span className="text-neon-cyan text-xl font-bold mb-2">/ 100</span>
          </div>
          <p className="text-xs text-gray-500 uppercase tracking-tighter">↑ 12% higher than yesterday</p>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-6 uppercase tracking-widest text-gray-500">Live Feed</h2>
      <div className="space-y-4">
        {insights.map((insight) => (
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            key={insight.id}
            className={`p-6 rounded-2xl border flex items-start space-x-6 transition-all hover:scale-[1.01] ${
              insight.type === 'warning' ? 'bg-red-500/10 border-red-500/30' : 
              insight.type === 'success' ? 'bg-green-500/10 border-green-500/30' : 
              'bg-neon-cyan/10 border-neon-cyan/30'
            }`}
          >
            <span className="text-3xl">{insight.icon}</span>
            <div>
              <h4 className="text-xl font-bold mb-1">{insight.title}</h4>
              <p className="text-gray-300 text-sm">{insight.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AIInsights;
