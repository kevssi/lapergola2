import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { obtenerPlatillosDestacados } from './data.js';
import Breadcrumb from './components/Breadcrumb.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { construirSiguienteEnlace } from './utils/breadcrumbHistory.js';
import { Target, Compass, Clock, Truck, ChevronLeft, ChevronRight } from 'lucide-react';

const sectionIds = ['inicio', 'concepto', 'mision-vision', 'contacto'];

const localSectionTitles = {
  inicio: 'Inicio',
  concepto: 'El Concepto',
  'mision-vision': 'Misión y Visión',
  contacto: 'Contacto y Pedidos',
};

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

const carouselSlides = [
  {
    image: '/images/carousel_interior_1.png',
    title: 'Nuestra Terraza',
    description: 'Un espacio acogedor rodeado de naturaleza y buena vibra.'
  },
  {
    image: '/images/carousel_pancakes.png',
    title: 'Desayunos Clásicos',
    description: 'Pancakes esponjosos con fresas frescas, miel y crema.'
  },
  {
    image: '/images/carousel_interior_2.png',
    title: 'Comedor Confortable',
    description: 'Mesas espaciosas ideales para compartir momentos en familia.'
  },
  {
    image: '/images/carousel_shrimp_nachos.png',
    title: 'Especialidades del Mar',
    description: 'Totopos crujientes con camarones sazonados al grill y aguacate.'
  },
  {
    image: '/images/carousel_interior_3.png',
    title: 'Rincón de la Calidez',
    description: 'Detalles que inspiran tranquilidad y una atmósfera agradable.'
  },
  {
    image: '/images/carousel_asian_chicken.png',
    title: 'Fusión Asiática',
    description: 'Pollo teriyaki glaseado acompañado de arroz frito al estilo oriental.'
  },
  {
    image: '/images/carousel_interior_4.png',
    title: 'Instalaciones Premium',
    description: 'Diseño elegante con toques florales para una experiencia única.'
  },
  {
    image: '/images/carousel_leaves_lattice.png',
    title: 'Muro de Hojas',
    description: 'Nuestra icónica pared verde que aporta frescura y vida.'
  },
  {
    image: '/images/carousel_leaf_focus.png',
    title: 'Atmósfera Natural',
    description: 'Cuidamos cada detalle para ofrecerte un ambiente inigualable.'
  }
];

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? carouselSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === carouselSlides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <section className="carousel-section">
      <div className="container">
        <div className="text-center" style={{ marginBottom: '2.5rem' }}>
          <span className="section-eyebrow">Galería de Fotos</span>
          <h2 className="section-title section-title--large" style={{ marginTop: '0.5rem' }}>Explora La Pergola</h2>
        </div>
        
        <div className="carousel-wrapper glass">
          <div className="carousel-track-container">
            <div 
              className="carousel-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {carouselSlides.map((slide, idx) => (
                <div key={idx} className="carousel-slide">
                  <div 
                    className="carousel-image-blur-bg" 
                    style={{ backgroundImage: `url(${slide.image})` }}
                  />
                  <div className="carousel-seal-watermark carousel-seal-watermark--left">
                    <svg viewBox="0 0 60 200" fill="none" stroke="var(--gold)" strokeWidth="1.2" className="carousel-leaf-svg">
                      <path d="M30,10 C30,70 30,130 30,190" />
                      <path d="M30,30 C15,25 10,40 30,55" fill="rgba(212, 175, 55, 0.05)" />
                      <path d="M30,45 C45,40 50,55 30,70" fill="rgba(212, 175, 55, 0.05)" />
                      <path d="M30,80 C15,75 10,90 30,105" fill="rgba(212, 175, 55, 0.05)" />
                      <path d="M30,95 C45,90 50,105 30,120" fill="rgba(212, 175, 55, 0.05)" />
                      <path d="M30,130 C15,125 10,140 30,155" fill="rgba(212, 175, 55, 0.05)" />
                      <path d="M30,145 C45,140 50,155 30,170" fill="rgba(212, 175, 55, 0.05)" />
                    </svg>
                  </div>
                  <img src={slide.image} alt={slide.title} className="carousel-image" />
                  <div className="carousel-seal-watermark carousel-seal-watermark--right">
                    <svg viewBox="0 0 60 200" fill="none" stroke="var(--gold)" strokeWidth="1.2" className="carousel-leaf-svg" style={{ transform: 'scaleX(-1)' }}>
                      <path d="M30,10 C30,70 30,130 30,190" />
                      <path d="M30,30 C15,25 10,40 30,55" fill="rgba(212, 175, 55, 0.05)" />
                      <path d="M30,45 C45,40 50,55 30,70" fill="rgba(212, 175, 55, 0.05)" />
                      <path d="M30,80 C15,75 10,90 30,105" fill="rgba(212, 175, 55, 0.05)" />
                      <path d="M30,95 C45,90 50,105 30,120" fill="rgba(212, 175, 55, 0.05)" />
                      <path d="M30,130 C15,125 10,140 30,155" fill="rgba(212, 175, 55, 0.05)" />
                      <path d="M30,145 C45,140 50,155 30,170" fill="rgba(212, 175, 55, 0.05)" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <button 
            onClick={prevSlide} 
            className="carousel-btn carousel-btn--left" 
            aria-label="Diapositiva anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide} 
            className="carousel-btn carousel-btn--right" 
            aria-label="Diapositiva siguiente"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="carousel-dots">
            {carouselSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
                aria-label={`Ir a la diapositiva ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [featuredDishes, setFeaturedDishes] = useState([]);

  useEffect(() => {
    let isMounted = true;
    async function loadFeatured() {
      try {
        const dishes = await obtenerPlatillosDestacados();
        if (isMounted) {
          setFeaturedDishes(dishes);
        }
      } catch (err) {
        console.error("Error loading featured dishes:", err);
      }
    }
    loadFeatured();
    return () => {
      isMounted = false;
    };
  }, []);

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
    document.title = 'La Pergola | Restaurante - Desayunos & Comida Asiática';
    const description = document.querySelector('meta[name="description"]');
    const content = 'La Pergola Restaurante — Disfruta de los mejores desayunos por la mañana y de una exquisita comida asiática por la tarde. Haz tu pedido a domicilio o para llevar.';
    if (description) {
      description.content = content;
    }
  }, []);

  const breadcrumbItems = useMemo(() => {
    if (activeSection === 'inicio') {
      return [{ name: 'Inicio', href: '#inicio', current: true }];
    }
    return [
      { name: 'Inicio', href: '#inicio', current: false },
      { name: localSectionTitles[activeSection] || activeSection, href: `#${activeSection}`, current: true },
    ];
  }, [activeSection]);


  return (
    <div>
      <Header />

      {activeSection !== 'inicio' && <Breadcrumb items={breadcrumbItems} />}

      {/* Hero Section */}
      <section id="inicio" className="home-hero">
        <div className="home-hero__bg-overlay" />
        <div className="container home-hero__inner">
          <div className="home-hero__content glass">
            <div className="hero-badge">
              <Clock size={16} />
              <span>Desayunos: 8:00 AM – 2:00 PM</span>
            </div>
            <h1>Bienvenido a La Pergola</h1>
            <p className="home-hero__sub">
              Desayuno y comida mexicana por la mañana, y comida asiática por la tarde. Sabores auténticos listos para ordenar a domicilio o para llevar.
            </p>

            <div className="hero-actions">
              <a href="#concepto" className="btn btn-primary btn-lg">Explorar Concepto</a>
              <Link to={construirSiguienteEnlace('/contacto', '/')} className="btn btn-outline btn-lg">Hacer Pedido</Link>
            </div>
          </div>
        </div>
      </section>

      {/* El Concepto Section */}
      <section className="concept-section" id="concepto">
        <div className="container concept-grid-home">
          <div className="concept-text-side">
            <span className="section-eyebrow">Nuestra Propuesta</span>
            <h2 className="section-title section-title--large">Dos Mundos, Un Solo Lugar</h2>
            <p>
              En <strong>La Pergola</strong> creemos que cada momento del día merece su propio ritual. Por eso, hemos diseñado una experiencia dual que se adapta al curso del sol.
            </p>
            <p>
              Por las mañanas, disfruta de la frescura de nuestros desayunos clásicos y regionales. Por la tarde, nuestra cocina se transforma para dar paso al fuego del wok y la delicadeza del vapor asiático, ofreciendo sabores intensos y auténticos.
            </p>
            <div className="concept-links concept-actions">
              <Link to={construirSiguienteEnlace('/desayuno', '/')} className="btn btn-outline">Ver Menú Desayunos</Link>
              <Link to={construirSiguienteEnlace('/asiatico', '/')} className="btn btn-outline">Ver Menú Asiático</Link>
            </div>
          </div>
          <div className="concept-image-side">
            <div className="image-stack">
              <img src="/images/restaurant_interior.png" alt="La Pergola Comedor" className="img-large glass" />
              <img src="/images/menu_asian_chicken.png" alt="Comida Asiática" className="img-small glass" />
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión Section */}
      <section className="concept-section" id="mision-vision" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', background: 'var(--bg-dark)' }}>
        <div className="container">
          <div className="mission-vision-grid">
            {/* Misión Card */}
            <div className="glass mission-vision-card">
              <div className="card-icon-glow">
                <Target size={240} />
              </div>
              <div className="card-content">
                <span className="section-eyebrow">Nuestra Razón de Ser</span>
                <div className="card-title-group">
                  <Target size={28} className="card-title-icon" />
                  <h3>Misión</h3>
                </div>
                <p>
                  “Servir alimentos frescos y deliciosos con rapidez, calidad y atención excepcional, superando las expectativas de cada cliente.”
                </p>
              </div>
            </div>

            {/* Visión Card */}
            <div className="glass mission-vision-card">
              <div className="card-icon-glow">
                <Compass size={240} />
              </div>
              <div className="card-content">
                <span className="section-eyebrow">Nuestro Destino</span>
                <div className="card-title-group">
                  <Compass size={28} className="card-title-icon" />
                  <h3>Visión</h3>
                </div>
                <p>
                  “Ser el restaurante favorito de nuestra comunidad, reconocido por la calidad de nuestros alimentos, la excelencia en el servicio y un ambiente acogedor que inspire a nuestros clientes a regresar una y otra vez.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galería de Fotos (Carrusel) */}
      <Carousel />

      {/* Contact / Map Info Section */}
      <section className="contact-home-section" id="contacto">
        <div className="container contact-home-grid">
          {/* Horarios de Servicio Card */}
          <div className="contact-home-card glass mission-vision-card">
            <div className="card-icon-glow">
              <Clock size={240} />
            </div>
            <div className="card-content">
              <div className="card-title-group">
                <Clock size={28} className="card-title-icon" />
                <h3>Horarios de Servicio</h3>
              </div>
              <div className="hours-block">
                <div className="hours-row">
                  <strong>Desayuno y comida mexicana</strong>
                  <span>8:00 AM – 2:00 PM</span>
                </div>
                <div className="hours-row">
                  <strong>Comida Asiática</strong>
                  <span>1:00 PM – 9:00 PM</span>
                </div>
                <div className="hours-row" style={{ border: 'none', color: 'var(--accent-red)', fontWeight: 'bold' }}>
                  <strong>CERRADO</strong>
                  <span>LOS MARTES</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pedidos y Entregas Card */}
          <div className="contact-home-card glass mission-vision-card">
            <div className="card-icon-glow">
              <Truck size={240} />
            </div>
            <div className="card-content">
              <div className="card-title-group">
                <Truck size={28} className="card-title-icon" />
                <h3>Pedidos y Entregas</h3>
              </div>
              <p>Disfruta de nuestros platillos directamente en tu hogar. Haz tu pedido a domicilio o para pasar a recoger por llamada o mensaje.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                <a href="https://wa.me/526531751276" className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer" style={{ justifyContent: 'center' }}>
                  Llamar o WhatsApp: 653 175 1276
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;
