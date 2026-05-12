# FocusVerse Project Structure

```
project/
│
├── README.md                 # Main project documentation
├── QUICKSTART.md            # Quick start guide with API endpoints
├── .env.example             # Environment variables example
├── .gitignore               # Git ignore file
│
├── start.sh / start.bat      # Start all services (frontend + backend)
├── setup.sh / setup.bat      # Automated dependency installation
│
├── 📁 client/               # React Frontend (Vite + Tailwind)
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html
│   │
│   └── src/
│       ├── main.jsx         # Entry point
│       ├── App.jsx          # Main app component
│       ├── index.css        # Global styles + animations
│       │
│       ├── pages/
│       │   ├── Home.jsx     # Landing page
│       │   ├── Login.jsx    # Login page
│       │   ├── Register.jsx # Registration page
│       │   ├── Dashboard.jsx# Main dashboard (Protected)
│       │   └── Leaderboard.jsx # Global leaderboard (Protected)
│       │
│       ├── components/
│       │   ├── Navbar.jsx   # Navigation bar
│       │   └── ProtectedRoute.jsx # Route protection
│       │
│       ├── avatar/
│       │   └── Avatar.jsx   # Avatar display component
│       │
│       ├── context/
│       │   └── AuthContext.jsx # Global auth state
│       │
│       └── api/
│           └── axios.js     # API client configuration
│
├── 📁 server/               # Express Backend + MongoDB
│   ├── package.json
│   ├── server.js            # Main server file
│   ├── .env                 # Environment variables
│   │
│   ├── models/
│   │   ├── User.js          # User schema
│   │   ├── Streak.js        # Streak tracking schema
│   │   └── ProductivityLog.js # Activity logging schema
│   │
│   ├── controllers/
│   │   ├── authController.js    # Auth logic
│   │   ├── userController.js    # User management
│   │   ├── leaderboardController.js # Rankings
│   │   └── statsController.js   # Stats & activity
│   │
│   ├── routes/
│   │   ├── auth.js          # Auth endpoints
│   │   ├── user.js          # User endpoints
│   │   ├── leaderboard.js   # Leaderboard endpoints
│   │   └── stats.js         # Stats endpoints
│   │
│   └── middleware/
│       └── auth.js          # JWT verification
│
├── 📁 extension/            # Chrome Extension (Phase 2)
│   ├── manifest.json        # Extension config
│   ├── background.js        # Background worker
│   ├── content.js           # Content script
│   └── popup.html           # Extension popup (to create)
│
└── 📁 ai-engine/            # Python AI Engine (Phase 2)
    ├── classifier.py        # Website classification AI
    └── avatar_system.py     # Avatar logic system
```

## 🎯 Core Features Implemented

### ✅ Phase 1 (MVP - Complete)
- [x] User Authentication (Register/Login)
- [x] JWT Token Management
- [x] Avatar System with Expressions
- [x] Dashboard with Real-time Stats
- [x] Streak Tracking
- [x] Global Leaderboard
- [x] User Profile Management
- [x] Real-time Updates (Socket.io)
- [x] Responsive UI (Tailwind + Framer Motion)

### 🔄 Phase 2 (In Progress)
- [ ] Chrome Extension Integration
- [ ] Website Tracking & Classification
- [ ] Friends System
- [ ] Friend Requests
- [ ] Real-time Notifications
- [ ] Advanced Analytics

### 📋 Phase 3 (Planned)
- [ ] Mobile App (React Native)
- [ ] Advanced Challenges
- [ ] Social Tournaments
- [ ] Premium Features
- [ ] Advanced Customization

## 🚀 Quick Setup

### 1. Prerequisites
```bash
# Download and install:
- Node.js v16+ (https://nodejs.org/)
- MongoDB (https://www.mongodb.com/try/download/community)
# Or use MongoDB Atlas (cloud)
```

### 2. Clone & Install
```bash
cd project
bash setup.sh  # Linux/Mac
# OR
setup.bat     # Windows
```

### 3. Start Services
```bash
bash start.sh  # Linux/Mac
# OR
start.bat     # Windows

# Open browser: http://localhost:3000
```

## 📊 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  username: String,
  email: String,
  password: String (hashed),
  avatar: {
    expression: String (happy|tired|sick|energetic|neutral),
    level: Number,
    health: Number (0-100),
    name: String
  },
  stats: {
    totalFocus: Number,
    currentStreak: Number,
    longestStreak: Number,
    totalXp: Number,
    productiveHours: Number,
    nonProductiveHours: Number
  },
  createdAt: Date,
  lastActive: Date
}
```

### ProductivityLog Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  website: String,
  category: String (productive|non-productive|neutral),
  timeSpent: Number,
  scrollSpeed: Number,
  mouseMovement: Number,
  videoTitle: String,
  timestamp: Date
}
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login to account

### User Profile
- `GET /api/user/profile` - Get user info
- `PUT /api/user/avatar` - Update avatar
- `PUT /api/user/stats` - Update stats & XP

### Leaderboard
- `GET /api/leaderboard` - Get top users
- `GET /api/leaderboard/rank` - Get user's rank

### Statistics
- `GET /api/stats` - Get user stats
- `POST /api/stats/record` - Record activity

## 🎨 UI Features

### Dark Cyberpunk Theme
- Gradient backgrounds (Purple → Pink → Cyan)
- Neon glowing elements
- Glass-morphism effect
- Smooth animations (Framer Motion)

### Avatar System
- Dynamic expressions (happy, tired, sick, energetic, neutral)
- Health bar reflecting productivity
- Level badges
- Floating animations
- Expression auto-update based on stats

### Dashboard
- Real-time stats display
- Avatar visualization
- Quick action buttons
- Global ranking
- Streak counter

## 🛠️ Tech Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 18 + Vite | Fast UI development |
| Styling | Tailwind CSS | Utility-first styling |
| Animations | Framer Motion | Smooth interactions |
| Backend | Express.js | REST API server |
| Database | MongoDB | NoSQL database |
| Real-time | Socket.io | Live updates |
| Auth | JWT + bcrypt | Secure authentication |
| Extension | Chrome API | Browser tracking |
| AI | Python FastAPI | Activity classification |

## 📱 Responsive Design
- Mobile First approach
- Works on all screen sizes
- Touch-friendly buttons
- Optimized for mobile gaming

## 🔐 Security Features
- JWT token-based auth
- bcrypt password hashing
- CORS enabled
- Protected routes (React)
- Input validation (server-side)

## 🚀 Performance
- Vite for fast builds
- Code splitting
- Lazy loading
- Socket.io for real-time sync
- Database indexing

## 📞 Support & Debugging

### Common Issues & Solutions
See [QUICKSTART.md](./QUICKSTART.md) for:
- MongoDB connection issues
- Port conflicts
- CORS errors
- Module installation problems

### Testing the API
```bash
# Check backend health
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"123456","confirmPassword":"123456"}'
```

## 🎓 Learning Resources

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Socket.io Tutorial](https://socket.io/docs/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Built with ❤️ for Hackathon**

"Your digital habits directly affect a living anime companion and your social rank." 🎮
