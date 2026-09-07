import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import '../styles/selected-work.css'
import { usePortfolio } from '../hooks/usePortfolio'
import { useWorkStack } from '../hooks/useWorkStack'
import ProjectStackCard from './selected-work/ProjectStackCard'

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function SelectedWork() {
  const { projects } = usePortfolio()
  const itemRefs = useMemo(() => projects.map(() => ({ current: null })), [projects])
  const cardStyles = useWorkStack(itemRefs, projects.length)

  return (
    <section id="work" className="work-section">
      <div className="work-frame">
        <header className="work-header">
          <h2 className="work-header__title">Selected Work</h2>
          <p className="work-header__subtitle">Explore some of my projects</p>
        </header>

        <div className="work-stack">
          {projects.map((project, index) => (
            <ProjectStackCard
              key={project.id}
              ref={(node) => {
                itemRefs[index].current = node
              }}
              project={project}
              index={index}
              cardStyle={cardStyles[index]}
            />
          ))}
        </div>

        <div className="work-cta-wrap">
          <Link to={`/projects/${projects[0]?.id ?? 'drop'}`} className="work-cta">
            View project details
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  )
}
