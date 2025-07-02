import React, { useState } from 'react'
import ApiService from '../services/api'

const ForgotPasswordModal = ({ onClose }) => {
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch('http://localhost:3001/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message)
      } else {
        setError(data.error || 'An error occurred')
      }
    } catch (error) {
      setError('فشل في الاتصال بالخادم / Erreur de connexion au serveur')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>🔐 استعادة كلمة المرور / Récupération du mot de passe</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <p style={{ marginBottom: '1rem', textAlign: 'center' }}>
            أدخل اسم المستخدم لإرسال تعليمات استعادة كلمة المرور<br />
            Entrez votre nom d'utilisateur pour recevoir les instructions de récupération
          </p>

          {error && (
            <div className="error-message" style={{ 
              color: '#d32f2f', 
              backgroundColor: '#ffebee', 
              padding: '0.5rem', 
              borderRadius: '4px', 
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          {message && (
            <div className="success-message" style={{ 
              color: '#2e7d32', 
              backgroundColor: '#e8f5e8', 
              padding: '0.5rem', 
              borderRadius: '4px', 
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>اسم المستخدم / Nom d'utilisateur:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div className="form-actions" style={{ 
              display: 'flex', 
              gap: '1rem', 
              marginTop: '1.5rem' 
            }}>
              <button 
                type="submit" 
                disabled={isLoading || !username.trim()}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  backgroundColor: isLoading ? '#ccc' : 'var(--secondary-green)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  fontSize: '1rem'
                }}
              >
                {isLoading ? '⏳ جاري الإرسال...' : '📧 إرسال التعليمات / Envoyer'}
              </button>
              
              <button 
                type="button" 
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  backgroundColor: '#f5f5f5',
                  color: '#333',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                إلغاء / Annuler
              </button>
            </div>
          </form>

          <div style={{ 
            marginTop: '1.5rem', 
            padding: '1rem', 
            backgroundColor: '#e3f2fd', 
            borderRadius: '4px',
            fontSize: '0.9rem',
            textAlign: 'center'
          }}>
            <p>
              📧 ستُرسل التعليمات إلى: <strong>ayoub.zouch@gmail.com</strong><br />
              Les instructions seront envoyées à: <strong>ayoub.zouch@gmail.com</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordModal
