import { projects } from '../data/content'
import ProjectMockup from './ProjectMockup'

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
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
  return (
    <section id="work" className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="font-sans text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Selected Work
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#8A8A93] md:text-lg">
            Explore some of my projects
          </p>
        </div>

        <div className="mt-20 flex flex-col gap-24 md:mt-28 md:gap-32">
          {projects.map((project) => {
            const isReverse = project.layout === 'reverse'
            return (
              <article
                key={project.id}
                className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-20"
              >
                <div className={isReverse ? 'md:col-start-2 md:row-start-1' : ''}>
                  <p className="text-sm font-semibold text-[#FF5733]">{project.category}</p>
                  <h3 className="mt-2 font-sans text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                    {project.title}
                  </h3>
                  <p className="mt-5 text-base leading-relaxed text-[#8A8A93]">
                    {project.description}
                  </p>
                  <ul className="mt-8 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li key={tag}>
                        <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-[#8A8A93]">
                          {tag}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={isReverse ? 'md:col-start-1 md:row-start-1' : ''}>
                  <ProjectMockup
                    title={project.title}
                    mockBg={project.mockBg}
                    accent={project.accent}
                  />
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-20 flex justify-center md:mt-28">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/25 hover:bg-white/10"
          >
            View all projects
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  )
}
