import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { leaderboardAPI } from '../api/axios';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchLeaderboard();
  }, [page]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const response = await leaderboardAPI.getLeaderboard(page);
      setUsers(response.data.users);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMedalEmoji = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="min-h-screen bg-gradient-cyber p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold mb-2">🏆 Global Leaderboard</h1>
          <p className="text-gray-400">Top performers from the FocusVerse community</p>
        </motion.div>

        {loading ? (
          <div className="text-center text-gray-400">Loading leaderboard...</div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {users.map((user, index) => (
                <motion.div
                  key={user._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`glass-effect rounded-xl p-4 flex items-center justify-between ${
                    index < 3 ? 'neon-glow' : ''
                  } hover:border-neon-purple transition-all`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-bold w-12 text-center">
                      {getMedalEmoji(index + 1 + (page - 1) * 10)}
                    </div>
                    <div>
                      <p className="font-bold text-lg">{user.username}</p>
                      <p className="text-sm text-gray-400">Lvl. {user.avatar?.level || 1}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-neon-cyan">{Math.floor(user.stats?.totalXp || 0)}</p>
                    <p className="text-sm text-gray-400">XP</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-6 py-2 bg-neon-purple rounded-lg disabled:opacity-50 font-semibold hover:bg-neon-pink transition-colors"
              >
                ← Previous
              </button>
              <span className="flex items-center text-gray-400">
                Page {pagination?.page || 1} of {pagination?.pages || 1}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page >= (pagination?.pages || 1)}
                className="px-6 py-2 bg-neon-purple rounded-lg disabled:opacity-50 font-semibold hover:bg-neon-pink transition-colors"
              >
                Next →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
