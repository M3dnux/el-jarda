// Real Data Seeder for El Jarda Gardening Business
// This script populates the database with realistic gardening products

import pg from 'pg';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Production database configuration
const dbConfig = {
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  ssl: { rejectUnauthorized: false },
  port: process.env.DATABASE_PORT || 5432
};

const pool = new Pool(dbConfig);

// Real gardening products data
const realProducts = [
  // Seeds
  {
    name: 'Tomato Seeds - Cherry Red',
    nameAr: 'بذور الطماطم الحمراء الكرزية',
    description: 'Premium cherry tomato seeds, perfect for Mediterranean climate. High yield variety.',
    descriptionAr: 'بذور طماطم كرزية عالية الجودة، مثالية للمناخ المتوسطي. صنف عالي الإنتاج.',
    price: 12.50,
    category: 'seeds',
    image_url: null
  },
  {
    name: 'Basil Seeds - Genovese',
    nameAr: 'بذور الريحان الجنويز',
    description: 'Aromatic Genovese basil seeds, ideal for cooking and companion planting.',
    descriptionAr: 'بذور ريحان جنويز عطرة، مثالية للطبخ والزراعة المختلطة.',
    price: 8.75,
    category: 'seeds',
    image_url: null
  },
  {
    name: 'Lettuce Seeds Mix',
    nameAr: 'خليط بذور الخس',
    description: 'Mixed variety lettuce seeds including romaine, iceberg, and butterhead.',
    descriptionAr: 'خليط من بذور الخس يشمل الروماني والجليدي وراس الزبدة.',
    price: 6.25,
    category: 'seeds',
    image_url: null
  },
  {
    name: 'Pepper Seeds - Hot Chili',
    nameAr: 'بذور الفلفل الحار',
    description: 'Spicy chili pepper seeds, perfect for North African cuisine.',
    descriptionAr: 'بذور فلفل حار، مثالية للمطبخ الشمال أفريقي.',
    price: 15.00,
    category: 'seeds',
    image_url: null
  },

  // Fertilizers
  {
    name: 'Organic Compost 20kg',
    nameAr: 'سماد عضوي 20 كيلو',
    description: 'Premium organic compost made from decomposed plant matter. Rich in nutrients.',
    descriptionAr: 'سماد عضوي عالي الجودة مصنوع من المواد النباتية المتحللة. غني بالعناصر الغذائية.',
    price: 35.00,
    category: 'fertilizers',
    image_url: null
  },
  {
    name: 'NPK Fertilizer 10-10-10',
    nameAr: 'سماد NPK 10-10-10',
    description: 'Balanced NPK fertilizer for general garden use. Promotes healthy growth.',
    descriptionAr: 'سماد NPK متوازن للاستخدام العام في الحديقة. يعزز النمو الصحي.',
    price: 28.50,
    category: 'fertilizers',
    image_url: null
  },
  {
    name: 'Liquid Seaweed Fertilizer',
    nameAr: 'سماد الأعشاب البحرية السائل',
    description: 'Natural seaweed extract fertilizer, excellent for foliar feeding.',
    descriptionAr: 'سماد طبيعي من مستخلص الأعشاب البحرية، ممتاز للتغذية الورقية.',
    price: 22.75,
    category: 'fertilizers',
    image_url: null
  },

  // Tools
  {
    name: 'Garden Spade - Stainless Steel',
    nameAr: 'مجرفة الحديقة - ستانلس ستيل',
    description: 'Professional grade stainless steel spade with ergonomic wooden handle.',
    descriptionAr: 'مجرفة من الستانلس ستيل بدرجة احترافية مع مقبض خشبي مريح.',
    price: 45.00,
    category: 'tools',
    image_url: null
  },
  {
    name: 'Pruning Shears Set',
    nameAr: 'طقم مقصات التقليم',
    description: 'High-quality pruning shears for trimming bushes and small branches.',
    descriptionAr: 'مقصات تقليم عالية الجودة لتقليم الشجيرات والأغصان الصغيرة.',
    price: 32.00,
    category: 'tools',
    image_url: null
  },
  {
    name: 'Garden Hoe - Traditional',
    nameAr: 'فأس الحديقة التقليدي',
    description: 'Traditional Tunisian-style garden hoe for soil cultivation.',
    descriptionAr: 'فأس حديقة تونسي تقليدي لحراثة التربة.',
    price: 38.50,
    category: 'tools',
    image_url: null
  },
  {
    name: 'Watering Can 10L',
    nameAr: 'إناء الري 10 لتر',
    description: 'Galvanized steel watering can with removable rose head.',
    descriptionAr: 'إناء ري من الصلب المجلفن مع رأس قابل للإزالة.',
    price: 25.00,
    category: 'tools',
    image_url: null
  },

  // Plants
  {
    name: 'Olive Tree Sapling',
    nameAr: 'شتلة شجرة زيتون',
    description: 'Young olive tree sapling, variety Chemlali - native to Tunisia.',
    descriptionAr: 'شتلة شجرة زيتون صغيرة، صنف شملالي - محلي في تونس.',
    price: 85.00,
    category: 'plants',
    image_url: null
  },
  {
    name: 'Rose Bush - Damask',
    nameAr: 'شجيرة ورد دمشقي',
    description: 'Fragrant Damask rose bush, perfect for Mediterranean gardens.',
    descriptionAr: 'شجيرة ورد دمشقي عطر، مثالية للحدائق المتوسطية.',
    price: 42.00,
    category: 'plants',
    image_url: null
  },
  {
    name: 'Lavender Plant',
    nameAr: 'نبتة الخزامى',
    description: 'Aromatic lavender plant, drought-resistant and attracts bees.',
    descriptionAr: 'نبتة خزامى عطرة، مقاومة للجفاف وتجذب النحل.',
    price: 18.50,
    category: 'plants',
    image_url: null
  },
  {
    name: 'Mint Plant - Spearmint',
    nameAr: 'نبتة النعناع',
    description: 'Fresh spearmint plant, essential for Tunisian tea culture.',
    descriptionAr: 'نبتة نعناع طازجة، أساسية لثقافة الشاي التونسي.',
    price: 12.00,
    category: 'plants',
    image_url: null
  },

  // Irrigation
  {
    name: 'Drip Irrigation Kit',
    nameAr: 'طقم الري بالتنقيط',
    description: 'Complete drip irrigation system for 50 plants. Water-efficient.',
    descriptionAr: 'نظام ري بالتنقيط كامل لـ 50 نبتة. موفر للمياه.',
    price: 125.00,
    category: 'irrigation',
    image_url: null
  },
  {
    name: 'Garden Sprinkler',
    nameAr: 'رشاش الحديقة',
    description: 'Adjustable garden sprinkler with 360-degree rotation.',
    descriptionAr: 'رشاش حديقة قابل للتعديل مع دوران 360 درجة.',
    price: 55.00,
    category: 'irrigation',
    image_url: null
  },
  {
    name: 'Water Timer - Automatic',
    nameAr: 'مؤقت المياه الأوتوماتيكي',
    description: 'Digital water timer for automatic irrigation scheduling.',
    descriptionAr: 'مؤقت مياه رقمي لجدولة الري الأوتوماتيكي.',
    price: 75.00,
    category: 'irrigation',
    image_url: null
  },

  // Lawn Care
  {
    name: 'Grass Seed - Bermuda',
    nameAr: 'بذور العشب البرمودي',
    description: 'Heat-resistant Bermuda grass seed, perfect for Tunisian climate.',
    descriptionAr: 'بذور عشب برمودي مقاوم للحرارة، مثالي للمناخ التونسي.',
    price: 48.00,
    category: 'lawn-care',
    image_url: null
  },
  {
    name: 'Lawn Fertilizer 5kg',
    nameAr: 'سماد العشب 5 كيلو',
    description: 'Specialized fertilizer for lawn grass, promotes thick green growth.',
    descriptionAr: 'سماد متخصص لعشب الحديقة، يعزز النمو الأخضر الكثيف.',
    price: 32.50,
    category: 'lawn-care',
    image_url: null
  },
  {
    name: 'Grass Cutter - Manual',
    nameAr: 'قاطع العشب اليدوي',
    description: 'Manual grass cutter for small lawns and precise trimming.',
    descriptionAr: 'قاطع عشب يدوي للحدائق الصغيرة والتقليم الدقيق.',
    price: 65.00,
    category: 'lawn-care',
    image_url: null
  }
];

// Real categories data
const realCategories = [
  { name: 'seeds', nameAr: 'البذور' },
  { name: 'fertilizers', nameAr: 'الأسمدة' },
  { name: 'tools', nameAr: 'الأدوات' },
  { name: 'plants', nameAr: 'النباتات' },
  { name: 'irrigation', nameAr: 'الري' },
  { name: 'lawn-care', nameAr: 'العناية بالعشب' }
];

async function seedDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('🌱 Starting database seeding with real data...');
    
    await client.query('BEGIN');

    // Create tables if they don't exist
    console.log('🏗️ Creating database tables...');
    
    // Create admin_users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create categories table
    await client.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        nameAr VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create products table
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        nameAr VARCHAR(255),
        description TEXT,
        descriptionAr TEXT,
        price DECIMAL(10,2),
        category VARCHAR(100),
        image_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create indexes
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_products_category ON products(category)
    `);
    
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at)
    `);

    console.log('✅ Database tables created/verified');

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await client.query('DELETE FROM products');
    await client.query('DELETE FROM admin_users');

    // Reset sequences  
    await client.query('ALTER SEQUENCE products_id_seq RESTART WITH 1');
    await client.query('ALTER SEQUENCE admin_users_id_seq RESTART WITH 1');

    // Insert admin user
    console.log('👤 Creating admin user...');
    const hashedPassword = await bcrypt.hash('ElJarda2024!', 10);
    await client.query(
      'INSERT INTO admin_users (username, password) VALUES ($1, $2)',
      ['admin', hashedPassword]
    );
    console.log('✅ Admin user created: username=admin, password=ElJarda2024!');

    // Insert categories - Skip since table doesn't exist
    console.log('📂 Skipping categories (table not found)...');

    // Insert products
    console.log('🌿 Inserting products...');
    for (const product of realProducts) {
      await client.query(
        `INSERT INTO products (name_fr, name_ar, description_fr, description_ar, price, category, image_path) 
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          product.name,
          product.nameAr,
          product.description,
          product.descriptionAr,
          product.price,
          product.category,
          product.image_url
        ]
      );
    }
    console.log(`✅ Inserted ${realProducts.length} products`);

    await client.query('COMMIT');
    
    console.log('🎉 Database seeding completed successfully!');
    console.log('');
    console.log('📊 Summary:');
    console.log(`   • Admin Users: 1`);
    console.log(`   • Products: ${realProducts.length}`);
    console.log('');
    console.log('🔐 Admin Credentials:');
    console.log('   Username: admin');
    console.log('   Password: ElJarda2024!');
    console.log('');
    console.log('🌐 Your El Jarda website is ready with real data!');
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error seeding database:', error.message);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Run the seeder
seedDatabase().catch(console.error);
