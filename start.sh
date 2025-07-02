#!/bin/bash

# El Jarda - Setup and Start Script
# This script installs dependencies and starts both backend and frontend

echo "🌱 El Jarda - Setting up and starting the application..."
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "🚀 Starting the application..."
echo "Backend will start on: http://localhost:3001"
echo "Frontend will start on: http://localhost:5173"
echo ""
echo "📝 Default admin credentials:"
echo "   Username: admin"
echo "   Password: admin123"
echo ""
echo "⚠️  Make sure to change the admin password after first login!"
echo ""
echo "🔄 Starting servers..."

# Start backend in background
npm run server &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend in background
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Both servers are starting..."
echo "   Backend PID: $BACKEND_PID"
echo "   Frontend PID: $FRONTEND_PID"
echo ""
echo "🌐 Open your browser and go to: http://localhost:5173"
echo ""
echo "To stop the servers, press Ctrl+C or run:"
echo "   kill $BACKEND_PID $FRONTEND_PID"

# Keep script running
wait
