import { useEffect, useMemo, useState } from 'react';
import { properties, sectionTitles } from './data.js';
import Breadcrumb from './components/Breadcrumb.jsx';
import { buildNextHref } from './utils/breadcrumbHistory.js';
import PropertyCard from './components/PropertyCard.jsx';

const sectionIds = ['inicio', 'propiedades', 'vender', 'servicios', 'contacto'];


function getCurrentSectionId() {
  const trigger = window.innerHeight * 0.25;
  for (const id of sectionIds) {
    const section = document.getElementById(id);
    if (!section) continue;
    const rect = section.getBoundingClientRect();
    if (rect.top <= trigger && rect.bottom > trigger) {
      return id;
    }
  }
  return 'inicio';
}

function App() {
  const [activeSection, setActiveSection] = useState('inicio');

  

  useEffect(() => {
    const update = () => {
      const current = getCurrentSectionId();
      setActiveSection(current);
      if (window.location.hash !== `#${current}`) {
        window.history.replaceState(null, '', `#${current}`);
      }
    };

    update();
    window.addEventListener('scroll', update);
    window.addEventListener('hashchange', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('hashchange', update);
    };
  }, []);

  useEffect(() => {
    document.title = 'Inmobiliaria del Desierto | Compra, venta y renta de inmuebles';
    const description = document.querySelector('meta[name="description"]');
    const content = 'Inmobiliaria del Desierto — compra, renta y vende propiedades en Sonora, Baja California y el noroeste de México.';
    if (description) {
      description.content = content;
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = content;
      document.head.appendChild(meta);
    }
  }, []);

  const breadcrumbItems = useMemo(() => {
    if (activeSection === 'inicio') {
      return [{ name: 'Inicio', href: '#inicio', current: true }];
    }
    return [
      { name: 'Inicio', href: '#inicio', current: false },
      { name: sectionTitles[activeSection] || activeSection, href: `#${activeSection}`, current: true },
    ];
  }, [activeSection]);

  return (
    <div>
      <header className="site-header">
        <div className="header-inner container">
          <a href="#inicio" className="logo">
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
            <a href="#propiedades" className="nav-link">Propiedades</a>
            <a href={buildNextHref('/vender', '/')} className="nav-link" target="_blank" rel="noopener noreferrer">Vender</a>
            <a href={buildNextHref('/servicios', '/')} className="nav-link" target="_blank" rel="noopener noreferrer">Servicios</a>
            <a href={buildNextHref('/contacto', '/')} className="nav-link" target="_blank" rel="noopener noreferrer">Contacto</a>
          </nav>

          <div className="header-actions" />
        </div>
      </header>

      {activeSection !== 'inicio' && <Breadcrumb items={breadcrumbItems} />}

      <section id="inicio" className="home-hero">
        <div className="container home-hero__inner">
          <p className="home-hero__eyebrow">Todas las propiedades, un solo lugar.</p>
          <h1>El portal inmobiliario del noroeste de México</h1>
          <p className="home-hero__sub">Compra, venta y renta de inmuebles en Sonora y Baja California.</p>

          <div className="hero-actions">
            <a href="#propiedades" className="btn btn-primary btn-lg">Ver propiedades</a>
            <a href="#contacto" className="btn btn-outline btn-lg">Contáctanos</a>
          </div>
        </div>
      </section>

      <section className="properties-section" id="propiedades">
        <div className="container">
          <h2 className="section-title">Propiedades disponibles</h2>
          <p>Selecciona una propiedad y comunícate directamente con el dueño para más detalles.</p>
          <div className="property-grid">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      <section className="info-section info-section--contact" id="vender">
        <div className="container">
          <p className="section-label">Contacto</p>
          <h2 className="section-title section-title--large">Vende tu propiedad</h2>
          <p>Publica gratis y llega a miles de compradores en Sonora y Baja California.</p>
          <a href="#contacto" className="btn btn-primary btn-lg">Contactar ahora</a>
        </div>
      </section>

      <section className="info-section info-section--alt" id="nosotros">
        <div className="container">
          <h2 className="section-title">Lo que ofrecemos</h2>
          <p>Venta, renta y asesoría inmobiliaria con foco en Sonora, Baja California y el noroeste de México.</p>
        </div>
      </section>

      <section className="tools-section" id="servicios">
        <div className="container tools-grid">
          <article className="tool-card">
            <h3>Venta de propiedades</h3>
            <p>Encuentra casas, terrenos y locales con la mejor cobertura regional.</p>
            <a href="#contacto" className="link-arrow">Ver opciones →</a>
          </article>
          <article className="tool-card">
            <h3>Renta segura</h3>
            <p>Propiedades revisadas y asesoría personalizada para arrendatarios.</p>
            <a href="#contacto" className="link-arrow">Solicitar renta →</a>
          </article>
          <article className="tool-card">
            <h3>Asesoría crediticia</h3>
            <p>Apoyamos la gestión de crédito para que tu compra sea más fácil.</p>
            <a href="#contacto" className="link-arrow">Conoce más →</a>
          </article>
        </div>
      </section>

      <section className="info-section" id="contacto">
        <div className="container">
          <h2 className="section-title">Contacto</h2>
          <p>WhatsApp: <a href="https://wa.me/526531234567">653 123 4567</a> · Correo: contacto@inmobiliariadeldesierto.mx</p>
        </div>
      </section>

      <footer className="site-footer" id="blog">
        <div className="container">
          <div className="footer-seo">
            <div className="footer-col">
              <h4>Casas en venta</h4>
              <nav className="footer-links" aria-label="Casas en venta">
                <a href="#propiedades">San Luis Río Colorado</a>
                <a href="#propiedades">Mexicali</a>
                <a href="#propiedades">Caborca</a>
                <a href="#propiedades">Nogales</a>
              </nav>
            </div>
            <div className="footer-col">
              <h4>Estados más buscados</h4>
              <nav className="footer-links" aria-label="Estados">
                <a href="#propiedades">Sonora</a>
                <a href="#propiedades">Baja California</a>
              </nav>
            </div>
            <div className="footer-col">
              <h4>Inmobiliaria del Desierto</h4>
              <nav className="footer-links">
                <a href={buildNextHref('/vender', '/')} target="_blank" rel="noopener noreferrer">Vender</a>
                <a href="#contacto">Publicar gratis</a>
                <a href="#contacto">Contacto</a>
              </nav>
            </div>
          </div>
          <p className="footer-copy">© 2026 Inmobiliaria del Desierto. Inspirado en la experiencia de navegación de portales inmobiliarios.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
