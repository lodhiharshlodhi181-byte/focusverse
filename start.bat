@echo off
REM FocusVerse - Start Script for Windows

echo.
echo 🚀 Starting FocusVerse Application...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install it first.
    echo Visit: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js found: %NODE_VERSION%
echo.

REM Start Backend
echo 📦 Starting Backend Server...
cd server
call npm install >nul 2>&1
start /min cmd /c npm run dev
echo ✅ Backend started on http://localhost:5000
timeout /t 3 /nobreak >nul

REM Start Frontend
echo.
echo 🎨 Starting Frontend Application...
cd ..\client
call npm install >nul 2>&1
start /min cmd /c npm run dev
echo ✅ Frontend started on http://localhost:3000
echo.

echo.
echo 🎮 FocusVerse is running!
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:5000
echo    AI Engine (optional): http://localhost:8000
echo.
echo Check your browser and enjoy! 🚀
echo.
echo Close this window to stop the application.
echo.

pause
