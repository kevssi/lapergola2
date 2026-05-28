import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb.jsx';
import { properties } from '../data.js';
import { buildBreadcrumb } from '../utils/breadcrumbHistory.js';

const whatsappNumber = '526531234567';

function formatPrice(amount, operation) {
  const formatted = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(amount);
  return operation === 'renta' ? `${formatted} / mes` : formatted;
}

function Propiedad() {
  const { id } = useParams();
  const property = properties.find((p) => p.id === Number(id));
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);

  useEffect(() => {
    if (property) {
      document.title = `${property.title} | Inmobiliaria del Desierto`;
    }
    setBreadcrumbItems(buildBreadcrumb(`/propiedad/${id}`));
  }, [id, property]);

  if (!property) {
    return (
      <div className="container" style={{ padding: '4rem 0' }}>
        <h1>Propiedad no encontrada</h1>
        <a href="/">Volver al inicio</a>
      </div>
    );
  }

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
            <a href="/vender" className="nav-link" target="_blank" rel="noopener noreferrer">Vender</a>
            <a href="/servicios" className="nav-link" target="_blank" rel="noopener noreferrer">Servicios</a>
            <a href="/contacto" className="nav-link" target="_blank" rel="noopener noreferrer">Contacto</a>
          </nav>
          <div className="header-actions" />
        </div>
      </header>

      <Breadcrumb items={breadcrumbItems} />

      <div className="container" style={{ padding: '2rem 0 4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem', alignItems: 'start' }}>

          {/* Imagen y detalles */}
          <div>
            <img
              src={property.image}
              alt={property.title}
              style={{ width: '100%', borderRadius: '12px', objectFit: 'cover', maxHeight: '420px' }}
            />
            <div style={{ marginTop: '1.5rem' }}>
              <div className="property-card__tags" style={{ marginBottom: '0.75rem' }}>
                <span>{property.type.toUpperCase()}</span>
                <span>{property.operation === 'renta' ? 'RENTA' : 'VENTA'}</span>
              </div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 500, margin: '0 0 0.5rem' }}>{property.title}</h1>
              <p style={{ color: 'var(--color-text-secondary)', margin: '0 0 1.5rem' }}>
                {property.city}, {property.state}
              </p>

              <div className="property-card__features" style={{ marginBottom: '1.5rem' }}>
                <span>{property.area} m²</span>
                {property.beds != null && <span>{property.beds} Recámaras</span>}
                {property.baths != null && <span>{property.baths} Baños</span>}
              </div>

              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                Propiedad ubicada en {property.city}, {property.state}. {property.type} en {property.operation === 'renta' ? 'renta' : 'venta'}
                {property.area ? ` con ${property.area} m²` : ''}{property.beds ? `, ${property.beds} recámaras` : ''}{property.baths ? ` y ${property.baths} baños` : ''}.
                Contáctanos para más información o para agendar una visita.
              </p>
            </div>
          </div>

          {/* Panel de contacto */}
          <div style={{
            background: 'var(--color-background-primary)',
            border: '0.5px solid var(--color-border-tertiary)',
            borderRadius: '12px',
            padding: '1.5rem',
            position: 'sticky',
            top: '1rem',
          }}>
            <p className="property-card__price" style={{ fontSize: '1.5rem', margin: '0 0 0.25rem' }}>
              {formatPrice(property.price, property.operation)}
            </p>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', margin: '0 0 1.5rem' }}>
              {property.operation === 'renta' ? 'Precio mensual' : 'Precio de venta'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hola, me interesa: ' + property.title)}`}
                className="btn btn-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textAlign: 'center' }}
              >
                Consultar por WhatsApp
              </a>
              <a
                href={`mailto:contacto@inmobiliariadeldesierto.mx?subject=${encodeURIComponent('Consulta: ' + property.title)}`}
                className="btn btn-outline"
                style={{ textAlign: 'center' }}
              >
                Enviar correo
              </a>
            </div>

            <div style={{
              marginTop: '1.5rem',
              paddingTop: '1.5rem',
              borderTop: '0.5px solid var(--color-border-tertiary)',
              fontSize: '0.875rem',
              color: 'var(--color-text-secondary)',
            }}>
              <p style={{ margin: '0 0 0.25rem' }}>📍 {property.city}, {property.state}</p>
              <p style={{ margin: '0 0 0.25rem' }}>📐 {property.area} m²</p>
              {property.beds != null && <p style={{ margin: '0 0 0.25rem' }}>🛏 {property.beds} recámaras</p>}
              {property.baths != null && <p style={{ margin: 0 }}>🚿 {property.baths} baños</p>}
            </div>
          </div>

        </div>
      </div>

      <footer className="site-footer">
        <div className="container">
          <p className="footer-copy">© 2026 Inmobiliaria del Desierto.</p>
        </div>
      </footer>
    </div>
  );
}

export default Propiedad;
