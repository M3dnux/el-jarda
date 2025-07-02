import React from 'react'

const Header = ({ currentView, setCurrentView, onContactClick }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <img src="/el_jarda.png" alt="El Jarda Logo" className="logo-image" />
          <div>
            <div>الجردة</div>
            <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>El Jarda</div>
          </div>
        </div>
        <nav className="nav-menu">
          <button 
            className={`nav-btn ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => setCurrentView('home')}
          >
            الرئيسية / Accueil
          </button>
          <button 
            className="nav-btn"
            onClick={onContactClick}
          >
            اتصل بنا / Contact
          </button>
          <button 
            className={`nav-btn ${currentView === 'admin' ? 'active' : ''}`}
            onClick={() => setCurrentView('admin')}
          >
            إدارة المنتجات / Admin
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
