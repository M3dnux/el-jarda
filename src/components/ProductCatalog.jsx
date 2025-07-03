import React, { useState } from 'react'

const ProductCatalog = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { value: 'all', label: 'جميع المنتجات / Tous les produits' },
    { value: 'lawn-care', label: 'العناية بالعشب / Soin pelouse' },
    { value: 'fertilizers', label: 'أسمدة / Engrais' },
    { value: 'seeds', label: 'بذور / Graines' },
    { value: 'tools', label: 'أدوات / Outils' },
    { value: 'plants', label: 'نباتات / Plantes' },
    { value: 'irrigation', label: 'ري / Irrigation' }
  ]

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.nameAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.nameFr.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.descriptionFr.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const getProductIcon = (category) => {
    const icons = {
      'lawn-care': '🌱',
      'fertilizers': '🌾',
      'seeds': '🌰',
      'tools': '🔧',
      'plants': '🌸',
      'irrigation': '💧'
    }
    return icons[category] || '🌿'
  }

  return (
    <section className="product-catalog" id="products">
      <div className="catalog-header">
        <h2>منتجاتنا / Nos Produits</h2>
        <p>
          مجموعة شاملة من منتجات الحدائق عالية الجودة لتلبية جميع احتياجاتك في جميع أنحاء تونس
        </p>
        <p style={{ marginTop: '0.5rem', fontSize: '1rem' }}>
          Une gamme complète de produits de jardinage de haute qualité pour répondre à tous vos besoins dans toute la Tunisie
        </p>
      </div>

      <div className="search-filter-container">
        <input
          type="text"
          placeholder="البحث في المنتجات... / Rechercher des produits..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="filter-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
      </div>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                {product.image ? (
                  <img 
                    src={`${process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001'}${product.image}`} 
                    alt={product.nameAr}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover' 
                    }}
                  />
                ) : (
                  <span style={{ fontSize: '4rem' }}>
                    {getProductIcon(product.category)}
                  </span>
                )}
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.nameAr}</h3>
                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                  {product.nameFr}
                </p>
                <div className="product-price">{product.price} د.ت</div>
                <div className="product-category">
                  {categories.find(cat => cat.value === product.category)?.label || product.category}
                </div>
                <p className="product-description">{product.description}</p>
                <p style={{ fontSize: '0.9rem', color: '#666', fontStyle: 'italic' }}>
                  {product.descriptionFr}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div style={{ 
            gridColumn: '1 / -1', 
            textAlign: 'center', 
            padding: '3rem',
            color: '#666' 
          }}>
            <h3>لا توجد منتجات متطابقة / Aucun produit correspondant</h3>
            <p>جرب تغيير معايير البحث / Essayez de modifier les critères de recherche</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductCatalog
