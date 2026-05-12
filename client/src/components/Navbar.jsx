import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gradient-cyber border-b border-neon-purple/30 sticky top-0 z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('/dashboard')}
          className="text-2xl font-bold bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent"
        >
          FocusVerse
        </motion.button>

        {user ? (
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-300 hover:text-neon-cyan transition-colors"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate('/leaderboard')}
              className="text-gray-300 hover:text-neon-cyan transition-colors"
            >
              Leaderboard
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-neon-purple/30">
              <span className="text-sm text-neon-cyan">{user.username}</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="px-4 py-1 bg-neon-purple rounded-lg text-sm font-semibold hover:bg-neon-pink transition-colors"
              >
                Logout
              </motion.button>
            </div>
          </div>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/login')}
              className="text-gray-300 hover:text-neon-cyan transition-colors"
            >
              Login
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/register')}
              className="px-4 py-1 bg-neon-purple rounded-lg font-semibold hover:bg-neon-pink transition-colors"
            >
              Register
            </motion.button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
