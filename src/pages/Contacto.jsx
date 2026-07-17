import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb.jsx';
import { construirMigasPan } from '../utils/breadcrumbHistory.js';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { MapPin, Phone, Clock } from 'lucide-react';

function Contacto() {
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);

  useEffect(() => {
    document.title = 'Contacto & Pedidos | La Pergola';
    
    let isMounted = true;
    async function loadBreadcrumbs() {
      try {
        const items = await construirMigasPan('/contacto');
        if (isMounted) {
          setBreadcrumbItems(items);
        }
      } catch (err) {
        console.error("Error loading breadcrumbs:", err);
      }
    }
    loadBreadcrumbs();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <Header />
      <Breadcrumb items={breadcrumbItems} />

      <main className="contact-page container">
        <div className="contact-grid">
          
          {/* Columna Izquierda: Información de Pedidos y Horarios */}
          <section className="reservation-section glass">
            <span className="section-eyebrow">¡Haz tu Pedido!</span>
            <h1 className="section-title">Contacto para Pedidos</h1>
            <p className="section-desc">
              No manejamos reservaciones. Puedes realizar tus pedidos para llevar o a domicilio directamente por llamada telefónica o WhatsApp.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
              <div className="hours-block" style={{ padding: '1.5rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '8px', borderLeft: '3px solid var(--gold)' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--gold)' }}>Nuestros Horarios</h3>
                <div className="hours-row" style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                  <strong>Desayuno y comida mexicana:</strong>
                  <span>8:00 AM – 2:00 PM</span>
                </div>
                <div className="hours-row" style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                  <strong>Comida Asiática:</strong>
                  <span>1:00 PM – 9:00 PM</span>
                </div>
                <div className="hours-row" style={{ fontSize: '0.95rem', color: 'var(--accent-red)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Clock size={16} />
                  <strong>CERRADO LOS MARTES</strong>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a href="https://wa.me/526531751276" className="btn btn-whatsapp btn-lg" target="_blank" rel="noopener noreferrer" style={{ justifyContent: 'center' }}>
                  Pedir por WhatsApp (653 175 1276)
                </a>
                <a href="tel:6531751276" className="btn btn-outline btn-lg" style={{ justifyContent: 'center' }}>
                  Llamar al 653 175 1276
                </a>
              </div>
            </div>
          </section>

          {/* Columna Derecha: Redes Sociales y Ubicación */}
          <aside className="contact-sidebar">
            <div className="info-card glass">
              <h3>Ubicación</h3>
              <p className="info-text" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', margin: 0 }}>
                <MapPin size={18} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '3px' }} />
                <span>
                  Avenida 5 de mayo 18 y 19 #1807<br />
                  San Luis Río Colorado, Sonora
                </span>
              </p>
              
              <a
                href="https://maps.google.com/?q=La+P%C3%A9rgola+Restaurante,+Avenida+5+de+Mayo+1813,+Residencias,+83448+San+Luis+R%C3%ADo+Colorado,+Son."
                target="_blank"
                rel="noopener noreferrer"
                className="map-placeholder"
                style={{ display: 'block' }}
              >
                <div className="map-overlay">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={16} /> Ver en Google Maps
                  </span>
                </div>
                <img src="/images/restaurant_interior.png" alt="La Pergola Interior" />
              </a>
            </div>

            <div className="info-card glass">
              <h3>Síguenos en Redes Sociales</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
                <a href="https://www.facebook.com/search/top?q=la%20pergola" className="btn btn-outline" target="_blank" rel="noopener noreferrer" style={{ justifyContent: 'flex-start', paddingLeft: '1.5rem', gap: '0.75rem' }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={{ color: 'var(--gold)' }}>
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook: La Pergola</span>
                </a>
                <a href="https://www.instagram.com/lapergola_slrc" className="btn btn-outline" target="_blank" rel="noopener noreferrer" style={{ justifyContent: 'flex-start', paddingLeft: '1.5rem', gap: '0.75rem' }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--gold)' }}>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                  <span>Instagram: lapergola_slrc</span>
                </a>
              </div>
            </div>
          </aside>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Contacto;
