import { useMemo } from 'react'
import '../styles/selected-work.css'
import { usePortfolio } from '../hooks/usePortfolio'
import { useWorkStack } from '../hooks/useWorkStack'
import ProjectStackCard from './selected-work/ProjectStackCard'

export default function SelectedWork() {
  const { projects } = usePortfolio()
  const displayProjects = projects.length > 4 ? projects.slice(0, 4) : projects
  const itemRefs = useMemo(() => displayProjects.map(() => ({ current: null })), [displayProjects])
  const cardStyles = useWorkStack(itemRefs, displayProjects.length)

  return (
    <section id="work" className="work-section">
      <div className="work-frame">
        <header className="work-header">
          <h2 className="work-header__title">Selected Work</h2>
          <p className="work-header__subtitle">Explore some of my projects</p>
        </header>

        <div className="work-stack">
          {displayProjects.map((project, index) => (
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
      </div>
    </section>
  )
}
