# El Jarda - Setup and Start Script for PowerShell
# This script installs dependencies and starts both backend and frontend

Write-Host "🌱 El Jarda - Setting up and starting the application..." -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js 18+ first." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "✅ npm found: v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is not installed. Please install npm first." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "🚀 Starting the application..." -ForegroundColor Cyan
Write-Host "Backend will start on: http://localhost:3001" -ForegroundColor White
Write-Host "Frontend will start on: http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "📝 Default admin credentials:" -ForegroundColor Yellow
Write-Host "   Username: admin" -ForegroundColor White
Write-Host "   Password: admin123" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  Make sure to change the admin password after first login!" -ForegroundColor Red
Write-Host ""
Write-Host "🔄 Starting servers..." -ForegroundColor Cyan

# Start backend in a new PowerShell window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run server; Read-Host 'Press Enter to close'"

# Wait a moment for backend to start
Start-Sleep -Seconds 3

# Start frontend in a new PowerShell window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run dev; Read-Host 'Press Enter to close'"

Write-Host ""
Write-Host "✅ Both servers are starting in separate windows..." -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Open your browser and go to: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "To stop the servers, close the PowerShell windows or press Ctrl+C in each." -ForegroundColor Yellow

Read-Host "Press Enter to close this window"
