export default function ProjectVisual({ title, padColor, image, imageAlt }) {
  return (
    <div className="work-visual">
      <div className="work-visual__pad" style={{ backgroundColor: padColor }}>
        {image ? (
          <img
            src={image}
            alt={imageAlt || `${title} project preview`}
            className="work-visual__screen"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div
            className="work-visual__placeholder"
            role="img"
            aria-label={imageAlt || `${title} project preview`}
          />
        )}
      </div>
    </div>
  )
}
