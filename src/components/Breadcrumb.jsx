function Breadcrumb({ items }) {
  return (
    <div className="breadcrumb container" aria-label="Breadcrumb">
      <ol className="breadcrumb-list" itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((crumb) => (
          <li
            className="breadcrumb-item"
            key={crumb.href}
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            {crumb.current ? (
              <span className="breadcrumb-item--current" aria-current="page">
                {crumb.name}
              </span>
            ) : (
              <a href={crumb.href}>{crumb.name}</a>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Breadcrumb;
