import { forwardRef } from 'react'
import { getCardPin } from '../../hooks/useWorkStack'
import ProjectVisual from './ProjectVisual'

const ProjectStackCard = forwardRef(function ProjectStackCard(
  { project, index, cardStyle = {} },
  ref,
) {
  const pinTop = getCardPin(index)

  return (
    <div ref={ref} className="work-stack-item" style={{ '--stack-index': index }}>
      <article
        className="work-card"
        style={{
          top: `${pinTop}px`,
          zIndex: index + 1,
          ...cardStyle,
        }}
      >
        <div className="work-card__grid">
          <div className="work-card__content">
            <div className="work-card__meta">
              <p className="work-card__category">{project.category}</p>
              <h3 className="work-card__title">{project.title}</h3>
            </div>
            <p className="work-card__description">{project.description}</p>
            <ul className="work-card__tags">
              {project.tags.map((tag) => (
                <li key={tag}>
                  <span className="work-card__tag">{tag}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="work-card__visual">
            <ProjectVisual title={project.title} padColor={project.padColor} />
          </div>
        </div>
      </article>
    </div>
  )
})

export default ProjectStackCard
