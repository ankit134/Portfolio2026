import { skillTags } from '../data/content'

export default function About() {
  return (
    <section id="about" className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
        <div className="relative aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl bg-[#161616] md:max-w-none">
          <img
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1067&fit=crop&crop=faces"
            alt="Portrait of Manoj Karki"
            className="h-full w-full object-cover grayscale contrast-125"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/40 to-transparent" />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5733]">
            a bit about myself
          </p>
          <h2 className="mt-4 font-sans text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-[3.25rem]">
            Just about
            <br />
            <span className="text-[#8A8A93]">what i do</span>
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-[#8A8A93]">
            <p>
              Namaste 🙏, I design human-centered digital products that bridge business goals
              with user needs. From SaaS dashboards to AI-powered platforms, I craft intuitive,
              data-driven, and visually consistent experiences that scale globally.
            </p>
            <p>
              When I&apos;m not designing, you&apos;ll likely find me on a bike ride or chatting
              with friends.
            </p>
          </div>
          <ul className="mt-10 flex flex-wrap gap-2">
            {skillTags.map((tag) => (
              <li key={tag}>
                <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[#c4c4cc]">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
