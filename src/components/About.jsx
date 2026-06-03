import { profile } from '../data/content'
import Parallax from './Parallax'
import Reveal from './Reveal'
import SkillsMarquee from './SkillsMarquee'
import TextReveal from './TextReveal'

export default function About() {
  return (
    <section id="about" className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
        <Reveal direction="left" blur className="group">
          <Parallax speed={0.2}>
            <div className="image-reveal-mask relative aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl bg-[#161616] transition-shadow duration-500 hover:shadow-2xl hover:shadow-black/50 md:max-w-none">
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1067&fit=crop&crop=faces"
                alt={`Portrait of ${profile.name}`}
                className="image-hover h-full w-full object-cover grayscale contrast-125"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/40 to-transparent transition-opacity duration-500 group-hover:opacity-70" />
            </div>
          </Parallax>
        </Reveal>
        <Reveal direction="right" delay={100} blur>
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5733]">
              a bit about myself
            </p>
            <h2 className="mt-4 font-sans text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-[3.25rem]">
              <TextReveal text="Just about" delay={0.05} />
              <br />
              <span className="text-[#8A8A93]">
                <TextReveal text="what i do" delay={0.2} />
              </span>
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-[#8A8A93]">
              <p>{profile.aboutSummary}</p>
              <p>{profile.aboutSecondary}</p>
            </div>
            <div className="mt-8 space-y-3 border-t border-white/[0.06] pt-6">
              <p className="text-sm text-[#8A8A93]">
                <span className="font-semibold text-white">Education:</span> {profile.education}
              </p>
              <p className="text-sm text-[#8A8A93]">
                <span className="font-semibold text-white">Certification:</span>{' '}
                {profile.certification}
              </p>
              <p className="text-sm text-[#8A8A93]">
                <span className="font-semibold text-white">Languages:</span> English (Fluent),
                Nepali (Native)
              </p>
            </div>
            <SkillsMarquee />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
