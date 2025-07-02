import React, { useState } from 'react'
import ProductForm from './ProductForm'
import ChangePassword from './ChangePassword'
import ApiService from '../services/api'

const AdminPanel = ({ products, onAddProduct, onUpdateProduct, onDeleteProduct, onLogout }) => {
  const [showForm, setShowForm] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleFormSubmit = async (productData, imageFile) => {
    try {
      if (editingProduct) {
        const updatedProduct = await ApiService.updateProduct(editingProduct.id, productData, imageFile)
        onUpdateProduct(editingProduct.id, updatedProduct)
      } else {
        const newProduct = await ApiService.addProduct(productData, imageFile)
        onAddProduct(newProduct)
      }
      setShowForm(false)
      setEditingProduct(null)
    } catch (error) {
      throw error // Re-throw to be handled by ProductForm
    }
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingProduct(null)
  }

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟ / Êtes-vous sûr de supprimer ce produit?')) {
      try {
        await ApiService.deleteProduct(productId)
        onDeleteProduct(productId)
      } catch (error) {
        alert('خطأ في حذف المنتج / Erreur lors de la suppression: ' + error.message)
      }
    }
  }

  const handleLogout = () => {
    if (window.confirm('هل تريد تسجيل الخروج؟ / Voulez-vous vous déconnecter?')) {
      ApiService.logout()
      onLogout()
    }
  }

  const categories = [
    { value: 'lawn-care', label: 'العناية بالعشب / Soin pelouse' },
    { value: 'fertilizers', label: 'أسمدة / Engrais' },
    { value: 'seeds', label: 'بذور / Graines' },
    { value: 'tools', label: 'أدوات / Outils' },
    { value: 'plants', label: 'نباتات / Plantes' },
    { value: 'irrigation', label: 'ري / Irrigation' }
  ]

  const getCategoryLabel = (categoryValue) => {
    const category = categories.find(cat => cat.value === categoryValue)
    return category ? category.label : categoryValue
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>🔧 لوحة إدارة المنتجات / Panneau d'Administration</h2>
        <p>إدارة منتجات حديقة صفاقس / Gérer les produits de Jardin Sfax</p>
      </div>

      <div className="admin-actions">
        <button 
          className="admin-btn"
          onClick={() => setShowForm(true)}
          disabled={showForm}
        >
          ➕ إضافة منتج جديد / Ajouter un produit
        </button>
        
        <button 
          className="admin-btn"
          onClick={() => setShowPasswordForm(true)}
          disabled={showForm}
        >
          🔐 تغيير كلمة المرور / Changer le mot de passe
        </button>
        
        <button 
          className="admin-btn danger"
          onClick={handleLogout}
          disabled={showForm}
        >
          🚪 تسجيل الخروج / Se déconnecter
        </button>
        
        <div style={{ marginLeft: 'auto', color: '#666' }}>
          إجمالي المنتجات: {products.length} / Total produits: {products.length}
        </div>
      </div>

      {showForm && (
        <ProductForm
          product={editingProduct}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          categories={categories}
        />
      )}

      {showPasswordForm && (
        <ChangePassword onClose={() => setShowPasswordForm(false)} />
      )}

      <div className="admin-products-table">
        <table>
          <thead>
            <tr>
              <th>الصورة / Image</th>
              <th>الاسم / Nom</th>
              <th>السعر / Prix</th>
              <th>الفئة / Catégorie</th>
              <th>الوصف / Description</th>
              <th>الإجراءات / Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>
                  <div className="product-table-image">
                    {product.image ? (
                      <img 
                        src={`http://localhost:3001${product.image}`} 
                        alt={product.nameAr}
                        style={{ 
                          width: '50px', 
                          height: '50px', 
                          objectFit: 'cover', 
                          borderRadius: '8px',
                          border: '2px solid var(--accent-green)'
                        }}
                      />
                    ) : (
                      <div style={{
                        width: '50px',
                        height: '50px',
                        background: 'var(--light-green)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--white)',
                        fontSize: '1.5rem'
                      }}>
                        📷
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  <div>
                    <strong>{product.nameAr}</strong>
                    <br />
                    <small style={{ color: '#666' }}>{product.nameFr}</small>
                  </div>
                </td>
                <td>
                  <strong>{product.price} د.ت</strong>
                </td>
                <td>
                  <span className="product-category" style={{ fontSize: '0.8rem' }}>
                    {getCategoryLabel(product.category)}
                  </span>
                </td>
                <td>
                  <div style={{ maxWidth: '200px' }}>
                    <div style={{ fontSize: '0.9rem' }}>{product.description}</div>
                    <div style={{ fontSize: '0.8rem', color: '#666', fontStyle: 'italic' }}>
                      {product.descriptionFr}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="table-actions">
                    <button
                      className="table-btn edit"
                      onClick={() => handleEditProduct(product)}
                      disabled={showForm}
                    >
                      ✏️ تعديل / Modifier
                    </button>
                    <button
                      className="table-btn delete"
                      onClick={() => handleDeleteProduct(product.id)}
                      disabled={showForm}
                    >
                      🗑️ حذف / Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem',
            color: '#666' 
          }}>
            <h3>لا توجد منتجات / Aucun produit</h3>
            <p>ابدأ بإضافة منتجك الأول / Commencez par ajouter votre premier produit</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel
