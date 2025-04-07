import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SearchBar from './SearchBar'

function Navbar({ onSearch }) {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark-custom mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">Three Kingdoms</Link>
        
        <button 
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center w-100">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link 
                  className="nav-link" 
                  to="/characters"
                  onClick={() => setIsOpen(false)}
                >
                  Karakter
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className="nav-link" 
                  to="/battles"
                  onClick={() => setIsOpen(false)}
                >
                  Pertempuran
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className="nav-link" 
                  to="/battles/timeline"
                  onClick={() => setIsOpen(false)}
                >
                  Linimasa
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className="nav-link" 
                  to="/favorites"
                  onClick={() => setIsOpen(false)}
                >
                  <i className="bi bi-star-fill"></i>
                </Link>
              </li>
            </ul>
            
            <div className="ms-lg-3 mt-3 mt-lg-0 w-100 w-lg-auto">
              <SearchBar onSearch={onSearch} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar