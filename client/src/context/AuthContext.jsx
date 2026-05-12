import React, { createContext, useContext, useState, useEffect } from 'react';
import { userAPI } from '../api/axios';
import io from 'socket.io-client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile();
      const newSocket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');
      setSocket(newSocket);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await userAPI.getProfile();
      setUser(response.data.user);
      // Broadcast token to extension
      const token = localStorage.getItem('token');
      window.postMessage({ type: 'FOCUSVERSE_TOKEN', token }, "*");
    } catch (error) {
      console.error('Error fetching profile:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    setUser(userData);
    window.postMessage({ type: 'FOCUSVERSE_TOKEN', token }, "*");
    const newSocket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');
    setSocket(newSocket);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    socket?.disconnect();
  };

  const updateUser = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      updateUser,
      socket
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
