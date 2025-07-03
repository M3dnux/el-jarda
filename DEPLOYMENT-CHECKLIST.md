# 🚀 Koyeb Deployment Checklist for El Jarda

## ✅ Pre-Deployment Checklist

### 1. Repository Setup
- [ ] Code is pushed to GitHub repository
- [ ] All files are committed and pushed
- [ ] `.env` file is NOT committed (should be in `.gitignore`)

### 2. Environment Variables Preparation
Prepare these environment variables for Koyeb:

#### Required:
```env
DATABASE_HOST=your-db-host.koyeb.app
DATABASE_USER=koyeb-adm
DATABASE_PASSWORD=your-generated-password
DATABASE_NAME=koyebdb
NODE_ENV=production
JWT_SECRET=your-super-secure-64-character-secret
PORT=8000
```

#### Optional (Email):
```env
EMAIL_HOST=smtp.zoho.com
EMAIL_PORT=587
EMAIL_USER=contact@eljarda.com
EMAIL_PASS=sCqkTXLa3wUJ
```

## 🗄️ Koyeb Database Setup

### Step 1: Create PostgreSQL Database
1. [ ] Login to Koyeb Dashboard
2. [ ] Go to "Database" section
3. [ ] Click "Create Database"
4. [ ] Select PostgreSQL
5. [ ] Choose **Hobby** plan (Free)
6. [ ] Name: `el-jarda-db`
7. [ ] Region: Europe/US (closest to users)
8. [ ] Click "Create"

### Step 2: Get Database Connection Details
After database creation, copy:
- [ ] Host
- [ ] Port (5432)
- [ ] Database name (koyebdb)
- [ ] Username (koyeb-adm)
- [ ] Password (generated)

## 🚀 App Deployment

### Step 1: Create App
1. [ ] Go to "Apps" section
2. [ ] Click "Create App"
3. [ ] Select "GitHub" as source
4. [ ] Connect your GitHub account
5. [ ] Select your repository

### Step 2: Configure Build Settings
- [ ] **Build command**: `npm run build`
- [ ] **Start command**: `npm start`
- [ ] **Port**: `8000`
- [ ] **Health check**: `/api/health`

### Step 3: Add Environment Variables
1. [ ] Click "Environment" tab
2. [ ] Add all required environment variables
3. [ ] **Important**: Do NOT add `MOCK_DB=true`

### Step 4: Deploy
1. [ ] Click "Deploy"
2. [ ] Wait for build to complete (5-10 minutes)
3. [ ] Check build logs if errors occur

## 🔍 Post-Deployment Testing

### Step 1: Basic Health Check
- [ ] Visit: `https://your-app.koyeb.app/api/health`
- [ ] Should return: `{"status":"ok","message":"El Jarda Server is running"}`

### Step 2: Frontend Testing
- [ ] Visit: `https://your-app.koyeb.app`
- [ ] Homepage loads correctly
- [ ] Arabic/French text displays properly
- [ ] Products section loads
- [ ] Logo and styling look correct

### Step 3: Admin Panel Testing
- [ ] Click "Admin" button
- [ ] Login with credentials:
  - Username: `ayoub`
  - Password: `A4y4o2u0b0z0`
- [ ] **Change password immediately**
- [ ] Test adding a product
- [ ] Test uploading an image
- [ ] Test editing a product
- [ ] Test deleting a product

### Step 4: Contact Form Testing
- [ ] Click "Contact" button
- [ ] Fill out contact form
- [ ] Submit form
- [ ] Check if email is received at `contact@eljarda.com`

## 🔧 Common Issues & Solutions

### Build Fails
```bash
# Check build logs in Koyeb dashboard
# Usually Node.js version or dependency issues
```

### Database Connection Issues
- [ ] Verify all DATABASE_* variables are correct
- [ ] Check PostgreSQL service is running
- [ ] Ensure no typos in connection string

### CORS Issues
- [ ] Add your app URL to `ALLOWED_ORIGIN` environment variable
- [ ] Format: `https://your-app.koyeb.app`
- [ ] Redeploy after adding

### Images Not Loading
- [ ] Check file upload functionality
- [ ] Verify `/uploads` directory permissions
- [ ] Test with small image files first

## 🔐 Security Configuration

### After First Login:
1. [ ] Change default admin password
2. [ ] Use strong password (12+ characters)
3. [ ] Keep login credentials secure

### Environment Security:
- [ ] Use strong JWT_SECRET (64+ characters)
- [ ] Never commit environment variables
- [ ] Use HTTPS only (Koyeb provides this)

## 📋 Final Verification

### App Functionality:
- [ ] ✅ Homepage loads
- [ ] ✅ Product catalog displays
- [ ] ✅ Admin login works
- [ ] ✅ Product management works
- [ ] ✅ Contact form works
- [ ] ✅ Email notifications work
- [ ] ✅ Image uploads work
- [ ] ✅ Both languages display correctly

### Performance:
- [ ] ✅ Page loads quickly
- [ ] ✅ Images load properly
- [ ] ✅ No JavaScript errors in console
- [ ] ✅ Mobile responsiveness works

### Business Ready:
- [ ] ✅ Contact information is correct
- [ ] ✅ Products are added
- [ ] ✅ Admin password changed
- [ ] ✅ Email delivery tested

---

## 🎉 Congratulations!

Your El Jarda gardening website is now live on Koyeb! 

**Your website**: `https://your-app.koyeb.app`

### Next Steps:
1. Add your gardening products
2. Upload product images
3. Test all functionality
4. Share your website with customers
5. Consider adding a custom domain

**🌱 Your garden business is now online! 🌱**
