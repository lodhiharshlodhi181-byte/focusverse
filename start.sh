#!/bin/bash

# FocusVerse - Start Script

echo "🚀 Starting FocusVerse Application..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Start Backend
echo "📦 Starting Backend Server..."
cd server
npm install 2>/dev/null
npm run dev &
BACKEND_PID=$!

echo "✅ Backend started (PID: $BACKEND_PID)"
sleep 3

# Start Frontend
echo "🎨 Starting Frontend Application..."
cd ../client
npm install 2>/dev/null
npm run dev &
FRONTEND_PID=$!

echo "✅ Frontend started (PID: $FRONTEND_PID)"
echo ""

echo "🎮 FocusVerse is running!"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
