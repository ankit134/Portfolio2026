import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AmbientBackground from '../components/AmbientBackground'
import ProjectListItem from '../components/selected-work/ProjectListItem'
import { PortfolioProvider } from '../context/PortfolioContext'
import { usePortfolioData } from '../hooks/usePortfolioData'
import '../styles/recent-works.css'

function ProjectsListContent() {
  const { data: portfolio, isLoading, isError } = usePortfolioData()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B0B0B] text-[#8A8A93]">
        Loading projects…
      </div>
    )
  }

  if (isError || !portfolio) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0B0B0B] px-6 text-center">
        <p className="text-[#8A8A93]">Could not load projects.</p>
        <Link to="/" className="text-[#FF5733] hover:underline">
          Back to home
        </Link>
      </div>
    )
  }

  return (
    <PortfolioProvider value={portfolio}>
      <div className="relative min-h-screen overflow-x-clip bg-[#0B0B0B] font-sans antialiased">
        <AmbientBackground />
        <Navbar />
        <main className="recent-works">
          <div className="recent-works__inner">
            <header className="recent-works__header">
              <Link
                to="/#work"
                className="mb-6 inline-block text-sm font-medium text-[#8A8A93] transition-colors hover:text-white"
              >
                ← Back to home
              </Link>
              <h1 className="recent-works__title">Recent works</h1>
              <p className="recent-works__subtitle">Explore my recent projects</p>
            </header>

            <ul className="recent-works__list">
              {portfolio.projects.map((project) => (
                <ProjectListItem key={project.id} project={project} />
              ))}
            </ul>
          </div>
        </main>
        <Footer />
      </div>
    </PortfolioProvider>
  )
}

export default function ProjectsListPage() {
  return <ProjectsListContent />
}
