# 🌱 El Jarda - Complete Setup Guide

The El Jarda gardening business website is now fully configured with automated setup scripts and deployment tools.

## ✅ Project Structure

```
el-jarda/
├── 📜 Quick Start Scripts
│   ├── start.bat          # Windows Batch script
│   ├── start.ps1          # PowerShell script  
│   ├── start.sh           # Linux/Mac Bash script
│   └── QUICK-START.md     # Script documentation
│
├── 🚀 Deployment Files
│   ├── Procfile           # Koyeb process definition
│   ├── Dockerfile         # Container configuration
│   ├── .dockerignore      # Docker optimization
│   └── KOYEB-DEPLOYMENT.md # Complete deployment guide
│
├── ⚙️ Configuration
│   ├── .env               # Environment variables (Koyeb PostgreSQL)
│   ├── .env.example       # Environment template
│   └── package.json       # Dependencies and scripts
│
├── 🗄️ Database
│   └── server/database.js # PostgreSQL connection with mock fallback
│
└── 🌐 Application
    ├── server/server.js   # Express backend
    ├── src/               # React frontend
    └── public/            # Static assets
```

## 🚀 Quick Start Options

### Option 1: Automated Setup (Recommended)

**Windows:**
```bash
# Double-click or run:
start.bat
# or
start.ps1
```

**Linux/Mac:**
```bash
chmod +x start.sh
./start.sh
```

### Option 2: NPM Scripts

```bash
# Install dependencies
npm install

# Start both servers together
npm run dev:all

# Or start separately:
npm run server    # Backend only
npm run dev       # Frontend only
```

### Option 3: Manual Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment (optional - defaults work)
cp .env.example .env

# 3. Start backend
npm run server

# 4. Start frontend (new terminal)
npm run dev
```

## 🌐 Access Points

| Service | URL | Description |
|---------|-----|-------------|
| **Website** | http://localhost:5173 | Main React application |
| **API** | http://localhost:3001/api | REST API endpoints |
| **Admin** | http://localhost:5173/admin | Admin panel |
| **Health** | http://localhost:3001/api/health | Server health check |

## 🔐 Default Credentials

| Field | Value |
|-------|-------|
| **Username** | `admin` |
| **Password** | `admin123` |

⚠️ **Important**: Change these credentials after first login!

## 📦 What's Included

### ✅ Core Features
- 🌱 **Product Catalog** - Garden products with bilingual support
- 🔐 **Admin Panel** - Complete CRUD operations
- 📧 **Contact Form** - Email integration
- 📱 **Responsive Design** - Mobile and desktop optimized
- 🌍 **Bilingual** - Arabic and French support

### ✅ Technical Stack
- **Frontend**: React 18 + Vite
- **Backend**: Node.js + Express
- **Database**: PostgreSQL (Koyeb) with mock fallback
- **Authentication**: JWT with bcrypt
- **File Upload**: Multer support
- **Email**: Nodemailer integration

### ✅ Development Tools
- **Auto-restart**: Concurrent server management
- **Hot reload**: Frontend development server
- **Mock database**: Development without PostgreSQL
- **Error handling**: Comprehensive error management
- **CORS**: Production-ready configuration

### ✅ Production Ready
- **Koyeb Deployment**: Complete guide and configuration
- **Docker Support**: Production Dockerfile
- **Environment Management**: Flexible configuration
- **SSL Support**: Production database encryption
- **Security**: Non-root containers, input validation

## 🛠️ Available Scripts

| Script | Description | Usage |
|--------|-------------|-------|
| `npm run dev` | Frontend development server | Development |
| `npm run server` | Backend server only | Development |
| `npm run dev:all` | Both servers concurrently | Development |
| `npm run build` | Build for production | Deployment |
| `npm start` | Production server | Production |
| `npm run setup` | Install dependencies | Setup |
| `npm run clean` | Clean installation | Maintenance |
| `npm run fresh-install` | Complete reinstall | Troubleshooting |

## 🗄️ Database Configuration

### Development (Mock Mode)
```env
MOCK_DB=false  # Now using real Koyeb PostgreSQL
```

### Production (Koyeb PostgreSQL)
```env
DATABASE_HOST=ep-dry-rain-a2uk4pkj.eu-central-1.pg.koyeb.app
DATABASE_USER=koyeb-adm
DATABASE_PASSWORD=npg_R9CIaUtf4Oxp
DATABASE_NAME=koyebdb
```

## 🚀 Deployment to Koyeb

1. **Create Koyeb Account** at [koyeb.com](https://www.koyeb.com)
2. **Connect GitHub Repository** 
3. **Set Environment Variables** (see KOYEB-DEPLOYMENT.md)
4. **Deploy** - Uses Procfile automatically

Complete deployment guide: `KOYEB-DEPLOYMENT.md`

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| **Port in use** | Run `npm run clean` or change ports |
| **Dependencies fail** | Try `npm run fresh-install` |
| **Database connection** | Check .env configuration |
| **Build errors** | Verify Node.js version (18+) |
| **Permission errors** | Run as administrator/sudo |

## 📞 Support

- **Documentation**: See README.md and guides in root
- **Deployment**: KOYEB-DEPLOYMENT.md
- **Quick Start**: QUICK-START.md
- **Scripts**: Check package.json for all available commands

---

**Status**: ✅ **Production Ready**  
**Database**: ✅ **Connected to Koyeb PostgreSQL**  
**Deployment**: ✅ **Koyeb Ready**  
**Development**: ✅ **Auto-setup Scripts Available**

The El Jarda website is ready for development and production! 🌱
