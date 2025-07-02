import React, { useState } from 'react'
import ApiService from '../services/api'
import './Login.css'
import ForgotPasswordModal from './ForgotPasswordModal'

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await ApiService.login(formData.username, formData.password)
      onLoginSuccess(result.user)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src="/el_jarda.png" alt="El Jarda Logo" className="login-logo-image" />
          <h2>تسجيل الدخول للإدارة</h2>
          <p>Connexion Administration - El Jarda</p>
        </div>

        {error && (
          <div className="login-error">
            <span>⚠️ {error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">اسم المستخدم / Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="admin"
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">كلمة المرور / Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          <button 
            type="submit" 
            className="login-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                جاري التحميل... / Chargement...
              </>
            ) : (
              '🔐 دخول / Se connecter'
            )}
          </button>
        </form>

        <div className="login-forgot">
          <button 
            type="button" 
            className="forgot-password-btn"
            onClick={() => setShowForgotPassword(true)}
          >
            نسيت كلمة المرور؟ / Mot de passe oublié?
          </button>
        </div>
      </div>

      {showForgotPassword && (
        <ForgotPasswordModal 
          onClose={() => setShowForgotPassword(false)}
        />
      )}
    </div>
  )
}

export default Login
