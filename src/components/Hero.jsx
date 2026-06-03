export default function Hero() {
  return (
    <header className="px-5 pb-16 pt-14 md:px-8 md:pb-24 md:pt-20">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face"
          alt="Manoj Karki"
          width={56}
          height={56}
          className="mb-8 h-14 w-14 rounded-full object-cover ring-2 ring-white/10"
        />
        <h1 className="font-sans text-[clamp(2rem,6vw,3.75rem)] font-extrabold leading-[1.08] tracking-tight text-white">
          Hola, I&apos;m{' '}
          <span className="mx-1 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-0.5 align-middle text-[0.55em] font-bold tracking-normal text-white">
            Product Designer
          </span>{' '}
          based on{' '}
          <span className="inline-block align-middle" role="img" aria-label="Nepal">
            🇳🇵
          </span>{' '}
          Nepal
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-[#8A8A93] md:text-lg">
          I design digital products specialize in transforming complex systems into clear,
          intuitive user journeys. My work spans web and mobile design for communication,
          productivity, and analytics platforms — helping teams reduce friction, boost
          retention, and grow confidently.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-6xl border-t border-white/[0.08] md:mt-24" />
    </header>
  )
}
