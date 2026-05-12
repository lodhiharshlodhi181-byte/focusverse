import React, { useState, useEffect } from 'react';
import { registerPlugin, Capacitor } from '@capacitor/core';
import { motion } from 'framer-motion';
import { FiMonitor, FiShield, FiCheckCircle, FiAlertCircle, FiDownload } from 'react-icons/fi';

const ScreenTimePlugin = registerPlugin('ScreenTime');

const ScreenTime = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [hasOverlayPermission, setHasOverlayPermission] = useState(false);
  const [loading, setLoading] = useState(true);
  const isNative = Capacitor.isNativePlatform();

  const checkPermission = async () => {
    if (!isNative) {
      setLoading(false);
      return;
    }
    try {
      const { granted: usageGranted } = await ScreenTimePlugin.checkPermission();
      const { granted: overlayGranted } = await ScreenTimePlugin.checkOverlayPermission();
      setHasPermission(usageGranted);
      setHasOverlayPermission(overlayGranted);
    } catch (err) {
      console.warn('Native ScreenTimePlugin not found, expected in browser.');
    } finally {
      setLoading(false);
    }
  };

  const requestPermission = async () => {
    if (!isNative) {
      alert('This feature only works inside the FocusVerse Mobile App! Please download the APK.');
      return;
    }
    try {
      await ScreenTimePlugin.requestPermission();
    } catch (err) {
      console.error('Error requesting permission:', err);
    }
  };

  const requestOverlayPermission = async () => {
    if (!isNative) {
      alert('Display over other apps can only be enabled on a mobile device.');
      return;
    }
    try {
      await ScreenTimePlugin.requestOverlayPermission();
    } catch (err) {
      console.error('Error requesting overlay permission:', err);
    }
  };

  useEffect(() => {
    checkPermission();
    window.addEventListener('focus', checkPermission);
    return () => window.removeEventListener('focus', checkPermission);
  }, []);

  if (loading) return <div className="p-8 text-center text-white">Checking permissions...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <header>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
          Mobile Shield & Screen Time
        </h1>
        <p className="text-gray-400 mt-2">Manage app usage and blocking modes on your phone.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-effect rounded-3xl p-8 border border-white/10 flex flex-col items-center text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${hasPermission ? 'bg-emerald-500/20' : 'bg-amber-500/20'}`}>
            {hasPermission ? <FiCheckCircle className="text-emerald-500 text-2xl" /> : <FiAlertCircle className="text-amber-500 text-2xl" />}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Usage Access</h3>
          <p className="text-xs text-gray-400 mb-6">Needed to detect which app is running.</p>
          {!hasPermission && (
            <button onClick={requestPermission} className="w-full py-3 bg-neon-purple text-white rounded-xl font-bold text-sm">
              Enable Now
            </button>
          )}
        </div>

        <div className="glass-effect rounded-3xl p-8 border border-white/10 flex flex-col items-center text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${hasOverlayPermission ? 'bg-emerald-500/20' : 'bg-amber-500/20'}`}>
            {hasOverlayPermission ? <FiCheckCircle className="text-emerald-500 text-2xl" /> : <FiAlertCircle className="text-amber-500 text-2xl" />}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Overlay Permission</h3>
          <p className="text-xs text-gray-400 mb-6">Needed to show the timer on top of apps.</p>
          {!hasOverlayPermission && (
            <button onClick={requestOverlayPermission} className="w-full py-3 bg-neon-pink text-white rounded-xl font-bold text-sm">
              Enable Now
            </button>
          )}
        </div>
      </div>

      <div className="glass-effect rounded-3xl p-8 border border-white/10 text-center">
        {!isNative ? (
          <div className="space-y-4">
            <div className="text-amber-500 font-bold flex items-center justify-center gap-2">
              <FiAlertCircle /> Running in Browser Mode
            </div>
            <p className="text-sm text-gray-400">
              Mobile tracking can only be enabled inside our <strong>Android App</strong>. 
              Please install the FocusVerse APK to activate these features.
            </p>
            <button className="flex items-center gap-2 mx-auto px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-xs font-bold transition-all border border-white/10">
              <FiDownload /> Download Mobile App
            </button>
          </div>
        ) : hasPermission && hasOverlayPermission ? (
          <div className="text-emerald-500 font-bold flex items-center justify-center gap-2">
            <FiCheckCircle /> Mobile Shield is fully active!
          </div>
        ) : (
          <div className="text-amber-500 text-sm">
            Please enable both permissions to activate the Mobile Blocker & Timer.
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <FiShield className="text-blue-500 text-xl" />
            <h3 className="text-white font-bold">Privacy First</h3>
          </div>
          <p className="text-sm text-gray-400">
            We only track the duration of app usage. No private data or content within apps is ever collected.
          </p>
        </div>
        <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <FiMonitor className="text-purple-500 text-xl" />
            <h3 className="text-white font-bold">Automatic Sync</h3>
          </div>
          <p className="text-sm text-gray-400">
            Mobile screen time is automatically synced with your desktop dashboard for a complete overview.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScreenTime;
