# Koyeb Deployment Guide for El Jarda

This guide will help you deploy the El Jarda gardening website to Koyeb using their free Hobby plan with PostgreSQL.

## Prerequisites

1. **Koyeb Account**: Sign up at [koyeb.com](https://www.koyeb.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Domain (Optional)**: If you want a custom domain

## Step 1: Create PostgreSQL Database

1. **Login to Koyeb Dashboard**
2. **Navigate to Data Services**
   - Go to "Data" in the sidebar
   - Click "Create Database"

3. **Configure Database**
   - **Type**: PostgreSQL
   - **Plan**: Hobby (Free)
   - **Name**: `el-jarda-db`
   - **Region**: Choose closest to your users
   - **Version**: Latest PostgreSQL version

4. **Save Database Connection Details**
   After creation, note down:
   - **Host**: `your-db-host.koyeb.app`
   - **Port**: `5432`
   - **Database**: `koyebdb`
   - **Username**: `koyeb-adm`
   - **Password**: `generated-password`
   - **Connection URL**: `postgresql://username:password@host:port/database`

## Step 2: Prepare Environment Variables

Set these environment variables in Koyeb:

```env
# Database (Use your Koyeb PostgreSQL details)
DATABASE_HOST=ep-dry-rain-a2uk4pkj.eu-central-1.pg.koyeb.app
DATABASE_USER=koyeb-adm
DATABASE_PASSWORD=npg_R9CIaUtf4Oxp
DATABASE_NAME=koyebdb

# Application Settings
NODE_ENV=production
JWT_SECRET=your-super-secure-production-secret-key-change-this
PORT=8000

# CORS Settings (Optional - for custom domain)
ALLOWED_ORIGIN=https://your-domain.com

# File Upload Settings
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=jpeg,jpg,png,gif,webp

# Email Settings (Configure for production)
EMAIL_HOST=smtp.your-provider.com
EMAIL_PORT=587
EMAIL_USER=your-email@domain.com
EMAIL_PASS=your-email-password
EMAIL_FROM=noreply@eljarda.com
EMAIL_TO=contact@eljarda.com
```

## Step 3: Deploy Application

### Option A: GitHub Integration (Recommended)

1. **Connect GitHub Repository**
   - Go to "Apps" in Koyeb dashboard
   - Click "Create App"
   - Choose "GitHub" as source
   - Select your repository

2. **Configure Build Settings**
   - **Build command**: `npm run build`
   - **Start command**: `npm start` (or leave empty, Procfile will handle it)
   - **Port**: `8000` (Koyeb will override with PORT env var)
   - **Health check**: `/api/health`

3. **Set Environment Variables**
   - Add all the environment variables from Step 2
   - **Important**: Don't set `MOCK_DB=true` in production

4. **Deploy**
   - Click "Deploy"
   - Wait for build and deployment to complete

### Option B: Docker Deployment

1. **Create App**
   - Choose "Docker" as source
   - Use the included `Dockerfile`

2. **Build Settings**
   - Dockerfile path: `./Dockerfile`
   - Build context: `/`

3. **Configure and Deploy**
   - Same environment variables as Option A
   - Deploy

## Step 4: Configure Domain (Optional)

1. **Custom Domain**
   - Go to your app settings
   - Add your custom domain
   - Update DNS records as instructed

2. **Update CORS**
   - Add your domain to `ALLOWED_ORIGIN` environment variable
   - Redeploy if necessary

## Step 5: Post-Deployment Setup

1. **Database Initialization**
   - The app will automatically create tables on first run
   - Default admin user will be created

2. **Admin Access**
   - **Username**: `admin`
   - **Password**: `admin123`
   - **⚠️ Change this immediately after first login**

3. **Test Functionality**
   - Test product management
   - Test contact form
   - Test file uploads
   - Test admin authentication

## File Structure for Deployment

Your repository should have these files:

```
├── Procfile                 # Koyeb process definition
├── Dockerfile              # Container configuration
├── .dockerignore           # Docker build optimization
├── package.json            # Dependencies and scripts
├── .env.example           # Example environment variables
├── server/
│   ├── server.js          # Express server
│   └── database.js        # PostgreSQL connection
├── src/                   # React frontend
├── public/
│   └── uploads/           # File upload directory
└── dist/                  # Built frontend (created by build)
```

## Environment Variables Reference

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ | `postgresql://user:pass@host:5432/db` |
| `NODE_ENV` | Environment mode | ✅ | `production` |
| `JWT_SECRET` | Secret for JWT tokens | ✅ | `your-secret-key` |
| `PORT` | Server port (set by Koyeb) | No | `8000` |
| `ALLOWED_ORIGIN` | Custom domain for CORS | No | `https://eljarda.com` |
| `MAX_FILE_SIZE` | Max upload size in bytes | No | `5242880` |
| `MOCK_DB` | **DO NOT SET in production** | No | - |

## Troubleshooting

### Common Issues:

1. **Database Connection Failed**
   - Verify DATABASE_URL is correct
   - Check PostgreSQL service is running
   - Ensure no firewall blocking connection

2. **Build Failed**
   - Check Node.js version compatibility
   - Verify all dependencies in package.json
   - Check build logs for specific errors

3. **CORS Errors**
   - Add your domain to ALLOWED_ORIGIN
   - Verify CORS configuration in server.js

4. **File Upload Issues**
   - Check file size limits
   - Verify upload directory permissions
   - Check allowed file types

### Support

- **Koyeb Docs**: [docs.koyeb.com](https://docs.koyeb.com)
- **Koyeb Community**: [community.koyeb.com](https://community.koyeb.com)

## Security Notes

1. **Change Default Admin Password**
2. **Use Strong JWT_SECRET**
3. **Keep Dependencies Updated**
4. **Monitor Database Access**
5. **Use HTTPS Only in Production**

---

**Deployment Checklist:**
- ✅ PostgreSQL database created
- ✅ Environment variables configured
- ✅ Repository connected to Koyeb
- ✅ Build and deployment successful
- ✅ Admin password changed
- ✅ Application tested

Your El Jarda website should now be live on Koyeb! 🚀
