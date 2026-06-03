import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import SelectedWork from './components/SelectedWork'
import Experience from './components/Experience'
import Footer from './components/Footer'
import AmbientBackground from './components/AmbientBackground'
import ScrollProgress from './components/ScrollProgress'

function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#0B0B0B] font-sans antialiased">
      <ScrollProgress />
      <AmbientBackground />
      <Navbar />
      <main className="overflow-visible">
        <Hero />
        <About />
        <SelectedWork />
        <Experience />
      </main>
      <Footer />
    </div>
  )
}

export default App
