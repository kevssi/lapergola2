import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { construirSiguienteEnlace } from '../utils/breadcrumbHistory.js';
import { Menu, X, MapPin, Phone } from 'lucide-react';

function Header() {
  const location = useLocation();
  const currentPath = location.pathname;
  const searchParams = new URLSearchParams(location.search);
  const currentType = searchParams.get('type');

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isBreakfastActive = currentPath === '/desayuno' || (currentPath === '/menu' && currentType !== 'asiatico');
  const isAsianActive = currentPath === '/asiatico' || (currentPath === '/menu' && currentType === 'asiatico');

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPath, currentType]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className={`site-header ${isBreakfastActive ? 'site-header--breakfast' : ''}`}>
        <div className="header-inner container">
          <Link to="/" className="logo">
            <img src="/images/logo_clean.png" alt="La Pergola Logo" className="logo-img" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="main-nav" aria-label="Principal">
            <Link to="/" className={`nav-link ${currentPath === '/' ? 'nav-link--active' : ''}`}>
              Inicio
            </Link>
            <Link
              to={construirSiguienteEnlace('/menu?type=desayuno', currentPath)}
              className={`nav-link ${isBreakfastActive ? 'nav-link--active' : ''}`}
            >
              Desayunos
            </Link>
            <Link
              to={construirSiguienteEnlace('/menu?type=asiatico', currentPath)}
              className={`nav-link ${isAsianActive ? 'nav-link--active-asian' : ''}`}
            >
              Comida Asiática
            </Link>
            <Link
              to={construirSiguienteEnlace('/contacto', currentPath)}
              className={`nav-link ${currentPath === '/contacto' ? 'nav-link--active' : ''}`}
            >
              Contacto
            </Link>
          </nav>

          <div className="header-actions">
            <Link
              to="/contacto"
              className={`btn btn-primary btn-sm btn-reserve ${isAsianActive ? 'btn-reserve--asian' : ''}`}
            >
              Hacer Pedido
            </Link>
            
            {/* Mobile hamburger menu toggle */}
            <button
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'mobile-menu-overlay--open' : ''}`}>
        <nav className="mobile-menu-nav" aria-label="Móvil">
          <Link to="/" className={`nav-link ${currentPath === '/' ? 'nav-link--active' : ''}`}>
            Inicio
          </Link>
          <Link
            to={construirSiguienteEnlace('/menu?type=desayuno', currentPath)}
            className={`nav-link ${isBreakfastActive ? 'nav-link--active' : ''}`}
          >
            Desayunos
          </Link>
          <Link
            to={construirSiguienteEnlace('/menu?type=asiatico', currentPath)}
            className={`nav-link ${isAsianActive ? 'nav-link--active-asian' : ''}`}
          >
            Comida Asiática
          </Link>
          <Link
            to={construirSiguienteEnlace('/contacto', currentPath)}
            className={`nav-link ${currentPath === '/contacto' ? 'nav-link--active' : ''}`}
          >
            Contacto
          </Link>
        </nav>
        
        <div className="mobile-menu-footer">
          <Link
            to="/contacto"
            className={`btn btn-primary btn-block ${isAsianActive ? 'btn-reserve--asian' : ''}`}
          >
            Hacer Pedido
          </Link>
          <div className="mobile-menu-contact-info">
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={16} style={{ color: 'var(--gold)' }} />
              <span>Av. 5 de mayo 18 y 19 #1807, SLRC</span>
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone size={16} style={{ color: 'var(--gold)' }} />
              <span>Tel / WA: 653 175 1276</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
