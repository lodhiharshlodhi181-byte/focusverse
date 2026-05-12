@echo off
echo 🤖 Starting FocusVerse AI Engine...
echo ===================================

REM Check if Python is installed
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Python is not installed! Please install Python from python.org
    pause
    exit /b 1
)

echo ✅ Python found.
echo 📦 Installing/Updating dependencies...
python -m pip install fastapi uvicorn pydantic >nul 2>&1

echo 🚀 Launching Classifier AI...
cd ai-engine
python classifier.py

pause
