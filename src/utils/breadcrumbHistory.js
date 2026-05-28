import { properties } from '../data.js';

export const sectionNames = {
  '/': 'Inicio',
  '/#propiedades': 'Propiedades',
  '/propiedades': 'Propiedades',
  '/vender': 'Vender',
  '/servicios': 'Servicios',
  '/contacto': 'Contacto',
  '/propiedad': 'Propiedad',
};

export function buildBreadcrumb(currentPath) {
  const params = new URLSearchParams(window.location.search);
  const from = params.get('from');

  let currentName = sectionNames[currentPath];
  // support dynamic property pages like /propiedad/2 -> show property title
  if (!currentName && currentPath.startsWith('/propiedad/')) {
    const id = Number(currentPath.split('/').pop());
    const prop = properties.find((p) => p.id === id);
    currentName = prop ? prop.title : sectionNames['/propiedad'];
  }
  const current = { name: currentName || currentPath, href: currentPath, current: true };

  if (!from) {
    return [
      { name: 'Inicio', href: '/', current: false },
      current,
    ];
  }

  const trail = from.split(',').filter(Boolean);
  const items = trail.map((path, idx) => ({
    name: sectionNames[path] || path,
    href: buildHrefWithTrail(path, trail.slice(0, idx)),
    current: false,
  }));

  return [...items, current];
}

function buildHrefWithTrail(path, prevTrail) {
  if (!prevTrail || prevTrail.length === 0) return path;
  return `${path}?from=${prevTrail.join(',')}`;
}

export function buildNextHref(nextPath, currentPath) {
  const params = new URLSearchParams(window.location.search);
  const from = params.get('from');
  const trail = from ? from.split(',').filter(Boolean) : [];
  const newTrail = [...trail, currentPath];
  return `${nextPath}?from=${newTrail.join(',')}`;
}
