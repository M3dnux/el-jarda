import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

import { Database, testConnection, initializeDatabase } from './database.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // In development, allow localhost on any port
    if (process.env.NODE_ENV !== 'production') {
      if (origin.match(/^http:\/\/localhost:\d+$/) || origin.match(/^http:\/\/127\.0\.0\.1:\d+$/)) {
        return callback(null, true);
      }
    }
    
    // Allow specific origins for development
    const allowedOrigins = [
      'http://localhost:5173', 
      'http://localhost:5174',
      'https://eljarda.com',
      'https://www.eljarda.com'
      // Add your Koyeb app URL here when deployed
      // 'https://your-app-name.koyeb.app'
    ];
    
    // In production, also allow Koyeb domains
    if (process.env.NODE_ENV === 'production') {
      // Allow any .koyeb.app subdomain
      if (origin && origin.match(/^https:\/\/.*\.koyeb\.app$/)) {
        return callback(null, true);
      }
      // Allow your custom domain if you have one
      if (process.env.ALLOWED_ORIGIN && origin === process.env.ALLOWED_ORIGIN) {
        return callback(null, true);
      }
    }
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // In production, be more restrictive
    if (process.env.NODE_ENV === 'production') {
      return callback(new Error('Not allowed by CORS'));
    }
    
    // In development, allow all origins
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Email configuration for Zoho
const emailTransporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 587,
  secure: false, // Use STARTTLS
  auth: {
    user: 'contact@eljarda.com',
    pass: 'sCqkTXLa3wUJ' // Application-Specific Password
  }
});

// Verify email configuration
emailTransporter.verify((error, success) => {
  if (error) {
    console.log('❌ Email configuration error:', error);
  } else {
    console.log('✅ Email server is ready to send messages');
  }
});

// Initialize PostgreSQL Database
async function initializeApp() {
  try {
    // Test database connection
    await testConnection();
    
    // Initialize database tables
    await initializeDatabase();
    
    // Create default admin user if none exists
    const adminCount = await Database.get('SELECT COUNT(*) as count FROM admin_users');
    if (adminCount.count === 0) {
      const hashedPassword = bcrypt.hashSync('A4y4o2u0b0z0', 10);
      await Database.query(
        'INSERT INTO admin_users (username, password) VALUES ($1, $2)',
        ['ayoub', hashedPassword]
      );
      console.log('Default admin user created: username=ayoub');
    }

    // Insert sample products if none exist
    const productCount = await Database.get('SELECT COUNT(*) as count FROM products');
    if (productCount.count === 0) {
      const sampleProducts = [
        {
          nameAr: 'منتجات العناية بالعشب',
          nameFr: 'Produits de soin pour pelouse',
          price: 35,
          category: 'lawn-care',
          descriptionAr: 'مجموعة شاملة من منتجات العناية بالعشب للحصول على حديقة خضراء جميلة',
          descriptionFr: 'Gamme complète de produits pour l\'entretien de la pelouse pour un beau jardin vert',
          imagePath: null
        },
        {
          nameAr: 'أسمدة طبيعية وكيماوية',          nameFr: 'Engrais naturels et chimiques',
          price: 25,
          category: 'fertilizers',
          descriptionAr: 'أسمدة طبيعية عضوية وكيماوية لتغذية النباتات بشكل صحي ومتوازن',
          descriptionFr: 'Engrais organiques naturels et chimiques pour nourrir sainement et équilibrement les plantes',
          imagePath: null
        },
        {
          nameAr: 'بذور الخضروات',
          nameFr: 'Graines de légumes',
          price: 15,
          category: 'seeds',
          descriptionAr: 'بذور خضروات عالية الجودة مناسبة للمناخ التونسي في جميع أنحاء البلاد',
          descriptionFr: 'Graines de légumes de haute qualité adaptées au climat tunisien dans tout le pays',
          imagePath: null
        },
        {
          nameAr: 'أدوات الحدائق',
          nameFr: 'Outils de jardinage',
          price: 45,
          category: 'tools',
          descriptionAr: 'مجموعة من أدوات الحدائق عالية الجودة للمحترفين والهواة',
          descriptionFr: 'Ensemble d\'outils de jardinage de haute qualité pour professionnels et amateurs',
          imagePath: null
        },
        {
          nameAr: 'نباتات الزينة',
          nameFr: 'Plantes ornementales',
          price: 20,
          category: 'plants',
          descriptionAr: 'نباتات زينة جميلة لتزيين الحدائق والمنازل',
          descriptionFr: 'Belles plantes ornementales pour décorer jardins et maisons',
          imagePath: null
        },
        {
          nameAr: 'نظم الري',
          nameFr: 'Systèmes d\'irrigation',
          price: 65,
          category: 'irrigation',
          descriptionAr: 'أنظمة ري حديثة وفعالة لتوفير المياه',
          descriptionFr: 'Systèmes d\'irrigation modernes et efficaces pour économiser l\'eau',
          imagePath: null
        }
      ];

      for (const product of sampleProducts) {
        await Database.query(
          `INSERT INTO products (name_ar, name_fr, price, category, description_ar, description_fr, image_path)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            product.nameAr,
            product.nameFr,
            product.price,
            product.category,
            product.descriptionAr,
            product.descriptionFr,
            product.imagePath
          ]
        );
      }

      console.log('Sample products inserted into database');
    }
    
    console.log('🗄️  Database initialization complete');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../public/uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
    }
  }
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Auth Routes
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const user = await Database.get('SELECT * FROM admin_users WHERE username = $1', [username]);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: { id: user.id, username: user.username }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new passwords required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters long' });
    }

    const user = await Database.get('SELECT * FROM admin_users WHERE id = $1', [req.user.id]);

    if (!user || !bcrypt.compareSync(currentPassword, user.password)) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
    await Database.query('UPDATE admin_users SET password = $1 WHERE id = $2', [hashedNewPassword, req.user.id]);

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/forgot-password', async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: 'Username required' });
    }

    const user = await Database.get('SELECT * FROM admin_users WHERE username = $1', [username]);

    if (!user) {
      // Don't reveal if user exists or not for security
      return res.json({ success: true, message: 'If the username exists, password reset instructions have been sent.' });
    }

    // Log the password reset request for manual handling
    console.log(`🔐 Password reset requested for user: ${username}`);
    console.log(`📧 Send reset instructions to: ayoub.zouch@gmail.com`);
    console.log(`⏰ Request time: ${new Date().toISOString()}`);
    
    // In a real application, you would send an email here
    // For now, we'll just log the request and send a success response
    
    res.json({ 
      success: true, 
      message: 'Password reset instructions have been sent to the administrator email.' 
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Name, email, and message are required / Nom, email et message sont requis' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Invalid email format / Format d\'email invalide' 
      });
    }

    // Prepare email content
    const subjectLine = subject || 'رسالة جديدة من موقع الجردة / Nouveau message du site El Jarda';
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 10px;">
        <div style="background: linear-gradient(135deg, #2d5016, #4a7c59); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">🌱 رسالة جديدة من الجردة</h1>
          <h2 style="margin: 5px 0 0 0; font-size: 18px;">Nouveau message d'El Jarda</h2>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 0 0 10px 10px;">
          <h3 style="color: #2d5016; border-bottom: 2px solid #7fb069; padding-bottom: 10px;">📋 تفاصيل الرسالة / Détails du message</h3>
          
          <div style="margin: 15px 0;">
            <strong style="color: #2d5016;">👤 الاسم / Nom:</strong> ${name}
          </div>
          
          <div style="margin: 15px 0;">
            <strong style="color: #2d5016;">📧 البريد الإلكتروني / Email:</strong> 
            <a href="mailto:${email}" style="color: #4a7c59; text-decoration: none;">${email}</a>
          </div>
          
          ${phone ? `
          <div style="margin: 15px 0;">
            <strong style="color: #2d5016;">📱 الهاتف / Téléphone:</strong> 
            <a href="tel:${phone}" style="color: #4a7c59; text-decoration: none;">${phone}</a>
          </div>
          ` : ''}
          
          ${subject ? `
          <div style="margin: 15px 0;">
            <strong style="color: #2d5016;">📌 الموضوع / Sujet:</strong> ${subject}
          </div>
          ` : ''}
          
          <div style="margin: 15px 0;">
            <strong style="color: #2d5016;">💬 الرسالة / Message:</strong>
            <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #7fb069; margin-top: 10px; border-radius: 5px; white-space: pre-wrap;">${message}</div>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #e8f5e8; border-radius: 5px; text-align: center;">
            <p style="margin: 0; color: #2d5016; font-weight: bold;">⏰ وقت الإرسال / Heure d'envoi:</p>
            <p style="margin: 5px 0 0 0; color: #666;">${new Date().toLocaleString('ar-TN', { 
              timeZone: 'Africa/Tunis',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #666; font-size: 14px;">
          <p>🌱 هذه الرسالة من موقع الجردة الرسمي / Ce message provient du site officiel d'El Jarda</p>
          <p>📧 contact@eljarda.com | 📱 26503701 / 40279250 | 🏠 شيحية صفاقس، تونس</p>
        </div>
      </div>
    `;

    // Send email
    const mailOptions = {
      from: '"موقع الجردة / Site El Jarda" <contact@eljarda.com>',
      to: 'contact@eljarda.com',
      subject: `🌱 ${subjectLine}`,
      html: emailContent,
      replyTo: email
    };

    await emailTransporter.sendMail(mailOptions);

    // Log successful contact
    console.log(`📧 New contact message received:`);
    console.log(`   From: ${name} (${email})`);
    console.log(`   Subject: ${subject || 'No subject'}`);
    console.log(`   Phone: ${phone || 'Not provided'}`);
    console.log(`   Time: ${new Date().toISOString()}`);

    res.json({ 
      success: true, 
      message: 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً / Message envoyé avec succès! Nous vous contacterons bientôt'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      error: 'فشل في إرسال الرسالة. يرجى المحاولة لاحقاً / Échec de l\'envoi du message. Veuillez réessayer plus tard'
    });
  }
});

// Product Routes
app.get('/api/products', async (req, res) => {
  try {
    const products = await Database.all('SELECT * FROM products ORDER BY created_at DESC');

    const formattedProducts = products.map(product => ({
      id: product.id,
      nameAr: product.name_ar,
      nameFr: product.name_fr,
      price: product.price,
      category: product.category,
      description: product.description_ar,
      descriptionFr: product.description_fr,
      image: product.image_path ? `/uploads/${path.basename(product.image_path)}` : null,
      createdAt: product.created_at,
      updatedAt: product.updated_at
    }));

    res.json(formattedProducts);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/products', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { nameAr, nameFr, price, category, descriptionAr, descriptionFr } = req.body;

    if (!nameAr || !nameFr || !price || !category || !descriptionAr || !descriptionFr) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const imagePath = req.file ? req.file.filename : null;

    const result = await Database.insert(
      `INSERT INTO products (name_ar, name_fr, price, category, description_ar, description_fr, image_path)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [nameAr, nameFr, parseFloat(price), category, descriptionAr, descriptionFr, imagePath]
    );

    const newProduct = {
      id: result.id,
      nameAr,
      nameFr,
      price: parseFloat(price),
      category,
      description: descriptionAr,
      descriptionFr,
      image: imagePath ? `/uploads/${imagePath}` : null
    };

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Add product error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/products/:id', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const { nameAr, nameFr, price, category, descriptionAr, descriptionFr } = req.body;

    if (!nameAr || !nameFr || !price || !category || !descriptionAr || !descriptionFr) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Get current product to handle image replacement
    const currentProduct = await Database.get('SELECT * FROM products WHERE id = $1', [productId]);

    if (!currentProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    let imagePath = currentProduct.image_path;

    // If new image is uploaded, delete old one and use new one
    if (req.file) {
      if (currentProduct.image_path) {
        const oldImagePath = path.join(__dirname, '../public/uploads', path.basename(currentProduct.image_path));
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      imagePath = req.file.filename;
    }

    await Database.query(`
      UPDATE products 
      SET name_ar = $1, name_fr = $2, price = $3, category = $4, 
          description_ar = $5, description_fr = $6, image_path = $7, updated_at = CURRENT_TIMESTAMP
      WHERE id = $8
    `, [nameAr, nameFr, parseFloat(price), category, descriptionAr, descriptionFr, imagePath, productId]);

    const updatedProduct = {
      id: productId,
      nameAr,
      nameFr,
      price: parseFloat(price),
      category,
      description: descriptionAr,
      descriptionFr,
      image: imagePath ? `/uploads/${path.basename(imagePath)}` : null
    };

    res.json(updatedProduct);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/products/:id', authenticateToken, async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    // Get product to delete associated image
    const currentProduct = await Database.get('SELECT * FROM products WHERE id = $1', [productId]);

    if (!currentProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Delete associated image file
    if (currentProduct.image_path) {
      const imagePath = path.join(__dirname, '../public/uploads', path.basename(currentProduct.image_path));
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    const result = await Database.query('DELETE FROM products WHERE id = $1', [productId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Verify token endpoint
app.get('/api/verify-token', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
  // Serve static assets with proper headers
  app.use(express.static(path.join(__dirname, '../dist'), {
    maxAge: '1y',
    etag: false,
    setHeaders: (res, filePath) => {
      // Set proper content types for different file types
      if (filePath.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      } else if (filePath.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      } else if (filePath.endsWith('.html')) {
        res.setHeader('Content-Type', 'text/html');
      }
    }
  }));
}

// Root endpoint for development
app.get('/', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    // This won't be reached in production due to the catch-all above
    return res.sendFile(path.join(__dirname, '../dist/index.html'));
  }
  res.json({
    message: 'El Jarda Gardening Business API',
    website: 'www.eljarda.com',
    email: 'contact@eljarda.com',
    endpoints: {
      health: '/api/health',
      products: '/api/products',
      admin: '/api/admin'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'El Jarda Server is running',
    website: 'www.eljarda.com',
    email: 'contact@eljarda.com',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 5MB.' });
    }
  }
  res.status(500).json({ error: error.message });
});

// Serve React app for all non-API routes (must be after all API routes)
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    // Skip if it's an API route
    if (req.path.startsWith('/api/')) {
      return res.status(404).json({ error: 'API endpoint not found' });
    }
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// Start server after database initialization
const startServer = async () => {
  try {
    await initializeApp();
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🌱 El Jarda Server running on port ${PORT}`);
      console.log(`📝 Admin access available`);
      console.log(`🔗 API URL: http://0.0.0.0:${PORT}/api`);
      console.log(`🏥 Health check: http://0.0.0.0:${PORT}/api/health`);
      console.log(`🌐 Website: www.eljarda.com`);
      console.log(`📧 Contact: contact@eljarda.com`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Graceful shutdown handling for Koyeb
process.on('SIGTERM', async () => {
  console.log('🔄 Received SIGTERM, shutting down gracefully...');
  console.log('🔄 Closing database connections...');
  await Database.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🔄 Received SIGINT, shutting down gracefully...');
  console.log('🔄 Closing database connections...');
  await Database.close();
  process.exit(0);
});

export default app;
