@echo off
REM El Jarda - Setup and Start Script for Windows
REM This script installs dependencies and starts both backend and frontend

echo 🌱 El Jarda - Setting up and starting the application...
echo ==================================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo 📦 Installing dependencies...
npm install

if %errorlevel% equ 0 (
    echo ✅ Dependencies installed successfully!
) else (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo 🚀 Starting the application...
echo Backend will start on: http://localhost:3001
echo Frontend will start on: http://localhost:5173
echo.
echo 📝 Default admin credentials:
echo    Username: admin
echo    Password: admin123
echo.
echo ⚠️  Make sure to change the admin password after first login!
echo.
echo 🔄 Starting servers...

REM Start backend in a new window
start "El Jarda Backend" cmd /k "npm run server"

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend in a new window
start "El Jarda Frontend" cmd /k "npm run dev"

echo.
echo ✅ Both servers are starting in separate windows...
echo.
echo 🌐 Open your browser and go to: http://localhost:5173
echo.
echo To stop the servers, close the terminal windows or press Ctrl+C in each.

pause
