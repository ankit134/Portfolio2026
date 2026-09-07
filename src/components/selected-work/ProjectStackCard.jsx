import { forwardRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { hasCaseStudy } from '../../lib/caseStudy'
import { getCardPin } from '../../hooks/useWorkStack'
import { usePointerFollow } from '../../hooks/usePointerFollow'
import ProjectVisual from './ProjectVisual'
import CaseStudyCta from './CaseStudyCta'

const ProjectStackCard = forwardRef(function ProjectStackCard(
  { project, index, cardStyle = {} },
  ref,
) {
  const navigate = useNavigate()
  const pinTop = getCardPin(index)
  const caseStudyReady = hasCaseStudy(project.caseStudy)
  const {
    containerRef,
    ctaRef,
    followPointer,
    onPointerEnter,
    onPointerMove,
    onPointerLeave,
  } = usePointerFollow(caseStudyReady)

  function handleCardClick() {
    if (caseStudyReady) {
      navigate(`/projects/${project.id}`)
    }
  }

  function handleKeyDown(e) {
    if (caseStudyReady && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      navigate(`/projects/${project.id}`)
    }
  }

  return (
    <div ref={ref} className="work-stack-item" style={{ '--stack-index': index }}>
      <article
        ref={containerRef}
        className={`work-card${caseStudyReady ? ' work-card--interactive' : ''}${followPointer ? ' work-card--hide-cursor' : ''}`}
        style={{
          top: `${pinTop}px`,
          zIndex: index + 1,
          ...cardStyle,
        }}
        onClick={handleCardClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={onPointerEnter}
        onMouseMove={onPointerMove}
        onMouseLeave={onPointerLeave}
        role={caseStudyReady ? 'link' : undefined}
        tabIndex={caseStudyReady ? 0 : undefined}
        aria-label={caseStudyReady ? `View case study for ${project.title}` : undefined}
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
            <ProjectVisual
              title={project.title}
              padColor={project.padColor}
              image={project.image}
              imageAlt={project.imageAlt}
            />
          </div>
        </div>

        <CaseStudyCta
          ref={ctaRef}
          projectSlug={project.id}
          enabled={caseStudyReady}
          className={`work-card__cta${followPointer ? ' work-card__cta--follow' : ''}`}
        />
      </article>
    </div>
  )
})

export default ProjectStackCard
