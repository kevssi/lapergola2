import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import App from './App.jsx';
import Desayuno from './pages/Desayuno.jsx';
import Asiatico from './pages/Asiatico.jsx';
import Contacto from './pages/Contacto.jsx';
import Menu from './pages/Menu.jsx';
import '../styles.css';

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/desayuno" element={<Desayuno />} />
        <Route path="/asiatico" element={<Asiatico />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
