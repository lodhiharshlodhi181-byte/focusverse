import React from 'react';
import { motion } from 'framer-motion';
import avatarImg from '../assets/avatar.png';

const Avatar = ({ 
  productivity = 0, 
  focusTime = 0, 
  scrollAddiction = 0,
  level = 1 
}) => {
  // HealthScore=(0.5×ProductivityScore)+(0.3×FocusTime)−(0.2×ScrollAddiction)
  // Normalized to 0-100
  const health = Math.max(0, Math.min(100, (0.5 * productivity) + (0.3 * (focusTime / 60)) - (0.2 * scrollAddiction)));

  const getExpression = () => {
    if (productivity > 80 && scrollAddiction < 20) return 'energetic';
    if (scrollAddiction > 70 || (productivity < 30 && scrollAddiction > 40)) return 'tired';
    if (health > 70) return 'happy';
    if (health > 40) return 'neutral';
    return 'sick';
  };

  const expression = getExpression();

  const expressions = {
    happy: '😊',
    tired: '😴',
    sick: '🤒',
    energetic: '⚡',
    neutral: '😐'
  };

  const colors = {
    happy: 'from-yellow-400 to-orange-400 shadow-[0_0_20px_rgba(251,191,36,0.5)]',
    tired: 'from-blue-400 to-indigo-400 shadow-[0_0_20px_rgba(96,165,250,0.5)] grayscale-[0.3]',
    sick: 'from-red-400 to-pink-400 shadow-[0_0_20px_rgba(248,113,113,0.5)] grayscale-[0.6]',
    energetic: 'from-green-400 to-cyan-400 shadow-[0_0_40px_rgba(74,222,128,0.8)] border-2 border-neon-cyan/50',
    neutral: 'from-purple-400 to-pink-400 shadow-[0_0_20px_rgba(192,132,252,0.5)]'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Avatar Container */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-40 h-40"
      >
        {/* Glow Effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${colors[expression]} rounded-full blur-2xl opacity-50 animate-pulse`}></div>

        {/* Avatar Circle */}
        <div className={`absolute inset-0 bg-gradient-to-br ${colors[expression]} rounded-full p-1 glass-effect overflow-hidden`}>
          <div className="w-full h-full rounded-full bg-gradient-cyber flex items-center justify-center relative">
              {/* Energetic Particles */}
              {expression === 'energetic' && (
                <div className="absolute inset-0 overflow-hidden rounded-full">
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-neon-cyan/20 to-transparent animate-pulse"></div>
                </div>
              )}
              
              <motion.img
                src={avatarImg}
                alt="Avatar"
                className={`w-32 h-32 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] 
                  ${expression === 'tired' ? 'brightness-75 opacity-80' : ''} 
                  ${expression === 'sick' ? 'brightness-50 grayscale' : ''}
                  ${expression === 'energetic' ? 'brightness-110 drop-shadow-[0_0_20px_rgba(0,255,255,0.6)]' : ''}
                `}
                animate={{ 
                  scale: expression === 'energetic' ? [1, 1.1, 1] : [1, 1.05, 1],
                  rotate: expression === 'tired' ? [0, 1, -1, 0] : [0, 2, -2, 0],
                  y: expression === 'tired' ? [0, 2, 0] : [0, -10, 0]
                }}
                transition={{ 
                  duration: expression === 'energetic' ? 1.5 : 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
          </div>
        </div>

        {/* Level Badge */}
        <div className="absolute -bottom-2 -right-2 bg-neon-purple rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-lg neon-glow">
          Lv.{level}
        </div>
      </motion.div>

      {/* Health Bar */}
      <div className="w-full max-w-xs">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-300">Health</span>
          <span className="text-neon-cyan">{Math.round(health)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${health}%` }}
            transition={{ duration: 0.5 }}
            className="health-bar"
          ></motion.div>
        </div>
      </div>

      {/* Status Text */}
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-sm text-neon-cyan"
      >
        {expression === 'happy' && '✨ Keep it up!'}
        {expression === 'tired' && '😴 Time to rest'}
        {expression === 'sick' && '🤒 Need motivation'}
        {expression === 'energetic' && '⚡ On fire!'}
        {expression === 'neutral' && '😐 Let\'s go'}
      </motion.p>
    </div>
  );
};

export default Avatar;
