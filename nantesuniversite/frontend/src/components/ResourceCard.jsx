const CATEGORY_COLORS = {
  prix: '#ffc800',
  article: '#ff0000',
  conference: '#a900f9',
  livre: '#00c450',
  podcast: '#ff0064',
  recherche: '#00c9ff',
};

export default function ResourceCard({
  pictogramme,
  category,
  title,
  left,
  top,
  width = 612,
  height = 187,
  description = null,
  cardRef,
}) {
  const color = CATEGORY_COLORS[category] ?? '#3552ff';
  const label = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div
      ref={cardRef}
      className="class-resource-card group"
      style={{ left, top, width, height, '--card-accent': color }}
    >
      <div className="class-resource-card__glow" />

      <img
        src={pictogramme}
        alt={label}
        className="class-pictogramme"
      />

      <div className="class-ressource-contain">
        <span
          className="class-category-ressource"
          style={{ backgroundColor: color }}
        >
          {label}
        </span>
        <h3 className="class-title-ressource">
          {title}
        </h3>
        <p className="class-description-ressource">
          {description}
        </p>
      </div>
    </div>
  );
}
