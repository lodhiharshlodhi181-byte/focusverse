import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { statsAPI } from '../api/axios';
import { 
  FiZap, 
  FiCalendar, 
  FiTrendingUp, 
  FiAward, 
  FiShield, 
  FiClock,
  FiChevronRight
} from 'react-icons/fi';

const Streaks = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await statsAPI.getStats();
        if (res.data.success) {
          setData(res.data.stats);
        }
      } catch (err) {
        console.error('Error fetching streaks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-purple"></div>
      </div>
    );
  }

  const stats = data?.userStats;
  const logs = data?.recentLogs || [];
  const dailyStreak = stats?.currentStreak || 0;
  const weeklyProgress = stats?.weeklyChallenge?.progress || 0;
  const weeklyGoal = stats?.weeklyChallenge?.goal || 1000;
  const noScrollStreak = Math.floor(stats?.noScrollStreak || 0);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
            Your Performance Streaks
          </h1>
          <p className="text-gray-400 mt-2">Maintain your momentum and conquer your goals.</p>
        </div>
        <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
          <div className="p-3 bg-orange-500/20 rounded-xl">
            <FiZap className="text-orange-500 text-2xl" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total XP</p>
            <p className="text-xl font-bold text-white">{Math.floor(stats?.totalXp || 0)}</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Daily Streak Card */}
        <div className="relative group overflow-hidden bg-gradient-to-br from-orange-500/10 to-red-500/10 p-1 rounded-3xl border border-white/5 shadow-2xl">
          <div className="bg-slate-900/90 backdrop-blur-xl p-6 rounded-[calc(1.5rem-1px)] h-full transition-all group-hover:bg-slate-900/70">
            <div className="flex items-start justify-between">
              <div className="p-4 bg-orange-500/20 rounded-2xl">
                <FiZap className="text-orange-500 text-3xl" />
              </div>
              <span className="px-3 py-1 bg-orange-500/10 text-orange-500 text-xs font-bold rounded-full border border-orange-500/20">
                DAILY
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-5xl font-black text-white flex items-baseline gap-2">
                {dailyStreak} <span className="text-xl font-medium text-gray-400">Days</span>
              </h3>
              <p className="text-gray-400 mt-2">Consecutive days of productivity.</p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
              <p className="text-sm text-gray-500">Longest: {stats?.longestStreak || 0} days</p>
              <FiChevronRight className="text-gray-500" />
            </div>
          </div>
        </div>

        {/* Weekly Challenge Card */}
        <div className="relative group overflow-hidden bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-1 rounded-3xl border border-white/5 shadow-2xl">
          <div className="bg-slate-900/90 backdrop-blur-xl p-6 rounded-[calc(1.5rem-1px)] h-full transition-all group-hover:bg-slate-900/70">
            <div className="flex items-start justify-between">
              <div className="p-4 bg-blue-500/20 rounded-2xl">
                <FiTrendingUp className="text-blue-500 text-3xl" />
              </div>
              <span className="px-3 py-1 bg-blue-500/10 text-blue-500 text-xs font-bold rounded-full border border-blue-500/20">
                WEEKLY
              </span>
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-end mb-2">
                <h3 className="text-2xl font-bold text-white">Focus Goal</h3>
                <p className="text-sm text-gray-400">{Math.round(weeklyProgress)} / {weeklyGoal} min</p>
              </div>
              <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-neon-purple to-neon-pink transition-all duration-1000 ease-out"
                  style={{ width: `${Math.min(100, (weeklyProgress / weeklyGoal) * 100)}%` }}
                ></div>
              </div>
              <p className="text-gray-400 mt-4 text-sm">
                {weeklyProgress >= weeklyGoal 
                  ? "🎉 Challenge completed! You're on fire." 
                  : `Only ${Math.max(0, Math.round(weeklyGoal - weeklyProgress))} mins left to hit your goal.`}
              </p>
            </div>
          </div>
        </div>

        {/* No-Scroll Challenge Card */}
        <div className="relative group overflow-hidden bg-gradient-to-br from-emerald-500/10 to-teal-500/10 p-1 rounded-3xl border border-white/5 shadow-2xl">
          <div className="bg-slate-900/90 backdrop-blur-xl p-6 rounded-[calc(1.5rem-1px)] h-full transition-all group-hover:bg-slate-900/70">
            <div className="flex items-start justify-between">
              <div className="p-4 bg-emerald-500/20 rounded-2xl">
                <FiShield className="text-emerald-500 text-3xl" />
              </div>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded-full border border-emerald-500/20">
                ELITE
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-5xl font-black text-white flex items-baseline gap-2">
                {noScrollStreak} <span className="text-xl font-medium text-gray-400">Pts</span>
              </h3>
              <p className="text-gray-400 mt-2">Mindful focus without scrolling.</p>
            </div>
            <div className="mt-8 p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
              <p className="text-xs text-emerald-400 flex items-center gap-2">
                <FiAward /> Earned from low scroll-speed focus sessions.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Achievements Section */}
        <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8 shadow-xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <FiAward className="text-purple-500 text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-white">Upcoming Milestones</h2>
          </div>
          <div className="space-y-6">
            {[
              { label: '7 Day Streak', current: dailyStreak, target: 7, color: 'orange' },
              { label: 'Weekly Master', current: weeklyProgress, target: weeklyGoal, color: 'blue' },
              { label: 'Deep Work King', current: noScrollStreak, target: 50, color: 'emerald' },
            ].map((m, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white font-medium">{m.label}</span>
                  <span className="text-gray-400">{Math.min(100, Math.floor((m.current / m.target) * 100))}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-${m.color}-500 transition-all duration-700`}
                    style={{ width: `${Math.min(100, (m.current / m.target) * 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8 shadow-xl flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <FiClock className="text-blue-500 text-2xl" />
              </div>
              <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
            </div>
            <button 
              onClick={() => setShowHistory(!showHistory)}
              className="text-blue-500 text-sm font-semibold hover:underline"
            >
              {showHistory ? 'Hide' : 'View All'}
            </button>
          </div>
          
          <div className="space-y-4 overflow-y-auto max-h-64 pr-2 custom-scrollbar">
            {logs.length > 0 ? logs.map((log, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${log.category === 'productive' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                  <div>
                    <p className="text-white font-medium text-sm">{log.website}</p>
                    <p className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleTimeString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-sm">{Math.round(log.timeSpent / 60)}m</p>
                  <p className={`text-[10px] uppercase font-black ${log.category === 'productive' ? 'text-emerald-500' : 'text-red-500'}`}>
                    {log.category}
                  </p>
                </div>
              </div>
            )) : (
              <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                <p>No activity recorded yet.</p>
                <p className="text-xs">Start a focus session to see your history!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default Streaks;
