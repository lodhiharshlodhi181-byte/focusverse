# GETTING_STARTED.md - Comprehensive Getting Started Guide

## 🚀 Welcome to FocusVerse!

**FocusVerse** is an anime avatar productivity tracker that evolves based on your digital habits and focus level. This guide will help you get started in 5 minutes.

---

## 📋 Prerequisites

Make sure you have these installed:

1. **Node.js v16+** - [Download](https://nodejs.org/)
   ```bash
   node --version  # Should be v16 or higher
   npm --version   # Should come with Node.js
   ```

2. **MongoDB** (Choose one):
   - **Option A**: [Local Installation](https://www.mongodb.com/try/download/community)
   - **Option B**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Cloud - Recommended for development)

---

## ⚡ Quick Start (5 minutes)

### Step 1: Navigate to Project
```bash
cd project
```

### Step 2: Automatic Setup (Windows)
```bash
setup.bat
```

### Step 3: Verify Setup (Optional)
```bash
verify-setup.bat
```

### Step 4: Start Services
```bash
start.bat
```

**That's it!** 🎉

The app will open at:
- 🌐 Frontend: http://localhost:3000
- 🔧 Backend: http://localhost:5000

---

## 🐧 For Mac/Linux Users

### Step 1-2: Setup
```bash
bash setup.sh
```

### Step 3: Verify
```bash
bash verify-setup.sh
```

### Step 4: Start
```bash
bash start.sh
```

---

## 📱 First Run Experience

### 1. **Register Account**
   - Click "Get Started" button
   - Fill in username, email, password
   - Click "Register"
   - Auto-redirected to dashboard ✨

### 2. **Explore Dashboard**
   - See your anime avatar (starts as neutral)
   - Check your stats (all zeros initially)
   - View quick action buttons

### 3. **View Leaderboard**
   - Click "🏆 Leaderboard" button
   - See global rankings
   - Your rank updates as you earn XP

### 4. **Update Stats** (Demo)
   - In browser console, or via API
   - System will auto-update avatar expression
   - Health bar reflects productivity

---

## 🎮 Manual Testing (Without Extension)

### Test via Browser Console

1. Open DevTools: `F12` or Right-click → Inspect
2. Go to Console tab
3. Paste this code to simulate productivity:

```javascript
// Update user stats
const token = localStorage.getItem('token');
const baseURL = 'http://localhost:5000/api';

// Make the request
fetch(`${baseURL}/user/stats`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    totalFocus: 150,
    productiveHours: 2.5,
    nonProductiveHours: 0.5
  })
})
.then(r => r.json())
.then(d => console.log('Updated:', d))
.catch(e => console.error('Error:', e));
```

Expected result:
- Avatar expression changes (⚡ energetic)
- Health bar increases
- Total XP increases

---

## 🛠️ Troubleshooting

### Issue: MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solutions:**
1. **Local MongoDB not running**
   ```bash
   # Windows - Check MongoDB service
   # Mac - Run: brew services list | grep mongodb
   # Linux - sudo systemctl status mongod
   ```

2. **Use MongoDB Atlas instead**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create free account
   - Create cluster
   - Get connection string
   - Update `MONGODB_URI` in `server/.env`
   - Restart backend

### Issue: Port Already in Use
```
Error: listen EADDRINUSE :::5000
```

**Solutions:**
1. Kill the process using port 5000
   ```bash
   # Windows (PowerShell as Admin)
   Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process

   # Mac/Linux
   lsof -ti:5000 | xargs kill -9
   ```

2. Or change port in `server/.env`:
   ```
   PORT=5001
   ```

### Issue: Module Not Found
```
Error: Cannot find module 'express'
```

**Solution:**
```bash
cd server
npm install

cd ../client
npm install
```

### Issue: CORS Errors in Browser
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
- CORS is already configured in `server/server.js`
- Make sure frontend URL matches
- Check browser console for actual error message

---

## 📚 API Testing

### Using curl (Command Line)

1. **Register User**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

2. **Login**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

3. **Get Profile** (Replace TOKEN)
```bash
curl http://localhost:5000/api/user/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Create new request
3. Set URL: `http://localhost:5000/api/auth/login`
4. Set Method: POST
5. Go to Body tab
6. Select "raw" and "JSON"
7. Paste: `{"email":"test@example.com","password":"password123"}`
8. Click Send

See [QUICKSTART.md](./QUICKSTART.md) for all endpoints.

---

## 📊 Project Structure Overview

```
project/
├── client/                 # React frontend (port 3000)
│   ├── src/pages/        # Login, Register, Dashboard
│   ├── src/components/   # Reusable UI components
│   ├── src/avatar/       # Avatar display
│   └── package.json      # Dependencies
│
├── server/               # Express backend (port 5000)
│   ├── models/          # Database schemas
│   ├── routes/          # API endpoints
│   ├── controllers/      # Business logic
│   └── package.json     # Dependencies
│
├── extension/           # Chrome extension (Phase 2)
├── ai-engine/          # Python AI (Phase 2)
│
└── start.bat/start.sh   # Start everything
```

---

## 🎯 Key Features Walkthrough

### Avatar System
- **Expression types**: Happy 😊, Tired 😴, Sick 🤒, Energetic ⚡, Neutral 😐
- **Automatic**: Changes based on your focus time
- **Level**: Increases every 1000 XP
- **Health bar**: Reflects productivity ratio

### Dashboard
- Real-time stats display
- Avatar animation
- Quick action buttons
- Current rank

### Leaderboard
- Top 10 global users
- Sorted by total XP
- Your rank display
- Medal icons (🥇🥈🥉)

### Streaks
- Consecutive productive days
- Current streak counter
- Longest streak tracker
- Auto-reset on inactive days

---

## 🔐 Security Notes

⚠️ **For Development Only**

- Default JWT_SECRET is exposed in `.env.example`
- Never commit real `.env` files to git
- Change JWT_SECRET before production:
  ```bash
  # Generate random secret
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```

---

## 🚀 Next Steps

### Immediate (Today)
1. ✅ Get the app running
2. ✅ Test login/register
3. ✅ Explore dashboard
4. ✅ View leaderboard

### Short Term (This Week)
- Explore API endpoints
- Update mock stats
- Test avatar animations
- Join leaderboard

### Medium Term (This Month)
- Phase 2: Chrome Extension
- Implement Friends system
- Add real website tracking
- Deploy to production

---

## 📖 Documentation

- **Quick Start**: [QUICKSTART.md](./QUICKSTART.md)
- **Project Structure**: [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
- **Development Roadmap**: [ROADMAP.md](./ROADMAP.md)
- **Main README**: [README.md](./README.md)

---

## 💬 Common Questions

**Q: Can I test without MongoDB?**
A: No, MongoDB is required. Use MongoDB Atlas (cloud) for instant setup.

**Q: Can I use the app on mobile?**
A: The web version works on mobile browsers. Native mobile app coming Phase 3.

**Q: How do I change the avatar?**
A: Avatars automatically change based on productivity stats. Manual selection coming in Phase 2.

**Q: When will the Chrome extension be ready?**
A: Phase 2 - estimated 2-3 weeks after MVP launch.

**Q: Can I deploy this?**
A: Yes! See deployment section in QUICKSTART.md

---

## 🎓 Learning Resources

Want to understand the code better?

- **React**: https://react.dev/ (60 min intro)
- **Express**: https://expressjs.com/en/starter/hello-world.html
- **MongoDB**: https://docs.mongodb.com/manual/introduction/
- **Socket.io**: https://socket.io/docs/v4/

---

## ✅ Verification Checklist

Before proceeding to development:

- [ ] Node.js installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] MongoDB running (local or Atlas)
- [ ] `setup.bat/sh` ran successfully
- [ ] Backend started (`http://localhost:5000/api/health`)
- [ ] Frontend loaded (`http://localhost:3000`)
- [ ] Registration works
- [ ] Dashboard displays
- [ ] Leaderboard loads

If all ✅, you're ready to go! 🚀

---

## 🆘 Need Help?

1. Check [QUICKSTART.md](./QUICKSTART.md) troubleshooting section
2. Read error messages carefully
3. Check terminal/console for error logs
4. Verify .env files are correct
5. Try restarting services

---

## 🎉 Success!

Congratulations! You now have a fully functional anime avatar productivity tracker running locally.

**What to do next:**
1. Create a test account
2. Add some friends (coming Phase 2)
3. Update mock productivity stats
4. Watch your avatar evolve
5. Climb the leaderboard

**Enjoy FocusVerse!** 🎮✨

---

**Version**: 1.0.0 (MVP)
**Last Updated**: 2024
**Status**: Production Ready 🚀
