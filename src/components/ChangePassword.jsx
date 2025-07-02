import React, { useState } from 'react'
import ApiService from '../services/api'

const ChangePassword = ({ onClose }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    // Validation
    if (formData.newPassword.length < 6) {
      setError('كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل / Le nouveau mot de passe doit contenir au moins 6 caractères')
      setIsLoading(false)
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('كلمات المرور غير متطابقة / Les mots de passe ne correspondent pas')
      setIsLoading(false)
      return
    }

    try {
      await ApiService.changePassword(formData.currentPassword, formData.newPassword)
      setSuccess('تم تغيير كلمة المرور بنجاح / Mot de passe modifié avec succès')
      setTimeout(() => {
        onClose()
      }, 2000)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>🔐 تغيير كلمة المرور / Changer le mot de passe</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {error && (
          <div className="alert alert-error">
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            ✅ {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="currentPassword">كلمة المرور الحالية / Mot de passe actuel *</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">كلمة المرور الجديدة / Nouveau mot de passe *</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
              minLength="6"
            />
            <small>يجب أن تكون 6 أحرف على الأقل / Minimum 6 caractères</small>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">تأكيد كلمة المرور / Confirmer le mot de passe *</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="admin-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  جاري التحديث... / Mise à jour...
                </>
              ) : (
                '💾 حفظ / Sauvegarder'
              )}
            </button>
            <button type="button" className="admin-btn danger" onClick={onClose}>
              ❌ إلغاء / Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword
