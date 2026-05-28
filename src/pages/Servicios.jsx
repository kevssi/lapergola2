import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb.jsx';
import { buildBreadcrumb, buildNextHref } from '../utils/breadcrumbHistory.js';

function Servicios() {
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);

  useEffect(() => {
    document.title = 'Servicios | Inmobiliaria del Desierto';
    setBreadcrumbItems(buildBreadcrumb('/servicios'));
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
            <a href={buildNextHref('/vender', '/servicios')} className="nav-link" target="_blank" rel="noopener noreferrer">Vender</a>
            <a href="/servicios" className="nav-link">Servicios</a>
            <a href={buildNextHref('/contacto', '/servicios')} className="nav-link" target="_blank" rel="noopener noreferrer">Contacto</a>
          </nav>
          <div className="header-actions" />
        </div>
      </header>

      <Breadcrumb items={breadcrumbItems} />

      <section className="tools-section" style={{ paddingTop: '3rem' }}>
        <div className="container tools-grid">
          <article className="tool-card">
            <h3>Venta de propiedades</h3>
            <p>Encuentra casas, terrenos y locales con la mejor cobertura regional.</p>
            <a href="/contacto" target="_blank" rel="noopener noreferrer" className="link-arrow">Ver opciones →</a>
          </article>
          <article className="tool-card">
            <h3>Renta segura</h3>
            <p>Propiedades revisadas y asesoría personalizada para arrendatarios.</p>
            <a href="/contacto" target="_blank" rel="noopener noreferrer" className="link-arrow">Solicitar renta →</a>
          </article>
          <article className="tool-card">
            <h3>Asesoría crediticia</h3>
            <p>Apoyamos la gestión de crédito para que tu compra sea más fácil.</p>
            <a href="/contacto" target="_blank" rel="noopener noreferrer" className="link-arrow">Conoce más →</a>
          </article>
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

export default Servicios;
