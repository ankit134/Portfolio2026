import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AmbientBackground from '../components/AmbientBackground'
import { PortfolioProvider } from '../context/PortfolioContext'
import { usePortfolioData } from '../hooks/usePortfolioData'
import { useProject } from '../hooks/usePortfolioData'
import ProjectVisual from '../components/selected-work/ProjectVisual'

function ProjectContent() {
  const { slug } = useParams()
  const { data: portfolio } = usePortfolioData()
  const { data: project, isLoading, isError } = useProject(slug)

  if (isLoading || !portfolio) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B0B0B] text-[#8A8A93]">
        Loading project…
      </div>
    )
  }

  if (isError || !project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0B0B0B] px-6 text-center">
        <p className="text-[#8A8A93]">Project not found.</p>
        <Link to="/" className="text-[#FF5733] hover:underline">
          Back to home
        </Link>
      </div>
    )
  }

  const caseStudy = project.caseStudy ?? {}
  const sections = caseStudy.sections ?? []

  return (
    <PortfolioProvider value={portfolio}>
      <div className="relative min-h-screen overflow-x-clip bg-[#0B0B0B] font-sans antialiased">
        <AmbientBackground />
        <Navbar />
        <main className="px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-4xl">
            <Link
              to="/#work"
              className="text-sm font-medium text-[#8A8A93] transition-colors hover:text-white"
            >
              ← Back to work
            </Link>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5733]">
              {project.category}
            </p>
            <h1 className="mt-3 font-sans text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              {project.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[#8A8A93]">{project.description}</p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li key={tag}>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-[#c4c4cc]">
                    {tag}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-[#111113]">
              <ProjectVisual
                title={project.title}
                padColor={project.padColor}
                image={project.image}
                imageAlt={project.imageAlt}
              />
            </div>

            {caseStudy.overview && (
              <div className="mt-12">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Overview</h2>
                <p className="mt-4 text-base leading-relaxed text-[#8A8A93]">{caseStudy.overview}</p>
              </div>
            )}

            {(caseStudy.role || caseStudy.tools?.length) && (
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {caseStudy.role && (
                  <div className="rounded-xl border border-white/10 bg-[#161616] p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#FF5733]">Role</p>
                    <p className="mt-2 text-white">{caseStudy.role}</p>
                  </div>
                )}
                {caseStudy.tools?.length > 0 && (
                  <div className="rounded-xl border border-white/10 bg-[#161616] p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#FF5733]">Tools</p>
                    <p className="mt-2 text-white">{caseStudy.tools.join(', ')}</p>
                  </div>
                )}
              </div>
            )}

            {sections.length > 0 && (
              <div className="mt-12 space-y-10">
                {sections.map((section) => (
                  <article key={section.heading}>
                    <h2 className="text-xl font-bold text-white">{section.heading}</h2>
                    <p className="mt-3 text-base leading-relaxed text-[#8A8A93]">{section.body}</p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </PortfolioProvider>
  )
}

export default function ProjectPage() {
  return <ProjectContent />
}
