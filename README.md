# 🌱 الجردة | El Jarda

A modern, bilingual (Arabic/French) gardening business website for El Jarda in Sfax, Tunisia. Built with React, Vite, and PostgreSQL.

## 🏪 Features

- **Bilingual Support**: All content in Arabic and French
- **Product Catalog**: Lawn care, fertilizers, seeds, tools, plants, irrigation
- **Admin Panel**: Product management with authentication
- **Contact Form**: Email integration for customer inquiries
- **Responsive Design**: Mobile-friendly interface

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, CSS Modules
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT, bcryptjs
- **Deployment**: Docker ready, Koyeb compatible

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 12+

### Local Development
1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   Copy `.env.example` to `.env` and update with your credentials:
   ```env
   DATABASE_HOST=your-postgres-host
   DATABASE_USER=your-username
   DATABASE_PASSWORD=your-password
   DATABASE_NAME=your-database
   JWT_SECRET=your-jwt-secret
   ```

3. **Run the application**
   ```bash
   npm run dev:all
   ```

## 📦 Deployment

### Koyeb Deployment
1. Set environment variables in Koyeb dashboard
2. Connect your GitHub repository
3. Deploy with automatic builds

### Docker Deployment
```bash
docker build -t el-jarda .
docker run -p 8000:8000 el-jarda
```

## 🔐 Admin Access

- **Username**: admin  
- **Password**: ElJarda2024!

## 📧 Contact

- **Website**: www.eljarda.com
- **Email**: contact@eljarda.com
- **Phone**: 26503701 / 40279250
- **Location**: Chihia, Sfax, Tunisia

## 📄 License

This project is proprietary software for El Jarda gardening business.

---

**Built with ❤️ for El Jarda gardening business in Tunisia** 🇹🇳
   DB_NAME=el_jarda
   DB_USER=postgres
   DB_PASSWORD=your_password
   JWT_SECRET=your-secret-key
   ```

3. **Start development**
   ```bash
   # Frontend (Vite dev server)
   npm run dev
   
   # Backend (in another terminal)  
   npm run server
   ```

4. **Access application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## Deployment on Koyeb 🚀

Koyeb is the recommended platform for deploying El Jarda with their free PostgreSQL database.

### Quick Deployment Steps:

1. **Create PostgreSQL Database**
   - Sign up at [koyeb.com](https://www.koyeb.com)
   - Go to "Data" → "Create Database" 
   - Choose PostgreSQL (free Hobby plan)

2. **Deploy Application**
   - Connect your GitHub repository
   - Set environment variables (see below)
   - Build command: `npm run build`
   - Start command: `npm start` (handled by `Procfile`)

3. **Required Environment Variables**
   ```env
   DATABASE_URL=postgresql://user:pass@host:port/db
   NODE_ENV=production
   JWT_SECRET=your-secret-key
   PORT=8000
   ```

4. **Optional Environment Variables**
   ```env
   ALLOWED_ORIGIN=https://your-domain.com
   MAX_FILE_SIZE=5242880
   ALLOWED_FILE_TYPES=jpeg,jpg,png,gif,webp
   ```

📋 **Complete deployment guide**: See `KOYEB-DEPLOYMENT.md`

### Files for Koyeb Deployment:
- ✅ `Procfile` - Process definition
- ✅ `Dockerfile` - Container configuration  
- ✅ `.env.example` - Environment template
- ✅ Production-ready CORS and SSL configuration

## API Endpoints

### Authentication
- `POST /api/login` - Admin login
- `POST /api/change-password` - Change admin password

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin) 
- `DELETE /api/products/:id` - Delete product (admin)

### Contact
- `POST /api/contact` - Send contact form

## Database Schema

Auto-created tables:
- `admin_users` - Admin authentication
- `products` - Product catalog
- `categories` - Product categories

Default admin:
- Username: `admin`
- Password: `admin123`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `JWT_SECRET` | Secret for JWT tokens | ✅ |
| `PORT` | Server port | No (default: 3001) |
| `NODE_ENV` | Environment mode | No |
| `DB_HOST` | Database host | No (fallback) |
| `DB_PORT` | Database port | No (fallback) |
| `DB_NAME` | Database name | No (fallback) |
| `DB_USER` | Database user | No (fallback) |
| `DB_PASSWORD` | Database password | No (fallback) |
- **Responsive Design**: Works on all devices

### 🔧 Admin Panel
- **Add Products**: Create new products with bilingual descriptions
- **Edit Products**: Update existing product information
- **Delete Products**: Remove products with confirmation
- **Form Validation**: Ensures data quality

### 🎨 Design Features
- **Garden Theme**: Beautiful green color palette
- **Professional Layout**: Clean, modern interface
- **Local Focus**: Designed for Tunisian market
- **Accessibility**: WCAG compliant design

## Technology Stack

- **Frontend**: React 18 with functional components and hooks
- **Build Tool**: Vite for fast development and builds
- **Styling**: Modern CSS with CSS variables and Grid/Flexbox
- **Languages**: Arabic (RTL) and French support

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd jarda
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation header
│   ├── Hero.jsx           # Hero section with business intro
│   ├── ProductCatalog.jsx # Product display and filtering
│   ├── AdminPanel.jsx     # Admin interface for products
│   ├── ProductForm.jsx    # Add/edit product form
│   └── Footer.jsx         # Footer with contact info
├── App.jsx                # Main application component
├── App.css               # Main stylesheet with garden theme
├── index.css             # Global styles
└── main.jsx              # React entry point
```

## Default Products

The website comes with sample gardening products including:
- منتجات العناية بالعشب / Produits de soin pour pelouse
- أسمدة طبيعية وكيماوية / Engrais naturels et chimiques
- بذور الخضروات / Graines de légumes
- أدوات الحدائق / Outils de jardinage
- نباتات الزينة / Plantes ornementales
- نظم الري / Systèmes d'irrigation

## Customization

### Adding Your Logo
Replace the emoji icon in `Header.jsx` with your actual logo image.

### Updating Contact Information
Edit the contact details in `Footer.jsx` to match your business information.

### Modifying Colors
Update the CSS variables in `App.css` to match your brand colors:

```css
:root {
  --primary-green: #2d5016;
  --secondary-green: #4a7c59;
  --light-green: #7fb069;
  /* ... */
}
```

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact: contact@eljarda.com

---

**Built with ❤️ for the gardening community in Tunisia**
