import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AmbientBackground from '../components/AmbientBackground'
import CaseStudyContent from '../components/case-study/CaseStudyContent'
import { PortfolioProvider } from '../context/PortfolioContext'
import { usePortfolioData } from '../hooks/usePortfolioData'
import { useProject } from '../hooks/usePortfolioData'
import { hasCaseStudy } from '../lib/caseStudy'
import '../styles/case-study.css'

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

  const showCaseStudy = hasCaseStudy(project.caseStudy)

  return (
    <PortfolioProvider value={portfolio}>
      <div className="relative min-h-screen overflow-x-clip bg-[#0B0B0B] font-sans antialiased">
        <AmbientBackground />
        <Navbar />
        <main className="px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-4xl">
            <Link to="/#work" className="case-study__back">
              ← Back to work
            </Link>

            {showCaseStudy ? (
              <CaseStudyContent caseStudy={project.caseStudy} project={project} />
            ) : (
              <article className="case-study">
                <p className="case-study__eyebrow">{project.category}</p>
                <h1 className="case-study__title">{project.title}</h1>
                <p className="case-study__tagline">{project.description}</p>
                {project.tags?.length > 0 ? (
                  <ul className="case-study__tags">
                    {project.tags.map((tag) => (
                      <li key={tag}>
                        <span className="case-study__tag">{tag}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
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
