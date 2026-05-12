import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { statsAPI } from '../api/axios';

const Timer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('focus'); // focus, shortBreak, longBreak

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(async () => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
            
            // Record activity if focus mode complete
            if (mode === 'focus') {
              try {
                await statsAPI.recordActivity({
                  website: 'FocusTimer',
                  category: 'productive',
                  timeSpent: 25 * 60, // 25 minutes in seconds
                  scrollSpeed: 0
                });
              } catch (err) {
                console.error('Error recording focus session:', err);
              }
            }
            
            alert(`${mode === 'focus' ? 'Focus' : 'Break'} session complete!`);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, mode]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    if (mode === 'focus') setMinutes(25);
    else if (mode === 'shortBreak') setMinutes(5);
    else setMinutes(15);
    setSeconds(0);
  };

  const changeMode = (newMode) => {
    setMode(newMode);
    setIsActive(false);
    if (newMode === 'focus') setMinutes(25);
    else if (newMode === 'shortBreak') setMinutes(5);
    else setMinutes(15);
    setSeconds(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-effect p-12 rounded-3xl neon-glow text-center max-w-md w-full"
      >
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent uppercase tracking-widest">
          {mode === 'focus' ? 'Deep Work' : 'Break Time'}
        </h1>

        <div className="flex space-x-4 mb-8 justify-center">
          <button 
            onClick={() => changeMode('focus')}
            className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${mode === 'focus' ? 'bg-neon-purple text-white' : 'text-gray-400 hover:text-white'}`}
          >
            FOCUS
          </button>
          <button 
            onClick={() => changeMode('shortBreak')}
            className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${mode === 'shortBreak' ? 'bg-neon-cyan text-black' : 'text-gray-400 hover:text-white'}`}
          >
            SHORT BREAK
          </button>
        </div>

        <div className="text-8xl font-black mb-8 text-white tabular-nums drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>

        <div className="flex space-x-4 justify-center">
          <button 
            onClick={toggleTimer}
            className={`px-10 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 active:scale-95 ${isActive ? 'bg-red-500/20 text-red-500 border border-red-500' : 'bg-neon-purple text-white shadow-[0_0_20px_rgba(191,0,255,0.4)]'}`}
          >
            {isActive ? 'PAUSE' : 'START FOCUS'}
          </button>
          <button 
            onClick={resetTimer}
            className="p-4 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-all"
          >
            🔄
          </button>
        </div>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
        <div className="glass-effect p-6 rounded-xl border border-white/5 text-center">
          <p className="text-gray-400 text-sm mb-1">Sessions Today</p>
          <p className="text-2xl font-bold text-neon-cyan">4</p>
        </div>
        <div className="glass-effect p-6 rounded-xl border border-white/5 text-center">
          <p className="text-gray-400 text-sm mb-1">Total Focus</p>
          <p className="text-2xl font-bold text-neon-purple">100m</p>
        </div>
        <div className="glass-effect p-6 rounded-xl border border-white/5 text-center">
          <p className="text-gray-400 text-sm mb-1">Daily Goal</p>
          <p className="text-2xl font-bold text-neon-pink">80%</p>
        </div>
      </div>
    </div>
  );
};

export default Timer;
