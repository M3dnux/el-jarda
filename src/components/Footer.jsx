import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>🌱 الجردة / El Jarda</h3>
          <p>
            متجرك المتخصص في منتجات الحدائق والزراعة. 
            نوفر لك كل ما تحتاجه لإنشاء حديقة أحلامك.
          </p>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
            Votre magasin spécialisé en produits de jardinage et d'agriculture. 
            Nous vous fournissons tout ce dont vous avez besoin pour créer le jardin de vos rêves.
          </p>
        </div>

        <div className="footer-section">
          <h3>📍 معلومات الاتصال / Contact</h3>
          <ul>
            <li>📧 <a href="mailto:contact@eljarda.com" style={{ color: 'inherit', textDecoration: 'none' }}>contact@eljarda.com</a></li>
            <li>📱 الهاتف / Téléphone: 26503701 / 40279250</li>
            <li>🏠 العنوان / Adresse: شيحية صفاقس، تونس / Chihia Sfax, Tunisie</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>🛍️ خدماتنا / Nos Services</h3>
          <ul>
            <li>🌱 منتجات العناية بالحدائق / Produits d'entretien de jardin</li>
            <li>🌾 أسمدة طبيعية عضوية وكيماوية / Engrais naturels organiques et chimiques</li>
            <li>🔧 أدوات الحدائق / Outils de jardinage</li>
            <li>💧 أنظمة الري الحديثة / Systèmes d'irrigation modernes</li>
            <li>🌸 نباتات زينة / Plantes ornementales</li>
            <li>🌰 بذور عالية الجودة / Graines de haute qualité</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>🌐 تابعنا / Suivez-nous</h3>
          <ul>
            <li>
              📘 <a href="https://www.facebook.com/profile.php?id=61573780066854" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                Facebook - الجردة
              </a>
            </li>
            <li>
              📸 <a href="https://www.instagram.com/el_jarda/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                Instagram - @el_jarda
              </a>
            </li>
            <li>
              📞 اتصل بنا مباشرة / Appelez-nous directement
            </li>
            <li style={{ fontSize: '0.9rem', fontStyle: 'italic', marginTop: '0.5rem' }}>
              للاستشارة المجانية / Pour consultation gratuite
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © 2025 الجردة / El Jarda - جميع الحقوق محفوظة / Tous droits réservés
        </p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
          🌿 نساعدك في إنشاء حديقة أحلامك / Nous vous aidons à créer le jardin de vos rêves 🌿
        </p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', opacity: '0.8' }}>
          Made with 💚 for gardening enthusiasts in Tunisia
        </p>
      </div>
    </footer>
  )
}

export default Footer
