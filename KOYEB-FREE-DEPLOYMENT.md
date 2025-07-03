# 🚀 El Jarda - Koyeb Free Plan Deployment Guide

This guide will help you deploy El Jarda to Koyeb using their **free Hobby plan** with PostgreSQL database.

## 📋 Prerequisites

1. **Koyeb Account**: Sign up at [koyeb.com](https://www.koyeb.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Email Account**: For contact form functionality

## 🗄️ Step 1: Create PostgreSQL Database

1. **Login to Koyeb Dashboard**
   - Go to [app.koyeb.com](https://app.koyeb.com)
   - Sign in to your account

2. **Create Database Service**
   - Click "**Create**" → "**Database**"
   - Choose **PostgreSQL**
   - **Plan**: Select **Hobby** (Free)
   - **Name**: `el-jarda-db`
   - **Region**: Choose closest to your target audience
   - **Version**: Latest PostgreSQL version

3. **Save Connection Details**
   After creation, copy these details:
   ```
   Host: your-db-host.koyeb.app
   Port: 5432
   Database: koyebdb
   Username: koyeb-adm
   Password: [generated-password]
   Connection URL: postgresql://username:password@host:port/database
   ```

## 🔧 Step 2: Set Environment Variables

You'll need these environment variables in Koyeb:

### Required Variables:
```env
# Database (Use your actual Koyeb PostgreSQL details)
DATABASE_HOST=your-db-host.koyeb.app
DATABASE_USER=koyeb-adm
DATABASE_PASSWORD=your-generated-password
DATABASE_NAME=koyebdb

# Application
NODE_ENV=production
JWT_SECRET=your-super-secure-64-character-secret-key
PORT=8000

# Email (Keep your current Zoho settings)
EMAIL_HOST=smtp.zoho.com
EMAIL_PORT=587
EMAIL_USER=contact@eljarda.com
EMAIL_PASS=sCqkTXLa3wUJ
```

### Optional Variables:
```env
# CORS (Add after deployment)
ALLOWED_ORIGIN=https://your-app-name.koyeb.app

# File Upload Limits
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=jpeg,jpg,png,gif,webp
```

## 🚀 Step 3: Deploy Application

### Option A: GitHub Integration (Recommended)

1. **Create New App**
   - Go to "**Apps**" → "**Create App**"
   - Choose "**GitHub**" as source
   - Connect your GitHub account
   - Select your repository

2. **Configure Build Settings**
   - **Build command**: `npm run build`
   - **Start command**: `npm start`
   - **Port**: `8000`
   - **Health check path**: `/api/health`

3. **Add Environment Variables**
   - Click "**Environment**" tab
   - Add all variables from Step 2
   - **⚠️ DO NOT add `MOCK_DB=true` in production**

4. **Deploy**
   - Click "**Deploy**"
   - Wait for build to complete (5-10 minutes)

### Option B: Docker Deployment

1. **Create App**
   - Choose "**Docker**" as source
   - Repository: Your GitHub repo
   - Dockerfile: `./Dockerfile`

2. **Same configuration as Option A**

## ✅ Step 4: Post-Deployment Setup

1. **Get Your App URL**
   - After deployment, you'll get: `https://your-app-name.koyeb.app`

2. **Update CORS (if needed)**
   - Add `ALLOWED_ORIGIN=https://your-app-name.koyeb.app` to environment variables
   - Redeploy if you make changes

3. **Test Database Connection**
   - Visit: `https://your-app-name.koyeb.app/api/health`
   - Should show: `{"status":"ok","message":"El Jarda Server is running"}`

4. **Admin Setup**
   - Default admin credentials:
     - **Username**: `ayoub`
     - **Password**: `A4y4o2u0b0z0`
   - **⚠️ Change password immediately after first login**

## 🔍 Step 5: Testing

### Test these features:
- ✅ Home page loads
- ✅ Products display
- ✅ Admin login works
- ✅ Product management (add/edit/delete)
- ✅ Contact form sends emails
- ✅ Image uploads work

### Test URLs:
- **Home**: `https://your-app-name.koyeb.app`
- **API Health**: `https://your-app-name.koyeb.app/api/health`
- **Admin**: `https://your-app-name.koyeb.app` (click Admin button)

## 🛠️ Troubleshooting

### Common Issues:

1. **Build Failed**
   ```bash
   # Check build logs in Koyeb dashboard
   # Usually missing dependencies or Node.js version issues
   ```

2. **Database Connection Error**
   - Verify DATABASE_* environment variables
   - Check PostgreSQL service is running
   - Ensure no typos in connection details

3. **CORS Errors**
   - Add your app URL to ALLOWED_ORIGIN
   - Redeploy after environment changes

4. **File Upload Issues**
   - Check file size limits (5MB default)
   - Verify supported file types
   - Check upload permissions

### Getting Help:
- **Koyeb Docs**: [docs.koyeb.com](https://docs.koyeb.com)
- **Koyeb Community**: [community.koyeb.com](https://community.koyeb.com)
- **Koyeb Support**: Via dashboard

## 🔐 Security Checklist

- ✅ Change default admin password
- ✅ Use strong JWT_SECRET (64+ characters)
- ✅ Set NODE_ENV=production
- ✅ Don't commit .env files
- ✅ Monitor database access
- ✅ Use HTTPS only (Koyeb provides this)

## 💰 Free Plan Limits

**Koyeb Hobby Plan includes:**
- ✅ 1 Web Service
- ✅ 1 Database (PostgreSQL)
- ✅ 512 MB RAM
- ✅ 0.1 CPU
- ✅ 2 GB Storage
- ✅ Custom domains
- ✅ SSL certificates
- ✅ Global CDN

**Perfect for El Jarda website! 🌱**

## 🎯 Next Steps After Deployment

1. **Custom Domain** (Optional)
   - Purchase domain
   - Configure DNS in Koyeb
   - Update CORS settings

2. **Email Setup**
   - Your Zoho email should work
   - Test contact form thoroughly

3. **Content Management**
   - Add your garden products
   - Upload product images
   - Update contact information

4. **SEO Optimization**
   - Add meta tags
   - Create sitemap
   - Submit to search engines

---

**🚀 Your El Jarda website will be live at: `https://your-app-name.koyeb.app`**

Need help? The deployment is designed to work out-of-the-box with Koyeb's free plan! 🌱
