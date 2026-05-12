@echo off
REM verify-setup.bat - Verify FocusVerse setup on Windows

echo.
echo 🔍 FocusVerse Setup Verification
echo ================================
echo.

set ERRORS=0

REM Check Node.js
echo Checking Node.js...
where node >nul 2>nul
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('node --version') do echo ✅ Node.js: %%i
) else (
    echo ❌ Node.js not found
    set /a ERRORS+=1
)

REM Check npm
echo.
echo Checking npm...
where npm >nul 2>nul
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('npm --version') do echo ✅ npm: %%i
) else (
    echo ❌ npm not found
    set /a ERRORS+=1
)

REM Check MongoDB
echo.
echo Checking MongoDB...
where mongod >nul 2>nul
if %errorlevel% equ 0 (
    echo ✅ MongoDB found
) else (
    echo ⚠️  MongoDB not found (install or use MongoDB Atlas^)
)

REM Check server dependencies
echo.
echo Checking Backend Setup...
if exist "server\node_modules" (
    echo ✅ Backend dependencies installed
) else (
    echo ⚠️  Backend dependencies not installed
    echo    Run: cd server ^& npm install
)

REM Check client dependencies
echo.
echo Checking Frontend Setup...
if exist "client\node_modules" (
    echo ✅ Frontend dependencies installed
) else (
    echo ⚠️  Frontend dependencies not installed
    echo    Run: cd client ^& npm install
)

REM Check .env files
echo.
echo Checking Configuration Files...
if exist "server\.env" (
    echo ✅ server\.env found
) else (
    echo ⚠️  server\.env not found
)

if exist "client\.env.local" (
    echo ✅ client\.env.local found
) else (
    echo ⚠️  client\.env.local not found
)

REM Summary
echo.
echo ================================
if %ERRORS% equ 0 (
    echo ✅ Setup verification passed!
    echo.
    echo 🚀 Ready to start:
    echo    start.bat
) else (
    echo ❌ %ERRORS% error(s) found
    echo Please fix the errors above
)

echo.
pause
