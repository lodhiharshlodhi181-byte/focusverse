#!/bin/bash
# setup.sh - Automated setup script for FocusVerse

set -e

echo "🚀 FocusVerse - Automated Setup Script"
echo "======================================"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required. Install from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node --version)"
echo "✅ npm $(npm --version)"
echo ""

# Setup Backend
echo "📦 Setting up Backend..."
cd server
npm install
echo "✅ Backend dependencies installed"
echo ""

# Setup Frontend
echo "🎨 Setting up Frontend..."
cd ../client
npm install
echo "✅ Frontend dependencies installed"
echo ""

echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Install MongoDB (local or Atlas)"
echo "2. Update MONGODB_URI in server/.env if needed"
echo "3. Run: bash start.sh"
echo ""
