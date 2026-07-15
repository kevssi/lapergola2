import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-col brand-col">
          <img src="/images/logo_clean.png" alt="La Pergola Logo" className="footer-logo-img" />
          <p className="footer-tagline">Una pergola de sabores, uniendo los mejores desayunos y la magia de la comida asiática.</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem' }}>
            <a href="https://www.facebook.com/search/top?q=la%20pergola" target="_blank" rel="noopener noreferrer" className="social-link" title="Facebook" style={{ color: 'var(--gold)' }}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/lapergola_slrc" target="_blank" rel="noopener noreferrer" className="social-link" title="Instagram" style={{ color: 'var(--gold)' }}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
          </div>
        </div>
        
        <div className="footer-col">
          <h4>Pedidos & Contacto</h4>
          <p className="footer-contact-info" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <span style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <MapPin size={18} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '2px' }} />
              <span>Avenida 5 de mayo 18 y 19 #1807</span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone size={18} style={{ color: 'var(--gold)', flexShrink: 0 }} />
              <span>
                Llamadas o WhatsApp:<br />
                <a href="https://wa.me/526531751276" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold' }}>653 175 1276</a>
              </span>
            </span>

          </p>
        </div>

        <div className="footer-col">
          <h4>Navegación</h4>
          <nav className="footer-links">
            <Link to="/">Inicio</Link>
            <Link to="/desayuno">Menú Desayunos</Link>
            <Link to="/asiatico">Menú Asiático</Link>
            <Link to="/contacto">Contacto / Pedidos</Link>
          </nav>
        </div>
      </div>
      <div className="footer-bottom container">
        <p className="footer-copy">© 2026 Restaurante La Pergola. Todos los derechos reservados. San Luis Río Colorado, Sonora.</p>
      </div>
    </footer>
  );
}

export default Footer;
