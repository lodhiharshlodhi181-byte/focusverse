import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-cyber flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl"
      >
        {/* Hero Emoji */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-8xl mb-6"
        >
          😊
        </motion.div>

        {/* Title */}
        <h1 className="text-6xl md:text-7xl font-bold mb-4">
          <span className="bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan bg-clip-text text-transparent">
            FocusVerse
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-2xl text-gray-300 mb-4">
          Your digital habits shape your virtual companion
        </p>

        {/* Description */}
        <p className="text-lg text-gray-400 mb-12 leading-relaxed">
          Track productivity with an anime avatar that reflects your focus level. Climb the leaderboard, 
          maintain streaks, and compete with friends while building better digital habits.
        </p>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {[
            { icon: '⚙️', title: 'Smart Tracking', desc: 'AI-powered productivity analysis' },
            { icon: '🎮', title: 'Anime Avatar', desc: 'Your digital companion evolves with you' },
            { icon: '🏆', title: 'Global Leaderboard', desc: 'Compete with the community' }
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="glass-effect rounded-lg p-6"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/register')}
            className="px-8 py-3 bg-gradient-neon rounded-lg font-bold text-black text-lg hover:shadow-lg"
          >
            Get Started 🚀
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
            className="px-8 py-3 border-2 border-neon-purple rounded-lg font-bold text-neon-purple hover:bg-neon-purple/10"
          >
            Login 👤
          </motion.button>
        </motion.div>

        {/* Stats Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-16 glass-effect rounded-lg p-8 inline-block"
        >
          <h3 className="font-bold mb-4">Join thousands of focused users</h3>
          <div className="grid grid-cols-3 gap-8">
            <div>
              <p className="text-3xl font-bold text-neon-purple">10K+</p>
              <p className="text-gray-400">Active Users</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-neon-pink">500K+</p>
              <p className="text-gray-400">Focus Minutes</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-neon-cyan">1M+</p>
              <p className="text-gray-400">Total XP Earned</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
