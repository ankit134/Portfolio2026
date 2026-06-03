import { projects } from '../data/content'
import Parallax from './Parallax'
import ProjectMockup from './ProjectMockup'
import Reveal from './Reveal'

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
        <Reveal className="text-center">
          <h2 className="font-sans text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Selected Work
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#8A8A93] md:text-lg">
            Explore some of my projects
          </p>
        </Reveal>

        <div className="mt-20 flex flex-col gap-24 md:mt-28 md:gap-32">
          {projects.map((project, index) => {
            const isReverse = project.layout === 'reverse'
            const mockSpeed = isReverse ? 0.18 : 0.14
            const textSpeed = isReverse ? 0.1 : 0.08

            return (
              <Reveal key={project.id} delay={index * 80}>
                <article className="group grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
                  <div className={isReverse ? 'md:col-start-2 md:row-start-1' : ''}>
                    <Parallax speed={textSpeed}>
                      <p className="text-sm font-semibold text-[#FF5733] transition-colors duration-300 group-hover:text-[#ff7a5c]">
                        {project.category}
                      </p>
                      <h3 className="hover-title mt-2 font-sans text-3xl font-extrabold tracking-tight text-white/95 md:text-4xl">
                        {project.title}
                      </h3>
                      <p className="mt-5 text-base leading-relaxed text-[#8A8A93] transition-colors duration-300 group-hover:text-[#a0a0a9]">
                        {project.description}
                      </p>
                      <ul className="mt-8 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <li key={tag}>
                            <span className="hover-pill inline-block cursor-default rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-[#8A8A93]">
                              {tag}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </Parallax>
                  </div>
                  <div className={isReverse ? 'md:col-start-1 md:row-start-1' : ''}>
                    <Parallax speed={mockSpeed}>
                      <ProjectMockup
                        title={project.title}
                        mockBg={project.mockBg}
                        accent={project.accent}
                      />
                    </Parallax>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={200} className="mt-20 flex justify-center md:mt-28">
          <a
            href="#"
            className="btn-glow inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white"
          >
            View all projects
            <ArrowIcon />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
