import React from 'react';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { TrendingUp, Clock, Target, Zap } from 'lucide-react';

const Analytics = () => {
  const dailyData = [
    { day: 'Mon', focus: 120, nonProductive: 40 },
    { day: 'Tue', focus: 180, nonProductive: 30 },
    { day: 'Wed', focus: 150, nonProductive: 60 },
    { day: 'Thu', focus: 240, nonProductive: 20 },
    { day: 'Fri', focus: 200, nonProductive: 45 },
    { day: 'Sat', focus: 100, nonProductive: 120 },
    { day: 'Sun', focus: 80, nonProductive: 150 },
  ];

  const categoryData = [
    { name: 'Productive', value: 65, color: '#00f2ff' },
    { name: 'Social', value: 20, color: '#ff007f' },
    { name: 'Entertainment', value: 10, color: '#bf00ff' },
    { name: 'Others', value: 5, color: '#39ff14' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-end"
      >
        <div>
          <h1 className="text-4xl font-black mb-2 tracking-tight">Performance <span className="text-neon-pink">Analytics</span></h1>
          <p className="text-gray-400 font-medium">Deep dive into your focus trends and dopamine levels.</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm font-bold hover:bg-white/10 transition-all">WEEKLY</button>
          <button className="bg-neon-purple px-4 py-2 rounded-lg text-sm font-bold hover:shadow-[0_0_15px_rgba(191,0,255,0.5)] transition-all">MONTHLY</button>
        </div>
      </motion.div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Avg Focus', value: '3.5h', icon: <Clock />, color: 'text-neon-cyan' },
          { label: 'Top Streak', value: '12 Days', icon: <TrendingUp />, color: 'text-neon-pink' },
          { label: 'Goal Progress', value: '85%', icon: <Target />, color: 'text-neon-green' },
          { label: 'Productivity', value: '+12%', icon: <Zap />, color: 'text-neon-purple' },
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
        <div className="lg:col-span-2 glass-effect p-8 rounded-3xl border border-white/5">
          <h3 className="text-xl font-bold mb-8 flex items-center">
            <span className="w-2 h-6 bg-neon-purple rounded-full mr-3"></span>
            Focus Trend vs Distractions
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyData}>
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
                <XAxis dataKey="day" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0c', border: '1px solid #ffffff20', borderRadius: '12px' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="focus" stroke="#00f2ff" strokeWidth={3} fillOpacity={1} fill="url(#colorFocus)" />
                <Area type="monotone" dataKey="nonProductive" stroke="#ff007f" strokeWidth={3} fillOpacity={1} fill="url(#colorDistract)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Usage Breakdown */}
        <div className="glass-effect p-8 rounded-3xl border border-white/5 flex flex-col">
          <h3 className="text-xl font-bold mb-8">Usage Breakdown</h3>
          <div className="flex-1 h-[200px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-xs text-gray-500 font-bold uppercase">Today</p>
              <p className="text-xl font-black">7.2h</p>
            </div>
          </div>
          <div className="space-y-3 mt-6">
            {categoryData.map((cat, i) => (
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
