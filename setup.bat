@echo off
REM setup.bat - Automated setup script for Windows

echo.
echo 🚀 FocusVerse - Automated Setup Script
echo ======================================
echo.

REM Check Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is required. Install from https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i

echo ✅ Node.js %NODE_VERSION%
echo ✅ npm %NPM_VERSION%
echo.

REM Setup Backend
echo 📦 Setting up Backend...
cd server
call npm install
echo ✅ Backend dependencies installed
echo.

REM Setup Frontend  
echo 🎨 Setting up Frontend...
cd ..\client
call npm install
echo ✅ Frontend dependencies installed
echo.

echo ✅ Setup complete!
echo.
echo 🎯 Next steps:
echo 1. Install MongoDB (https://www.mongodb.com/)
echo 2. Update MONGODB_URI in server/.env if needed
echo 3. Run: start.bat
echo.

pause
