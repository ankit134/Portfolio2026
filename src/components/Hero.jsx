import Parallax from './Parallax'

export default function Hero() {
  return (
    <header className="relative overflow-hidden px-5 pb-16 pt-14 md:px-8 md:pb-24 md:pt-20">
      <Parallax speed={0.08} className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face"
          alt="Manoj Karki"
          width={56}
          height={56}
          className="hero-enter hero-avatar-float mb-8 h-14 w-14 rounded-full object-cover ring-2 ring-white/10 transition-shadow duration-300 hover:ring-[#FF5733]/40 hover:shadow-[0_0_28px_rgba(255,87,51,0.25)]"
        />
        <h1 className="hero-enter hero-enter-delay-1 font-sans text-[clamp(2rem,6vw,3.75rem)] font-extrabold leading-[1.08] tracking-tight text-white">
          Hola, I&apos;m{' '}
          <span className="badge-hover mx-1 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-0.5 align-middle text-[0.55em] font-bold tracking-normal text-white">
            Product Designer
          </span>{' '}
          based on{' '}
          <span
            className="inline-block align-middle transition-transform duration-300 hover:scale-110"
            role="img"
            aria-label="Nepal"
          >
            🇳🇵
          </span>{' '}
          Nepal
        </h1>
        <p className="hero-enter hero-enter-delay-2 mt-8 max-w-2xl text-base leading-relaxed text-[#8A8A93] md:text-lg">
          I design digital products specialize in transforming complex systems into clear,
          intuitive user journeys. My work spans web and mobile design for communication,
          productivity, and analytics platforms — helping teams reduce friction, boost
          retention, and grow confidently.
        </p>
      </Parallax>
      <div className="hero-enter hero-enter-delay-3 mx-auto mt-16 max-w-6xl border-t border-white/[0.08] transition-colors duration-500 hover:border-white/15 md:mt-24" />
    </header>
  )
}
