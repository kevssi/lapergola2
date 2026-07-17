import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb.jsx';
import { construirMigasPan } from '../utils/breadcrumbHistory.js';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { obtenerPlatillos, beverages } from '../services/dataService.js';
import { Sparkles, Coffee, Flame, Clock } from 'lucide-react';

function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);
  
  // Sincronizar pestaña principal con la URL ?type=desayuno o ?type=asiatico
  const currentType = searchParams.get('type') === 'asiatico' ? 'asiatico' : 'desayuno';
  const [activeMainTab, setActiveMainTab] = useState(currentType);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Escuchar cambios en la URL para actualizar la pestaña activa
  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'asiatico' || type === 'desayuno') {
      setActiveMainTab(type);
    }
  }, [searchParams]);

  // Cargar platillos una sola vez al montar la página
  useEffect(() => {
    let isMounted = true;
    async function loadDishes() {
      try {
        setLoading(true);
        const data = await obtenerPlatillos();
        if (isMounted) {
          setDishes(data);
        }
      } catch (err) {
        console.error("Error loading dishes:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadDishes();
    return () => {
      isMounted = false;
    };
  }, []);

  // Actualizar título y migas de pan al cambiar de pestaña
  useEffect(() => {
    document.title = activeMainTab === 'desayuno' ? 'Menú de Desayunos | La Pergola' : 'Menú de Comida Asiática | La Pergola';
    
    let isMounted = true;
    async function loadBreadcrumbs() {
      try {
        const path = `/menu?type=${activeMainTab}`;
        const items = await construirMigasPan(path);
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
  }, [activeMainTab]);

  const handleMainTabChange = (type) => {
    setActiveMainTab(type);
    setSearchParams({ type });
  };

  // Definición de las subcategorías con mapeo de tipos para agrupación secuencial
  const subCategories = useMemo(() => {
    if (activeMainTab === 'desayuno') {
      return [
        { id: 'chilaquiles', name: 'Chilaquiles', types: ['Chilaquiles'] },
        { id: 'especialidades', name: 'Especialidades de la Casa', types: ['Especialidad Mexicana', 'Desayuno Fuerte'] },
        { id: 'burritos', name: 'Burritos', types: ['Burritos'] },
        { 
          id: 'omelettes', 
          name: 'Omelettes & Enmoladas', 
          matchFn: (dish) => dish.type === 'Omelette' || dish.title.toLowerCase().includes('enmolad') || dish.title.toLowerCase().includes('enchilad')
        },
        { id: 'hotcakes', name: 'Hot Cakes & Waffles', types: ['Hot Cakes & Waffles'] },
        { id: 'saludables', name: 'Toasts & Opciones Saludables', types: ['Toast / Masa Madre', 'Fruta & Saludable'] },
      ];
    } else {
      return [
        { id: 'entradas', name: 'Entradas & Yakimeshi', types: ['Entrada Asiática', 'Yakimeshi'] },
        { id: 'sushi', name: 'Sushi & Rollos Especiales', types: ['Sushi Natural', 'Sushi Empanizado', 'Sushi Gratinado'] },
        { id: 'ramen', name: 'Ramen Casero', types: ['Ramen'] },
        { id: 'teriyaki', name: 'Teriyaki & Bento Box', types: ['Teriyaki', 'Bento Box'] },
        { id: 'noodles', name: 'Noodles', types: ['Noodles'] },
        { id: 'especialidades', name: 'Especialidades Asiáticas', types: ['Especialidad Asiática'] },
        { id: 'kids', name: 'Menú Kids', types: ['Menú Kids'] },
      ];
    }
  }, [activeMainTab]);

  // Agrupamiento secuencial de platillos activos
  const groupedDishes = useMemo(() => {
    const groups = {};
    
    subCategories.forEach(sub => {
      const list = dishes.filter(dish => {
        // 1. Filtrar por categoría principal (desayuno / asiático)
        if (dish.category !== activeMainTab) return false;

        // 2. Filtrar por subcategoría de tipos
        if (sub.matchFn) {
          return sub.matchFn(dish);
        }
        return sub.types.includes(dish.type);
      });

      if (list.length > 0) {
        groups[sub.name] = list;
      }
    });

    return groups;
  }, [dishes, activeMainTab, subCategories]);

  // Agrupamiento de bebidas
  const filteredBeverages = useMemo(() => {
    if (activeMainTab !== 'desayuno') return [];
    return beverages;
  }, [activeMainTab]);

  const groupedBeverages = useMemo(() => {
    const groups = {};
    filteredBeverages.forEach(bev => {
      if (!groups[bev.type]) {
        groups[bev.type] = [];
      }
      groups[bev.type].push(bev);
    });
    return groups;
  }, [filteredBeverages]);

  const hasContent = useMemo(() => {
    return Object.keys(groupedDishes).length > 0 || Object.keys(groupedBeverages).length > 0;
  }, [groupedDishes, groupedBeverages]);

  return (
    <div>
      <Header />
      
      <main className={`menu-page ${activeMainTab === 'desayuno' ? 'menu-page--breakfast' : 'menu-page--asian'}`}>
        <Breadcrumb items={breadcrumbItems} />

        {/* Dynamic staggered watermarks for Asian menu */}
        {activeMainTab === 'asiatico' && (
          <div className="asian-watermarks-container" aria-hidden="true">
            {Array.from({ length: 10 }).map((_, index) => {
              const topPos = index * 110 + 60;
              const leftPositions = [12, 88, 25, 75, 40, 60, 18, 82, 33, 67, 50];
              const leftPercent = leftPositions[index % leftPositions.length];
              const rotation = (index * 67) % 360;
              const scale = 0.8 + (index % 3) * 0.15;
              const size = 140 + (index % 4) * 45;
              return (
                <div
                  key={index}
                  className="category-seal-watermark"
                  style={{
                    top: `${topPos}px`,
                    left: `${leftPercent}%`,
                    width: `${size}px`,
                    transform: `translate(-50%, 0) rotate(${rotation}deg) scale(${scale})`,
                  }}
                >
                  <img src="/images/logo_seal.png" alt="" />
                </div>
              );
            })}
          </div>
        )}

        {/* Pestañas Principales (Selector de Menús) */}
        <section className="menu-main-tabs-section">
          <div className="container">
            <div className="menu-main-tabs glass">
              <button
                className={`menu-main-tab-btn ${activeMainTab === 'desayuno' ? 'menu-main-tab-btn--active' : ''}`}
                onClick={() => handleMainTabChange('desayuno')}
              >
                <Coffee size={20} />
                Desayunos
              </button>
              <button
                className={`menu-main-tab-btn ${activeMainTab === 'asiatico' ? 'menu-main-tab-btn--active' : ''}`}
                onClick={() => handleMainTabChange('asiatico')}
              >
                <Flame size={20} />
                Comida Asiática
              </button>
            </div>

            {/* Banner de Horarios Dinámicos */}
            <div className="menu-hours-banner">
              <Clock size={16} style={{ marginRight: '0.4rem', verticalAlign: 'middle', display: 'inline-block' }} />
              {activeMainTab === 'desayuno' ? (
                <span>Horario de desayunos: <strong>8:00 AM – 2:00 PM</strong> | Cerrado los martes</span>
              ) : (
                <span>Horario de comida asiática: <strong>1:00 PM – 9:00 PM</strong> | Cerrado los martes</span>
              )}
            </div>
          </div>
        </section>

        <section className="menu-interactive-section" style={{ paddingTop: '1.5rem', paddingBottom: '5rem' }}>
          <div className="container">
            {/* Listado Secuencial de Platillos Agrupados bajo Subtítulos */}
            {loading ? (
              <div className="menu-loading">
                <div className="loading-spinner"></div>
                <p>Cargando menú...</p>
              </div>
            ) : hasContent ? (
              <div>
                {/* Secciones de Platillos */}
                {Object.entries(groupedDishes).map(([catName, list]) => (
                  <div key={catName} className="menu-category-group">
                    <h2 className="menu-category-subtitle">{catName}</h2>
                    <div className="menu-text-list">
                      {list.map((dish) => {
                        const orderMessage = `Hola, me gustaría ordenar el platillo "${dish.title}" de La Pergola.`;
                        const whatsappLink = `https://wa.me/526531751276?text=${encodeURIComponent(orderMessage)}`;
                        
                        return (
                          <div key={dish.id} className="menu-text-item">
                            <div className="menu-text-item-header">
                              <span className="menu-text-item-name">{dish.title}</span>
                              <div className="menu-text-item-leader"></div>
                              <div className="menu-text-item-price-wrapper">
                                <span className="menu-text-item-price">
                                  {dish.priceText ? dish.priceText : `$${dish.price} MXN`}
                                </span>
                                <a 
                                  href={whatsappLink} 
                                  className="menu-text-item-whatsapp" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  title={`Ordenar ${dish.title} por WhatsApp`}
                                >
                                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.488 1.977 14.03 1.953 11.986 1.95c-5.439 0-9.864 4.372-9.868 9.8.001 1.77.472 3.5 1.365 5.011l-.994 3.634 3.73-.978h-.002zm11.522-7.212c-.29-.144-1.711-.844-1.975-.94-.264-.096-.456-.144-.648.144-.192.288-.744.94-.912 1.134-.168.192-.336.216-.624.072-.288-.144-1.215-.447-2.316-1.429-.856-.764-1.435-1.706-1.603-1.994-.168-.288-.018-.444.126-.587.13-.13.29-.336.432-.504.144-.168.192-.288.288-.48.096-.192.048-.36-.024-.504-.072-.144-.648-1.56-.888-2.136-.233-.564-.473-.488-.648-.497-.168-.008-.36-.01-.552-.01s-.504.072-.768.36c-.264.288-1.008.984-1.008 2.397s1.032 2.784 1.176 2.976c.144.192 2.037 3.113 4.936 4.364.69.298 1.229.476 1.648.61.693.22 1.324.19 1.822.115.556-.084 1.711-.7 1.952-1.378.24-.678.24-1.26.168-1.378-.072-.119-.264-.192-.552-.336z" />
                                  </svg>
                                </a>
                              </div>
                            </div>
                            {dish.description && (
                              <p className="menu-text-item-description">{dish.description}</p>
                            )}
                            {dish.columns && (
                              <div className="menu-dish-columns">
                                {dish.columns.map((col, idx) => (
                                  <div key={idx} className="menu-dish-column">
                                    <h4 className="menu-dish-column-title">{col.title}</h4>
                                    <ul className="menu-dish-column-list">
                                      {col.items.map((item, itemIdx) => (
                                        <li key={itemIdx}>{item}</li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    {catName === 'Toasts & Opciones Saludables' && (
                      <div className="menu-category-footnote">
                        Todos nuestros Toast son hechos con hogaza de masa madre
                      </div>
                    )}
                  </div>
                ))}

                {/* Sección de Bebidas (Como apartado final en desayunos) */}
                {activeMainTab === 'desayuno' && Object.keys(groupedBeverages).length > 0 && (
                  <div className="menu-category-group">
                    <h2 className="menu-category-subtitle">Bebidas & Cafetería</h2>
                    <div className="beverages-card glass" style={{ marginTop: '1.5rem' }}>
                      <div className="beverages-grid">
                        {Object.entries(groupedBeverages).map(([groupTitle, list]) => (
                          <div key={groupTitle} className="beverages-group">
                            <h4 className="beverages-group-title">{groupTitle}</h4>
                            <ul className="beverages-list">
                              {list.map((bev, index) => {
                                // Separar nombre limpio y descripción si contiene paréntesis, ej. "Jugo Verde (Naranja, apio, manzana...)"
                                const nameParts = bev.name.match(/^([^(]+)\s*(?:\(([^)]+)\))?$/);
                                const cleanName = nameParts ? nameParts[1].trim() : bev.name;
                                const description = nameParts && nameParts[2] ? nameParts[2].trim() : null;

                                const orderMessage = `Hola, me gustaría ordenar la bebida "${cleanName}" de La Pergola.`;
                                const whatsappLink = `https://wa.me/526531751276?text=${encodeURIComponent(orderMessage)}`;
                                
                                return (
                                  <li key={index} className="beverage-item" style={{ marginBottom: '1.25rem', display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', width: '100%' }}>
                                      <span className="beverage-name" style={{ fontWeight: '600' }}>{cleanName}</span>
                                      <div className="beverage-leader"></div>
                                      <div className="menu-text-item-price-wrapper">
                                        <span className="beverage-price">${bev.price} MXN</span>
                                        <a 
                                          href={whatsappLink} 
                                          className="menu-text-item-whatsapp" 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          title={`Ordenar ${cleanName} por WhatsApp`}
                                        >
                                          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.488 1.977 14.03 1.953 11.986 1.95c-5.439 0-9.864 4.372-9.868 9.8.001 1.77.472 3.5 1.365 5.011l-.994 3.634 3.73-.978h-.002zm11.522-7.212c-.29-.144-1.711-.844-1.975-.94-.264-.096-.456-.144-.648.144-.192.288-.744.94-.912 1.134-.168.192-.336.216-.624.072-.288-.144-1.215-.447-2.316-1.429-.856-.764-1.435-1.706-1.603-1.994-.168-.288-.018-.444.126-.587.13-.13.29-.336.432-.504.144-.168.192-.288.288-.48.096-.192.048-.36-.024-.504-.072-.144-.648-1.56-.888-2.136-.233-.564-.473-.488-.648-.497-.168-.008-.36-.01-.552-.01s-.504.072-.768.36c-.264.288-1.008.984-1.008 2.397s1.032 2.784 1.176 2.976c.144.192 2.037 3.113 4.936 4.364.69.298 1.229.476 1.648.61.693.22 1.324.19 1.822.115.556-.084 1.711-.7 1.952-1.378.24-.678.24-1.26.168-1.378-.072-.119-.264-.192-.552-.336z" />
                                          </svg>
                                        </a>
                                      </div>
                                    </div>
                                    {description && (
                                      <p className="menu-text-item-description" style={{ fontSize: '0.85rem', margin: '0.15rem 0 0', fontStyle: 'italic' }}>
                                        {description}
                                      </p>
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="menu-empty glass">
                <Sparkles size={40} color="var(--gold)" />
                <h3>No se encontraron platillos</h3>
                <p>Intenta cambiar los términos de búsqueda.</p>
                <button 
                  className="btn btn-outline btn-sm" 
                  onClick={() => setSearchTerm('')}
                  style={{ marginTop: '1rem' }}
                >
                  Restablecer búsqueda
                </button>
              </div>
            )}
          </div>
        </section>
        {/* Wavy green relief curves for breakfasts */}
        {activeMainTab === 'desayuno' && (
          <div className="breakfast-bg-curves" aria-hidden="true">
            <div className="breakfast-curve-1"></div>
            <div className="breakfast-curve-2"></div>
            <div className="breakfast-curve-3"></div>
            <div className="breakfast-curve-4"></div>
            <div className="breakfast-curve-5"></div>
            <div className="breakfast-curve-6"></div>
            <div className="breakfast-curve-7"></div>
            <div className="breakfast-curve-8"></div>
            <div className="breakfast-curve-left"></div>
            <div className="breakfast-curve-right-1"></div>
            <div className="breakfast-curve-right-2"></div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Menu;
