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
  
  const nextBase = nextPath.split('?')[0];
  const currentBase = currentPath.split('?')[0];
  
  let newTrail = [...trail];
  
  // Only push the current path if it's not the home page and not the same base as target
  if (currentBase !== '/' && currentBase !== nextBase) {
    const lastItem = newTrail[newTrail.length - 1];
    const lastItemBase = lastItem ? lastItem.split('?')[0] : '';
    if (lastItemBase !== currentBase) {
      newTrail.push(currentPath);
    }
  } else if (currentBase === '/') {
    // If we start from home, reset the trail to just home
    newTrail = ['/'];
  }
  
  // Truncate the trail if we are navigating back to a page already in the history
  const targetIndex = newTrail.findIndex(path => path.split('?')[0] === nextBase);
  if (targetIndex !== -1) {
    newTrail = newTrail.slice(0, targetIndex);
  }
  
  const separator = nextPath.includes('?') ? '&' : '?';
  return newTrail.length > 0 
    ? `${nextPath}${separator}from=${newTrail.join(',')}` 
    : nextPath;
}
