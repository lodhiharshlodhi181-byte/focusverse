import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';
import AppBlocker from './pages/AppBlocker';
import AIInsights from './pages/AIInsights';
import Categorization from './pages/Categorization';
import Analytics from './pages/Analytics';
import Friends from './pages/Friends';
import Streaks from './pages/Streaks';
import ScreenTime from './pages/ScreenTime';

import MainLayout from './components/MainLayout';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<><Navbar /><Home /></>} />
          <Route path="/login" element={<><Navbar /><Login /></>} />
          <Route path="/register" element={<><Navbar /><Register /></>} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Leaderboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/blocker"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <AppBlocker />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai-insights"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <AIInsights />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Analytics />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/friends"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Friends />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/categorization"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Categorization />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/streaks"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Streaks />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/screen-time"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <ScreenTime />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
