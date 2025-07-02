import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductCatalog from './components/ProductCatalog'
import AdminPanel from './components/AdminPanel'
import Login from './components/Login'
import Footer from './components/Footer'
import ContactForm from './components/ContactForm'
import ApiService from './services/api'

function App() {
  const [currentView, setCurrentView] = useState('home')
  const [products, setProducts] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [connectionError, setConnectionError] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)

  useEffect(() => {
    // Check authentication status on app load
    const checkAuth = async () => {
      try {
        const isValid = await ApiService.verifyToken()
        setIsAuthenticated(isValid)
        setConnectionError(false)
      } catch (error) {
        console.error('Auth check failed:', error)
        setConnectionError(true)
      } finally {
        setIsLoading(false)
      }
    }

    // Load products
    const loadProducts = async () => {
      try {
        const productData = await ApiService.getProducts()
        setProducts(productData)
        setConnectionError(false)
      } catch (error) {
        console.error('Failed to load products:', error)
        setConnectionError(true)
      }
    }

    checkAuth()
    loadProducts()
  }, [])

  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true)
    setUser(userData)
    setCurrentView('admin')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
    setCurrentView('home')
  }

  const addProduct = (product) => {
    setProducts([product, ...products])
  }

  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(p => p.id === id ? updatedProduct : p))
  }

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id))
  }

  const refreshConnection = async () => {
    setIsLoading(true)
    setConnectionError(false)
    
    try {
      const isValid = await ApiService.verifyToken()
      setIsAuthenticated(isValid)
      
      const productData = await ApiService.getProducts()
      setProducts(productData)
      setConnectionError(false)
    } catch (error) {
      console.error('Refresh failed:', error)
      setConnectionError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleContactClick = () => {
    setShowContactForm(true)
  }

  const handleCloseContactForm = () => {
    setShowContactForm(false)
  }

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div className="loading-spinner" style={{ width: '40px', height: '40px' }}></div>
        <p>جاري التحميل... / Chargement...</p>
        {connectionError && (
          <div style={{ color: '#d32f2f', textAlign: 'center', marginTop: '1rem' }}>
            <p>⚠️ خطأ في الاتصال بالخادم / Erreur de connexion au serveur</p>
            <p>تأكد من تشغيل الخادم على المنفذ 3001 / Vérifiez que le serveur fonctionne sur le port 3001</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="App">
      <Header 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        isAuthenticated={isAuthenticated}
        onContactClick={handleContactClick}
      />
      
      {connectionError && (
        <div style={{
          backgroundColor: '#ffebee',
          border: '1px solid #f44336',
          color: '#d32f2f',
          padding: '10px',
          textAlign: 'center',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px'
        }}>
          <span>⚠️ مشكلة في الاتصال بالخادم / Problème de connexion au serveur</span>
          <button 
            onClick={refreshConnection}
            style={{
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            🔄 إعادة المحاولة / Réessayer
          </button>
        </div>
      )}
      
      {currentView === 'home' && (
        <>
          <Hero onContactClick={handleContactClick} />
          <ProductCatalog products={products} />
        </>
      )}
      
      {currentView === 'admin' && (
        <>
          {isAuthenticated ? (
            <AdminPanel 
              products={products}
              onAddProduct={addProduct}
              onUpdateProduct={updateProduct}
              onDeleteProduct={deleteProduct}
              onLogout={handleLogout}
            />
          ) : (
            <Login onLoginSuccess={handleLoginSuccess} />
          )}
        </>
      )}
      
      {showContactForm && (
        <ContactForm onClose={handleCloseContactForm} />
      )}
      
      <Footer />
    </div>
  )
}

export default App
