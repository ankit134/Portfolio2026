import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import SelectedWork from '../components/SelectedWork'
import Experience from '../components/Experience'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import AmbientBackground from '../components/AmbientBackground'
import ScrollProgress from '../components/ScrollProgress'
import { PortfolioProvider } from '../context/PortfolioContext'
import { usePortfolioData } from '../hooks/usePortfolioData'

function HomeContent() {
  const { data, isLoading, isError, refetch } = usePortfolioData()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B0B0B] text-[#8A8A93]">
        Loading portfolio…
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0B0B0B] px-6 text-center text-[#8A8A93]">
        <p>Could not load portfolio content.</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="text-[#FF5733] hover:underline"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <PortfolioProvider value={data}>
      {data.loadError && import.meta.env.DEV && (
        <div className="bg-amber-500/15 px-4 py-2 text-center text-sm text-amber-200">
          Supabase: {data.loadError} — showing static fallback. Check `.env.local` and restart{' '}
          <code className="text-amber-100">npm run dev</code>.
        </div>
      )}
      <div className="relative min-h-screen overflow-x-clip bg-[#0B0B0B] font-sans antialiased">
        <ScrollProgress />
        <AmbientBackground />
        <Navbar />
        <main className="overflow-visible">
          <Hero />
          <About />
          <SelectedWork />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </PortfolioProvider>
  )
}

export default function HomePage() {
  return <HomeContent />
}
