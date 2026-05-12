import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.register(formData);
      login(response.data.token, response.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-cyber flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass-effect rounded-xl p-8 neon-glow">
          <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
            FocusVerse
          </h1>
          <p className="text-center text-gray-400 mb-8">Create your account</p>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-2 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-neon-cyan">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full bg-gray-900/50 border border-neon-purple/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple"
                placeholder="your_username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-neon-cyan">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-900/50 border border-neon-purple/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-neon-cyan">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-gray-900/50 border border-neon-purple/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-neon-cyan">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-gray-900/50 border border-neon-purple/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple"
                placeholder="••••••••"
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-neon py-2 rounded-lg font-semibold text-black hover:shadow-lg disabled:opacity-50 transition-all"
            >
              {loading ? 'Creating account...' : 'Register'}
            </motion.button>
          </form>

          <p className="text-center text-gray-400 mt-6">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-neon-cyan hover:text-neon-purple transition-colors"
            >
              Login here
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
