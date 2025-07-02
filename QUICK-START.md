# Quick Start Scripts

This folder contains scripts to easily set up and run the El Jarda application.

## 🚀 Quick Start

Choose the script for your operating system:

### Windows Users:
```bash
# Option 1: Double-click this file
start.bat

# Option 2: Run in Command Prompt
.\start.bat

# Option 3: Run in PowerShell
.\start.ps1
```

### Linux/Mac Users:
```bash
# Make executable and run
chmod +x start.sh
./start.sh
```

## 📋 What These Scripts Do:

1. ✅ **Check Prerequisites** - Verify Node.js and npm are installed
2. 📦 **Install Dependencies** - Run `npm install` to get all packages
3. 🚀 **Start Backend** - Launch the server on http://localhost:3001
4. 🌐 **Start Frontend** - Launch the React app on http://localhost:5173
5. 💡 **Show Instructions** - Display admin credentials and URLs

## 🔧 Manual Installation (Alternative)

If you prefer to run commands manually:

```bash
# 1. Install dependencies
npm install

# 2. Start backend (in one terminal)
npm run server

# 3. Start frontend (in another terminal)
npm run dev

# 4. Or start both together
npm run dev:all
```

## 📝 Available NPM Scripts:

| Script | Description |
|--------|-------------|
| `npm run dev` | Start frontend only |
| `npm run server` | Start backend only |
| `npm run dev:all` | Start both frontend and backend |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run setup` | Install dependencies |
| `npm run clean` | Clean node_modules |
| `npm run fresh-install` | Clean install |

## 🌐 Access Points:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001/api
- **Admin Panel**: Use credentials `admin` / `admin123`

## ⚠️ Important Notes:

1. **Change Admin Password**: After first login, change the default password
2. **Database**: Currently using Koyeb PostgreSQL (configured in .env)
3. **Ports**: Make sure ports 3001 and 5173 are available
4. **Environment**: Check .env file for configuration

## 🛠️ Troubleshooting:

- **Port in use**: Kill existing Node processes or change ports in .env
- **Dependencies fail**: Try `npm run fresh-install`
- **Database issues**: Check .env database configuration
- **Permission errors**: Run as administrator (Windows) or with sudo (Linux/Mac)

Happy coding! 🌱
