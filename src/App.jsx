import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import SelectedWork from './components/SelectedWork'
import Reviews from './components/Reviews'
import Footer from './components/Footer'
import AmbientBackground from './components/AmbientBackground'

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0B0B0B] font-sans antialiased">
      <AmbientBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <SelectedWork />
        <Reviews />
      </main>
      <Footer />
    </div>
  )
}

export default App
