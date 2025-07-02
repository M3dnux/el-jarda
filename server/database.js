import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Database configuration
const dbConfig = {
  // Use Koyeb environment variables if available (production)
  ...(process.env.DATABASE_HOST 
    ? {
        host: process.env.DATABASE_HOST,
        database: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        ssl: { rejectUnauthorized: false }, // Required for Koyeb
        port: 5432
      }
    : process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('postgresql://') 
    ? { connectionString: process.env.DATABASE_URL } 
    : {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_NAME || 'el_jarda',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'password',
      }),
  // SSL configuration for production
  ssl: process.env.NODE_ENV === 'production' || process.env.DATABASE_HOST 
    ? { rejectUnauthorized: false } 
    : false
};

// Create PostgreSQL connection pool
const pool = new Pool(dbConfig);

// Test database connection
const testConnection = async () => {
  // Check if we're in mock mode (when PostgreSQL is not available)
  if (process.env.MOCK_DB === 'true') {
    console.log('🔄 Running in mock database mode (PostgreSQL not required)');
    return;
  }
  
  try {
    const client = await pool.connect();
    console.log('✅ Connected to PostgreSQL database');
    console.log(`📍 Database: ${dbConfig.database || dbConfig.host}`);
    client.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('🔧 Connection config:', {
      host: dbConfig.host,
      database: dbConfig.database,
      user: dbConfig.user,
      ssl: !!dbConfig.ssl
    });
    console.log('💡 Tip: Set MOCK_DB=true in .env to run without PostgreSQL for development');
    throw error;
  }
};

// Initialize database tables
const initializeDatabase = async () => {
  // Skip initialization in mock mode
  if (process.env.MOCK_DB === 'true') {
    console.log('🔄 Skipping database initialization (mock mode)');
    return;
  }
  
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Create admin_users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create products table
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name_ar TEXT NOT NULL,
        name_fr TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        category VARCHAR(100) NOT NULL,
        description_ar TEXT NOT NULL,
        description_fr TEXT NOT NULL,
        image_path TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create indexes for better performance
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_products_category ON products(category)
    `);
    
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at)
    `);

    await client.query('COMMIT');
    console.log('✅ Database tables created successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Database initialization failed:', error.message);
    throw error;
  } finally {
    client.release();
  }
};

// Mock data for development
let mockAdminUsers = [
  {
    id: 1,
    username: 'admin',
    password: '$2a$10$8qWc8.VGOqrQZ4xVK4K4YO5i7B5RJ4bKX3u9W8t2gQ9y7g6n5mP0C', // admin123
    created_at: new Date()
  }
];

let mockProducts = [
  {
    id: 1,
    name: 'Organic Fertilizer',
    nameAr: 'سماد عضوي',
    description: 'High-quality organic fertilizer for all plants',
    descriptionAr: 'سماد عضوي عالي الجودة لجميع النباتات',
    price: 25.99,
    category: 'fertilizers',
    image_url: null,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 2,
    name: 'Garden Tools Set',
    nameAr: 'مجموعة أدوات البستنة',
    description: 'Complete set of essential garden tools',
    descriptionAr: 'مجموعة كاملة من أدوات البستنة الأساسية',
    price: 89.99,
    category: 'tools',
    image_url: null,
    created_at: new Date(),
    updated_at: new Date()
  }
];

let mockCategories = [
  { id: 1, name: 'fertilizers', nameAr: 'الأسمدة', created_at: new Date() },
  { id: 2, name: 'tools', nameAr: 'الأدوات', created_at: new Date() },
  { id: 3, name: 'seeds', nameAr: 'البذور', created_at: new Date() },
  { id: 4, name: 'plants', nameAr: 'النباتات', created_at: new Date() },
  { id: 5, name: 'irrigation', nameAr: 'الري', created_at: new Date() },
  { id: 6, name: 'lawn-care', nameAr: 'العناية بالعشب', created_at: new Date() }
];

// Database query helper functions
class Database {
  // Execute a query
  static async query(text, params = []) {
    if (process.env.MOCK_DB === 'true') {
      return this.mockQuery(text, params);
    }
    
    const client = await pool.connect();
    try {
      const result = await client.query(text, params);
      return result;
    } finally {
      client.release();
    }
  }

  static mockQuery(text, params) {
    const sql = text.toLowerCase().trim();
    
    if (sql.includes('select count(*) as count from admin_users')) {
      return { rows: [{ count: mockAdminUsers.length }] };
    }
    
    if (sql.includes('select count(*) as count from products')) {
      return { rows: [{ count: mockProducts.length }] };
    }
    
    if (sql.includes('select * from admin_users where username')) {
      const username = params[0];
      const user = mockAdminUsers.find(u => u.username === username);
      return { rows: user ? [user] : [] };
    }
    
    if (sql.includes('select * from products')) {
      return { rows: mockProducts };
    }
    
    if (sql.includes('select * from categories')) {
      return { rows: mockCategories };
    }
    
    if (sql.includes('insert into admin_users')) {
      const [username, password] = params;
      const newUser = {
        id: mockAdminUsers.length + 1,
        username,
        password,
        created_at: new Date()
      };
      mockAdminUsers.push(newUser);
      return { rows: [newUser] };
    }
    
    if (sql.includes('insert into products')) {
      const [name, nameAr, description, descriptionAr, price, category, image_url] = params;
      const newProduct = {
        id: mockProducts.length + 1,
        name, nameAr, description, descriptionAr, price, category, image_url,
        created_at: new Date(),
        updated_at: new Date()
      };
      mockProducts.push(newProduct);
      return { rows: [newProduct] };
    }
    
    if (sql.includes('update products')) {
      const id = params[params.length - 1];
      const productIndex = mockProducts.findIndex(p => p.id == id);
      if (productIndex !== -1) {
        const [name, nameAr, description, descriptionAr, price, category, image_url] = params;
        mockProducts[productIndex] = {
          ...mockProducts[productIndex],
          name, nameAr, description, descriptionAr, price, category, image_url,
          updated_at: new Date()
        };
        return { rows: [mockProducts[productIndex]] };
      }
      return { rows: [] };
    }
    
    if (sql.includes('delete from products')) {
      const id = params[0];
      const productIndex = mockProducts.findIndex(p => p.id == id);
      if (productIndex !== -1) {
        const deleted = mockProducts.splice(productIndex, 1);
        return { rows: deleted };
      }
      return { rows: [] };
    }
    
    if (sql.includes('update admin_users set password')) {
      const [password, username] = params;
      const userIndex = mockAdminUsers.findIndex(u => u.username === username);
      if (userIndex !== -1) {
        mockAdminUsers[userIndex].password = password;
        return { rows: [mockAdminUsers[userIndex]] };
      }
      return { rows: [] };
    }
    
    return { rows: [] };
  }

  // Get a single row
  static async get(text, params) {
    const result = await this.query(text, params);
    return result.rows[0] || null;
  }

  // Get all rows
  static async all(text, params) {
    const result = await this.query(text, params);
    return result.rows;
  }

  // Execute a query and return the number of affected rows
  static async run(text, params) {
    const result = await this.query(text, params);
    return result.rowCount;
  }

  // Insert and return the new row
  static async insert(text, params) {
    const result = await this.query(text + ' RETURNING *', params);
    return result.rows[0];
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🔄 Closing database connections...');
  await pool.end();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🔄 Closing database connections...');
  await pool.end();
  process.exit(0);
});

export { pool, Database, testConnection, initializeDatabase };
export default Database;
