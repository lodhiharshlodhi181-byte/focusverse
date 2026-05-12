@echo off
REM api-demo.bat - Demonstrate FocusVerse API endpoints on Windows

setlocal enabledelayedexpansion

set BASE_URL=http://localhost:5000/api
set EMAIL=demo@example.com
set PASSWORD=demo123
set TOKEN=

echo.
echo 🎮 FocusVerse API Demo
echo ====================
echo.

REM 1. Check server health
echo 1️⃣  Checking Server Health...
curl -s %BASE_URL%/health
echo.
echo.

REM 2. Register a user
echo 2️⃣  Registering User...
for /f "delims=" %%A in ('curl -s -X POST %BASE_URL%/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"username\": \"demouser\", \"email\": \"%EMAIL%\", \"password\": \"%PASSWORD%\", \"confirmPassword\": \"%PASSWORD%\"}"') do (
  set REGISTER_RESPONSE=%%A
)
echo %REGISTER_RESPONSE%
echo.
echo.

REM Note: Token extraction in batch is complex
REM For full functionality, use the web interface or use curl in PowerShell

echo 🎯 API endpoints tested!
echo.
echo For full API testing:
echo 1. Open http://localhost:3000 in your browser
echo 2. Use the web interface to register and login
echo 3. Or use Postman/curl with the registered token
echo.
echo API Documentation available in QUICKSTART.md
echo.

pause
