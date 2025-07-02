import React, { useState } from 'react'
import './ContactForm.css'

const ContactForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

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

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('يرجى ملء جميع الحقول المطلوبة / Veuillez remplir tous les champs requis')
      setIsLoading(false)
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('يرجى إدخال بريد إلكتروني صحيح / Veuillez saisir un email valide')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
        setTimeout(() => {
          onClose()
        }, 3000)
      } else {
        setError(data.error || 'فشل في إرسال الرسالة / Échec de l\'envoi du message')
      }
    } catch (error) {
      setError('خطأ في الاتصال بالخادم / Erreur de connexion au serveur')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="contact-modal">
        <div className="contact-header">
          <h3>📧 اتصل بنا / Contactez-nous</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="contact-body">
          {success ? (
            <div className="success-message">
              <div className="success-icon">✅</div>
              <h4>تم إرسال رسالتك بنجاح!</h4>
              <p>Message envoyé avec succès!</p>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>
                سنتواصل معك قريباً / Nous vous contactons bientôt
              </p>
            </div>
          ) : (
            <>
              <div className="contact-info">
                <p>
                  نحن هنا لمساعدتك! اتصل بنا للحصول على استشارة مجانية حول منتجات الحدائق
                </p>
                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  Nous sommes là pour vous aider! Contactez-nous pour une consultation gratuite sur les produits de jardinage
                </p>
              </div>

              {error && (
                <div className="error-message">
                  ⚠️ {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">الاسم / Nom *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="اسمك الكامل / Votre nom complet"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">البريد الإلكتروني / Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">رقم الهاتف / Téléphone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+216 XX XXX XXX"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">الموضوع / Sujet</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    >
                      <option value="">اختر موضوع / Choisir un sujet</option>
                      <option value="product-inquiry">استفسار عن منتج / Demande de produit</option>
                      <option value="pricing">الأسعار / Prix</option>
                      <option value="consultation">استشارة حدائق / Consultation jardinage</option>
                      <option value="delivery">التوصيل / Livraison</option>
                      <option value="other">أخرى / Autre</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">الرسالة / Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="اكتب رسالتك هنا... / Écrivez votre message ici..."
                    required
                  ></textarea>
                </div>

                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="loading-spinner"></span>
                        جاري الإرسال... / Envoi...
                      </>
                    ) : (
                      '📧 إرسال الرسالة / Envoyer le message'
                    )}
                  </button>
                  
                  <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={onClose}
                    disabled={isLoading}
                  >
                    إلغاء / Annuler
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContactForm
