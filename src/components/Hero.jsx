import React from 'react'

const Hero = ({ onContactClick }) => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products')
    if (productsSection) {
      productsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>🌿 حديقتك الخضراء مع الجردة 🌿</h1>
        <p>
          نوفر لك كل ما تحتاجه لإنشاء والعناية بحديقة أحلامك. منتجات عالية الجودة وخدمات احترافية لجعل مساحتك الخضراء مميزة
        </p>
        <p style={{ fontSize: '1.1rem', marginTop: '1rem' }}>
          Nous vous fournissons tout ce dont vous avez besoin pour créer et entretenir le jardin de vos rêves. 
          Des produits de haute qualité et des services professionnels pour rendre votre espace vert exceptionnel.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
          <button className="hero-btn" onClick={scrollToProducts}>
            اكتشف منتجاتنا / Découvrir nos produits
          </button>
          <button className="hero-btn" onClick={onContactClick} style={{ background: 'var(--accent-green)' }}>
            📧 اتصل بنا / Contactez-nous
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
