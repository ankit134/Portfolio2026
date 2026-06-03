export default function ProjectVisual({ title, padColor, style }) {
  return (
    <div className="work-visual" style={style}>
      <div className="work-visual__pad" style={{ backgroundColor: padColor }}>
        <div
          className="work-visual__placeholder"
          role="img"
          aria-label={`${title} project preview`}
        />
      </div>
    </div>
  )
}
