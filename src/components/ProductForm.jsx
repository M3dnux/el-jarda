import React, { useState, useEffect } from 'react'

const ProductForm = ({ product, onSubmit, onCancel, categories }) => {
  const [formData, setFormData] = useState({
    nameAr: '',
    nameFr: '',
    price: '',
    category: 'lawn-care',
    descriptionAr: '',
    descriptionFr: ''
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (product) {
      setFormData({
        nameAr: product.nameAr || '',
        nameFr: product.nameFr || '',
        price: product.price || '',
        category: product.category || 'lawn-care',
        descriptionAr: product.description || '',
        descriptionFr: product.descriptionFr || ''
      })
      
      if (product.image) {
        setImagePreview(`http://localhost:3001${product.image}`)
      }
    }
  }, [product])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
      if (!allowedTypes.includes(file.type)) {
        alert('نوع الملف غير مدعوم. يرجى اختيار صورة (JPG, PNG, GIF, WebP) / Type de fichier non supporté. Veuillez choisir une image (JPG, PNG, GIF, WebP)')
        return
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('حجم الملف كبير جداً. الحد الأقصى 5 ميجابايت / Fichier trop volumineux. Maximum 5MB')
        return
      }

      setImageFile(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview(null)
    const imageInput = document.getElementById('image-input')
    if (imageInput) {
      imageInput.value = ''
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Validation
    if (!formData.nameAr.trim() || !formData.nameFr.trim()) {
      alert('يرجى إدخال اسم المنتج بالعربية والفرنسية / Veuillez saisir le nom du produit en arabe et en français')
      setIsLoading(false)
      return
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      alert('يرجى إدخال سعر صحيح / Veuillez saisir un prix valide')
      setIsLoading(false)
      return
    }
    
    if (!formData.descriptionAr.trim() || !formData.descriptionFr.trim()) {
      alert('يرجى إدخال وصف المنتج بالعربية والفرنسية / Veuillez saisir la description du produit en arabe et en français')
      setIsLoading(false)
      return
    }

    try {
      await onSubmit(formData, imageFile)
    } catch (error) {
      alert('خطأ في حفظ المنتج / Erreur lors de la sauvegarde du produit: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="product-form">
      <h3>
        {product ? 
          '✏️ تعديل المنتج / Modifier le produit' : 
          '➕ إضافة منتج جديد / Ajouter un nouveau produit'
        }
      </h3>
      
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label htmlFor="nameAr">اسم المنتج (عربي) / Nom du produit (Arabe) *</label>
            <input
              type="text"
              id="nameAr"
              name="nameAr"
              value={formData.nameAr}
              onChange={handleChange}
              placeholder="أدخل اسم المنتج بالعربية..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nameFr">اسم المنتج (فرنسي) / Nom du produit (Français) *</label>
            <input
              type="text"
              id="nameFr"
              name="nameFr"
              value={formData.nameFr}
              onChange={handleChange}
              placeholder="Entrez le nom du produit en français..."
              required
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label htmlFor="price">السعر (د.ت) / Prix (DT) *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">الفئة / Catégorie *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="image-input">صورة المنتج / Image du produit</label>
          <div className="image-upload-container">
            <input
              type="file"
              id="image-input"
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              onChange={handleImageChange}
              className="image-input"
            />
            <label htmlFor="image-input" className="image-upload-label">
              📷 اختر صورة / Choisir une image
            </label>
            <small className="file-info">
              أنواع مدعومة: JPG, PNG, GIF, WebP (حد أقصى 5MB)
              <br />
              Types supportés: JPG, PNG, GIF, WebP (max 5MB)
            </small>
          </div>
          
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="معاينة / Aperçu" />
              <button type="button" onClick={removeImage} className="remove-image-btn">
                🗑️ حذف الصورة / Supprimer l'image
              </button>
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="descriptionAr">الوصف (عربي) / Description (Arabe) *</label>
          <textarea
            id="descriptionAr"
            name="descriptionAr"
            value={formData.descriptionAr}
            onChange={handleChange}
            placeholder="أدخل وصف المنتج بالعربية..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="descriptionFr">الوصف (فرنسي) / Description (Français) *</label>
          <textarea
            id="descriptionFr"
            name="descriptionFr"
            value={formData.descriptionFr}
            onChange={handleChange}
            placeholder="Entrez la description du produit en français..."
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="admin-btn" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                جاري الحفظ... / Sauvegarde...
              </>
            ) : (
              product ? 
                '💾 حفظ التغييرات / Sauvegarder' : 
                '➕ إضافة المنتج / Ajouter le produit'
            )}
          </button>
          <button type="button" className="admin-btn danger" onClick={onCancel} disabled={isLoading}>
            ❌ إلغاء / Annuler
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductForm
