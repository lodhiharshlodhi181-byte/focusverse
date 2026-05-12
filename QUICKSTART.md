# FocusVerse - Quick Start Guide

## 🚀 Installation & Setup

### Prerequisites
- Node.js v16+ ([Download](https://nodejs.org/))
- MongoDB ([Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- npm or yarn

### Step 1: Setup MongoDB

**Option A: Local MongoDB**
```bash
# Windows - Start MongoDB
mongod

# In another terminal, open mongo shell
mongosh
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/focusverse`
5. Update `MONGODB_URI` in `server/.env`

### Step 2: Backend Setup

```bash
cd project/server

# Install dependencies
npm install

# Start backend
npm run dev

# Server will run on http://localhost:5000
# Check health: http://localhost:5000/api/health
```

### Step 3: Frontend Setup

```bash
cd project/client

# Install dependencies
npm install

# Create .env.local file (already created)

# Start frontend
npm run dev

# Open http://localhost:3000 in your browser
```

### Step 4: Test the App

1. **Register**: Create a new account
2. **Dashboard**: View your avatar and stats
3. **Leaderboard**: See global rankings
4. **Mock Activity**: Update stats through dashboard

## 📊 API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/avatar` - Update avatar expression
- `PUT /api/user/stats` - Update user stats

### Leaderboard
- `GET /api/leaderboard` - Get leaderboard (paginated)
- `GET /api/leaderboard/rank` - Get user's rank

### Stats
- `GET /api/stats` - Get user stats
- `POST /api/stats/record` - Record activity

## 🎮 Features Demo

### Register & Login
```
1. Go to http://localhost:3000
2. Click "Get Started"
3. Fill in username, email, password
4. Click Register
5. Auto-redirected to dashboard
```

### Update Productivity
```javascript
// Mock stats update via browser console or API
const mockStats = {
  totalFocus: 120,
  productiveHours: 2,
  nonProductiveHours: 0.5
};

// Avatar will automatically change based on stats
// Health bar will reflect productivity ratio
```

### View Leaderboard
```
1. Login to dashboard
2. Click "🏆 Leaderboard"
3. See top 10 users sorted by XP
4. Pagination available
```

## 🔧 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
Solution: Make sure MongoDB is running
- Windows: mongod
- Check MongoDB Atlas connection string
```

### Port Already in Use
```
Error: listen EADDRINUSE :::5000
Solution: 
- Kill process on port 5000: netstat -ano | findstr :5000
- Or change PORT in .env
```

### CORS Error
```
Error: Access to XMLHttpRequest has been blocked by CORS policy
Solution: Already configured in server.js
- Make sure frontend URL matches CORS origin
```

### npm Module Not Found
```
Solution:
cd project/server
npm install
npm install express mongoose dotenv jsonwebtoken bcryptjs cors socket.io

cd ../client
npm install
npm install react react-dom react-router-dom axios socket.io-client framer-motion
```

## 📱 Phase 2: Chrome Extension

After the web app is working:

1. Go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select `project/extension` folder

The extension will:
- Track website usage in background
- Send data to backend
- Classify as productive/non-productive
- Automatically update user stats

## 🎯 Next Steps

### Phase 2 Features
- [ ] Chrome Extension integration
- [ ] Real-time notifications
- [ ] Friends system
- [ ] AI productivity analysis
- [ ] Advanced avatar customization

### Phase 3 Features
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Challenges & tournaments
- [ ] Social features
- [ ] Premium customization

## 📝 Sample API Calls

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "focusmaster",
    "email": "user@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Update Stats
```bash
curl -X PUT http://localhost:5000/api/user/stats \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "totalFocus": 120,
    "productiveHours": 2,
    "nonProductiveHours": 0.5
  }'
```

### Get Leaderboard
```bash
curl http://localhost:5000/api/leaderboard \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🚨 Important Notes

1. **Change JWT_SECRET in production** - Never use the default secret
2. **Use MongoDB Atlas for production** - Local MongoDB is only for development
3. **Enable HTTPS in production** - Update Socket.io and API URLs
4. **Rate limiting** - Add rate limiting middleware before deploying

## 📞 Support

For issues or questions:
1. Check error messages in console
2. Verify MongoDB is running
3. Ensure ports 3000 and 5000 are free
4. Check .env files are properly configured

---

**Built for Hackathon** | FocusVerse - Your Digital Habits, Your Virtual Pet 🎮
