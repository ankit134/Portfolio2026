import { hasCaseStudy } from '../../lib/caseStudy'
import ProjectVisual from './ProjectVisual'
import CaseStudyCta from './CaseStudyCta'

export default function ProjectListItem({ project }) {
  const caseStudyReady = hasCaseStudy(project.caseStudy)

  return (
    <li className="recent-works__item">
      <article className="recent-works__card">
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
      </article>

      <CaseStudyCta
        projectSlug={project.id}
        enabled={caseStudyReady}
        className="recent-works__cta"
      />
    </li>
  )
}
