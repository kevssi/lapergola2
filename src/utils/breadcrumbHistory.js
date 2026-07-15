export const sectionNames = {
  '/': 'Inicio',
  '/desayuno': 'Desayunos',
  '/asiatico': 'Comida Asiática',
  '/contacto': 'Contacto',
  '/menu': 'Menú Completo',
};

export async function construirMigasPan(currentPath) {
  const params = new URLSearchParams(window.location.search);
  const from = params.get('from');

  // Strip query parameters to get raw pathname for section title mapping
  const rawPath = currentPath.split('?')[0];
  let currentName = sectionNames[rawPath];
  const current = { name: currentName || rawPath, href: currentPath, current: true };

  if (!from) {
    return [
      { name: 'Inicio', href: '/', current: false },
      current,
    ];
  }

  const trail = from.split(',').filter(Boolean);
  const items = trail.map((path, idx) => ({
    name: sectionNames[path] || path,
    href: construirEnlaceConRuta(path, trail.slice(0, idx)),
    current: false,
  }));

  return [...items, current];
}

function construirEnlaceConRuta(path, prevTrail) {
  if (!prevTrail || prevTrail.length === 0) return path;
  const separator = path.includes('?') ? '&' : '?';
  return `${path}${separator}from=${prevTrail.join(',')}`;
}

export function construirSiguienteEnlace(nextPath, currentPath) {
  const params = new URLSearchParams(window.location.search);
  const from = params.get('from');
  const trail = from ? from.split(',').filter(Boolean) : [];
  const newTrail = [...trail, currentPath];
  const separator = nextPath.includes('?') ? '&' : '?';
  return `${nextPath}${separator}from=${newTrail.join(',')}`;
}
