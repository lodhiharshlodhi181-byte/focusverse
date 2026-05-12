import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { TrendingUp, Clock, Target, Zap } from 'lucide-react';
import { statsAPI } from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Analytics = () => {
  const { user } = useAuth();
  const [period, setPeriod] = useState('weekly');
  const [data, setData] = useState({ chart: [], breakdown: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await statsAPI.getAnalyticsData(period);
      if (res.data.success) {
        // Transform chartData object to array
        const chartArray = Object.entries(res.data.chartData).map(([date, values]) => ({
          day: date.split('-').slice(1).join('/'), // mm/dd format
          focus: Math.round(values.productive),
          nonProductive: Math.round(values.distraction)
        })).sort((a, b) => a.day.localeCompare(b.day));

        // Transform breakdown to array
        const total = Object.values(res.data.breakdown).reduce((a, b) => a + b, 0) || 1;
        const breakdownArray = [
          { name: 'Productive', value: Math.round((res.data.breakdown.productive / total) * 100), color: '#00f2ff' },
          { name: 'Social', value: Math.round((res.data.breakdown.social / total) * 100), color: '#ff007f' },
          { name: 'Entertainment', value: Math.round((res.data.breakdown.entertainment / total) * 100), color: '#bf00ff' },
          { name: 'Others', value: Math.round((res.data.breakdown.other / total) * 100), color: '#39ff14' },
        ];

        setData({ chart: chartArray, breakdown: breakdownArray, totalTime: total });
      }
    } catch (err) {
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatTotalTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    return `${h}h`;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-end"
      >
        <div>
          <h1 className="text-4xl font-black mb-2 tracking-tight">Performance <span className="text-neon-pink">Analytics</span></h1>
          <p className="text-gray-400 font-medium">Real-time deep dive into your digital behavior.</p>
        </div>
        <div className="flex space-x-2 bg-white/5 p-1 rounded-xl border border-white/10">
          <button 
            onClick={() => setPeriod('weekly')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${period === 'weekly' ? 'bg-neon-purple text-white shadow-[0_0_15px_rgba(191,0,255,0.4)]' : 'text-gray-500 hover:text-white'}`}
          >
            WEEKLY
          </button>
          <button 
            onClick={() => setPeriod('monthly')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${period === 'monthly' ? 'bg-neon-purple text-white shadow-[0_0_15px_rgba(191,0,255,0.4)]' : 'text-gray-500 hover:text-white'}`}
          >
            MONTHLY
          </button>
        </div>
      </motion.div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Focus', value: `${Math.round(user?.stats?.totalFocus || 0)}m`, icon: <Clock />, color: 'text-neon-cyan' },
          { label: 'Longest Streak', value: `${user?.stats?.longestStreak || 0} Days`, icon: <TrendingUp />, color: 'text-neon-pink' },
          { label: 'Goal Progress', value: `${Math.round(user?.stats?.weeklyChallenge?.progress || 0)}m`, icon: <Target />, color: 'text-neon-green' },
          { label: 'Total XP', value: `${user?.stats?.totalXp || 0}`, icon: <Zap />, color: 'text-neon-purple' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-effect p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all"
          >
            <div className={`p-2 w-10 h-10 rounded-lg bg-white/5 ${stat.color} mb-4 flex items-center justify-center`}>
              {stat.icon}
            </div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
            <h3 className="text-2xl font-black mt-1">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Focus Trend Chart */}
        <div className="lg:col-span-2 glass-effect p-8 rounded-3xl border border-white/5 min-h-[400px]">
          <h3 className="text-xl font-bold mb-8 flex items-center">
            <span className="w-2 h-6 bg-neon-purple rounded-full mr-3"></span>
            Focus Trend (mins)
          </h3>
          <div className="h-[300px] w-full">
            {loading ? (
              <div className="h-full flex items-center justify-center text-gray-500 animate-pulse">Calculating trends...</div>
            ) : data.chart.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-500 italic">Not enough data for this period yet.</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.chart}>
                  <defs>
                    <linearGradient id="colorFocus" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00f2ff" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorDistract" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff007f" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ff007f" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="day" stroke="#ffffff50" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#ffffff50" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0a0a0c', border: '1px solid #ffffff20', borderRadius: '12px' }}
                    itemStyle={{ fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="focus" stroke="#00f2ff" strokeWidth={3} fillOpacity={1} fill="url(#colorFocus)" />
                  <Area type="monotone" dataKey="nonProductive" stroke="#ff007f" strokeWidth={3} fillOpacity={1} fill="url(#colorDistract)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Category Usage Breakdown */}
        <div className="glass-effect p-8 rounded-3xl border border-white/5 flex flex-col min-h-[400px]">
          <h3 className="text-xl font-bold mb-8">Usage Breakdown</h3>
          <div className="flex-1 h-[200px] relative">
            {loading ? (
              <div className="h-full flex items-center justify-center text-gray-500 animate-pulse">Syncing...</div>
            ) : (
              <>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.breakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {data.breakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <p className="text-xs text-gray-500 font-bold uppercase">{period}</p>
                  <p className="text-xl font-black">{formatTotalTime(data.totalTime)}</p>
                </div>
              </>
            )}
          </div>
          <div className="space-y-3 mt-6">
            {data.breakdown.map((cat, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: cat.color }}></div>
                  <span className="text-xs font-bold text-gray-400">{cat.name}</span>
                </div>
                <span className="text-xs font-mono font-bold">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
