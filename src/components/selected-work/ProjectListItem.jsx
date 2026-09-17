import { useNavigate } from 'react-router-dom'
import { hasCaseStudy } from '../../lib/caseStudy'
import { useMinLg } from '../../hooks/useMinLg'
import { usePointerFollow } from '../../hooks/usePointerFollow'
import ProjectVisual from './ProjectVisual'
import CaseStudyCta from './CaseStudyCta'

export default function ProjectListItem({ project }) {
  const navigate = useNavigate()
  const isDesktopHover = useMinLg()
  const caseStudyReady = hasCaseStudy(project.caseStudy)
  const cardIsLink = caseStudyReady && !isDesktopHover
  const pointerFollowEnabled = caseStudyReady && isDesktopHover
  const {
    containerRef,
    ctaRef,
    followPointer,
    onPointerEnter,
    onPointerMove,
    onPointerLeave,
  } = usePointerFollow(pointerFollowEnabled, {
    visibleClass: 'recent-works__cta--visible',
  })

  function openCaseStudy() {
    if (cardIsLink) {
      navigate(`/projects/${project.id}`)
    }
  }

  function handleKeyDown(e) {
    if (cardIsLink && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      navigate(`/projects/${project.id}`)
    }
  }

  return (
    <li className="recent-works__item">
      <article
        ref={containerRef}
        className={`recent-works__card${cardIsLink ? ' recent-works__card--interactive' : ''}${followPointer ? ' recent-works__card--hide-cursor' : ''}`}
        onClick={openCaseStudy}
        onKeyDown={handleKeyDown}
        onMouseEnter={pointerFollowEnabled ? onPointerEnter : undefined}
        onMouseMove={pointerFollowEnabled ? onPointerMove : undefined}
        onMouseLeave={pointerFollowEnabled ? onPointerLeave : undefined}
        role={cardIsLink ? 'link' : undefined}
        tabIndex={cardIsLink ? 0 : undefined}
        aria-label={cardIsLink ? `View case study for ${project.title}` : undefined}
      >
        <div>
          <p className="recent-works__category">{project.category}</p>
          <h2 className="recent-works__project-title">{project.title}</h2>
          <p className="recent-works__description">{project.description}</p>
          <ul className="recent-works__tags">
            {project.tags.map((tag) => (
              <li key={tag}>
                <span className="recent-works__tag">{tag}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="recent-works__visual-wrap">
          <ProjectVisual
            title={project.title}
            padColor={project.padColor}
            image={project.image}
            imageAlt={project.imageAlt}
          />
        </div>

        {isDesktopHover ? (
          <CaseStudyCta
            ref={ctaRef}
            projectSlug={project.id}
            enabled={caseStudyReady}
            className={`recent-works__cta${followPointer ? ' recent-works__cta--follow' : ''}`}
          />
        ) : null}
      </article>
    </li>
  )
}
