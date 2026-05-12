#!/bin/bash
# verify-setup.sh - Verify FocusVerse setup

echo "🔍 FocusVerse Setup Verification"
echo "================================"
echo ""

ERRORS=0

# Check Node.js
echo "Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js: $NODE_VERSION"
else
    echo "❌ Node.js not found"
    ERRORS=$((ERRORS+1))
fi

# Check npm
echo ""
echo "Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "✅ npm: $NPM_VERSION"
else
    echo "❌ npm not found"
    ERRORS=$((ERRORS+1))
fi

# Check MongoDB
echo ""
echo "Checking MongoDB..."
if command -v mongod &> /dev/null; then
    echo "✅ MongoDB found"
else
    echo "⚠️  MongoDB not found (install or use MongoDB Atlas)"
fi

# Check server dependencies
echo ""
echo "Checking Backend Setup..."
if [ -d "server/node_modules" ]; then
    echo "✅ Backend dependencies installed"
else
    echo "⚠️  Backend dependencies not installed (run: cd server && npm install)"
fi

# Check client dependencies
echo ""
echo "Checking Frontend Setup..."
if [ -d "client/node_modules" ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "⚠️  Frontend dependencies not installed (run: cd client && npm install)"
fi

# Check .env files
echo ""
echo "Checking Configuration Files..."
if [ -f "server/.env" ]; then
    echo "✅ server/.env found"
else
    echo "⚠️  server/.env not found"
fi

if [ -f "client/.env.local" ]; then
    echo "✅ client/.env.local found"
else
    echo "⚠️  client/.env.local not found"
fi

# Summary
echo ""
echo "================================"
if [ $ERRORS -eq 0 ]; then
    echo "✅ Setup verification passed!"
    echo ""
    echo "🚀 Ready to start:"
    echo "   bash start.sh"
else
    echo "❌ $ERRORS error(s) found"
    echo "Please fix the errors above"
fi
