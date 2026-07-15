import { Link, useLocation } from 'react-router-dom';
import { construirSiguienteEnlace } from '../utils/breadcrumbHistory.js';

function Header() {
  const location = useLocation();
  const currentPath = location.pathname;
  const searchParams = new URLSearchParams(location.search);
  const currentType = searchParams.get('type');

  const isBreakfastActive = currentPath === '/desayuno' || (currentPath === '/menu' && currentType !== 'asiatico');
  const isAsianActive = currentPath === '/asiatico' || (currentPath === '/menu' && currentType === 'asiatico');

  return (
    <header className="site-header">
      <div className="header-inner container">
        <Link to="/" className="logo">
          <img src="/images/logo_clean.png" alt="La Pergola Logo" className="logo-img" />
        </Link>

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
        </div>
      </div>
    </header>
  );
}

export default Header;
