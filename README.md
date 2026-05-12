# FocusVerse - Anime Avatar Productivity Tracker

A web-based productivity tracking application with an interactive anime avatar that reflects your focus level and productivity streak.

## 🎯 Features

- **Anime Avatar System** - Your avatar changes based on productivity levels
- **Dashboard** - Real-time productivity stats and achievements
- **Streak System** - Track consecutive productive days
- **Leaderboard** - Compete with friends globally
- **Friends System** - Connect and compete with others
- **AI Productivity Analysis** - Smart categorization of productive vs non-productive activities
- **Browser Tracking** - Track website usage patterns
- **Health Bar** - Visual representation of productivity health

## 🚀 Tech Stack

- **Frontend**: React.js + Tailwind CSS + Framer Motion
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Real-time**: Socket.io
- **Authentication**: JWT + bcrypt
- **AI/ML**: Python FastAPI (Phase 2)
- **Extension**: Chrome Extension (Phase 2)

## 📁 Project Structure

```
project/
├── client/              # React frontend
│   ├── src/
│   │   ├── pages/      # Page components
│   │   ├── components/ # Reusable components
│   │   ├── avatar/     # Avatar system
│   │   └── context/    # Global state
│   └── package.json
├── server/              # Express backend
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API routes
│   ├── controllers/     # Business logic
│   ├── middleware/     # Auth & utilities
│   └── server.js
├── extension/           # Chrome extension (Phase 2)
└── ai-engine/          # Python AI engine (Phase 2)
```

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- MongoDB local/Atlas
- npm or yarn

### Installation

```bash
# Frontend setup
cd client
npm install
npm run dev

# Backend setup
cd server
npm install
npm run dev

# Create .env file in server/
MONGODB_URI=mongodb://localhost:27017/focusverse
JWT_SECRET=your_secret_key
PORT=5000
```

## 📱 Roadmap

### Phase 1 (MVP)
- ✅ Authentication
- ✅ Avatar system
- ✅ Dashboard
- ✅ Stats page
- ✅ Streaks
- ✅ Leaderboard

### Phase 2
- 🔄 Friends system
- 🔄 Real-time ranking
- 🔄 AI analysis

### Phase 3
- 🔄 Chrome extension
- 🔄 Website tracking
- 🔄 Smart recommendations

## 📧 Contact

Built for Hackathon | Your Digital Habits, Your Virtual Pet
