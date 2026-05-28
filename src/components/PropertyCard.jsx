import { buildNextHref } from '../utils/breadcrumbHistory.js';

const whatsappNumber = '526531234567';

function formatPrice(amount, operation) {
  const formatted = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(amount);
  return operation === 'renta' ? `${formatted} / mes` : formatted;
}

function PropertyCard({ property }) {
  const onImageError = (event) => {
    const card = event.currentTarget.closest('.property-card');
    if (card) card.style.display = 'none';
  };

  const detailHref = buildNextHref(`/propiedad/${property.id}`, '/#propiedades');

  return (
    <article className="property-card">
      <div className="property-card__media">
        <img src={property.image} alt={property.title} loading="lazy" onError={onImageError} />
        <button type="button" className="property-card__favorite" aria-label="Guardar">
          ♡
        </button>
      </div>
      <div className="property-card__body">
        <div className="property-card__tags">
          <span>{property.type.toUpperCase()}</span>
          <span>{property.operation === 'renta' ? 'RENTA' : 'VENTA'}</span>
        </div>
        <p className="property-card__price">{formatPrice(property.price, property.operation)}</p>
        <h3 className="property-card__title">{property.title}</h3>
        <div className="property-card__features">
          <span>{property.area} m²</span>
          {property.beds != null ? <span>{property.beds} Recám.</span> : null}
          {property.baths != null ? <span>{property.baths} Baños</span> : null}
        </div>
        <div className="property-card__actions">
          <a
            href={detailHref}
            className="btn btn-outline btn-contactar"
            target="_blank"
            rel="noopener noreferrer"
          >
            Consultar
          </a>
        </div>
      </div>
    </article>
  );
}

export default PropertyCard;
