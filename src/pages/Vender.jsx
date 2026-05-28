import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb.jsx';
import { buildBreadcrumb, buildNextHref } from '../utils/breadcrumbHistory.js';

function Vender() {
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);

  useEffect(() => {
    document.title = 'Vender tu propiedad | Inmobiliaria del Desierto';
    setBreadcrumbItems(buildBreadcrumb('/vender'));
  }, []);

  return (
    <div>
      <header className="site-header">
        <div className="header-inner container">
          <a href="/" className="logo">
            <span className="logo-mark" aria-hidden="true">
              <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 24V11l11-7 11 7v13H3z" fill="currentColor" opacity="0.15" />
                <path d="M3 24V11l11-7 11 7v13H3z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
                <path d="M10 24v-6h8v6" stroke="currentColor" strokeWidth="1.75" />
              </svg>
            </span>
            <span className="logo-text">
              Inmobiliaria<span className="logo-dot">del</span>Desierto
            </span>
          </a>

          <nav className="main-nav" aria-label="Principal">
            <a href="/#propiedades" className="nav-link">Propiedades</a>
            <a href="/vender" className="nav-link">Vender</a>
            <a href={buildNextHref('/servicios', '/vender')} className="nav-link" target="_blank" rel="noopener noreferrer">Servicios</a>
            <a href={buildNextHref('/contacto', '/vender')} className="nav-link" target="_blank" rel="noopener noreferrer">Contacto</a>
          </nav>

          <div className="header-actions" />
        </div>
      </header>

      <Breadcrumb items={breadcrumbItems} />

      <section className="info-section info-section--contact">
        <div className="container">
          <p className="section-label">Vende tu propiedad</p>
          <h1 className="section-title section-title--large">Llega a miles de compradores</h1>
          <p>
            Publica gratis y conecta con compradores en Sonora y Baja California. Contáctanos
            y te ayudamos a publicar tu propiedad hoy mismo.
          </p>

          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '360px' }}>
            <a href="https://wa.me/526531234567" className="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">WhatsApp: 653 123 4567</a>
            <a href="mailto:contacto@inmobiliariadeldesierto.mx" className="btn btn-outline btn-lg">Correo electrónico</a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container">
          <p className="footer-copy">© 2026 Inmobiliaria del Desierto.</p>
        </div>
      </footer>
    </div>
  );
}

export default Vender;
