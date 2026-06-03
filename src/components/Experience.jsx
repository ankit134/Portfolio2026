import { experience } from '../data/content'
import Reveal from './Reveal'

function CompanyMark({ company }) {
  const initials = company
    .split(' ')
    .filter((w) => w.length > 2 && /^[A-Z]/.test(w[0] || ''))
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || company.slice(0, 2).toUpperCase()

  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white transition-all duration-300 group-hover:bg-[#FF5733]/20 group-hover:ring-2 group-hover:ring-[#FF5733]/30"
      aria-hidden="true"
    >
      {initials}
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="text-sm font-semibold text-[#FF5733]">Experience</p>
          <h2 className="mt-4 font-sans text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Where I&apos;ve worked
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#8A8A93]">
            UX/UI design roles and earlier frontend & marketing experience across Kathmandu and
            Lalitpur.
          </p>
        </Reveal>

        <div className="mt-16 grid auto-rows-min grid-cols-1 gap-4 md:mt-20 md:grid-flow-dense md:grid-cols-3 md:gap-5">
          {experience.map((item, index) => (
            <Reveal
              key={item.id}
              delay={(index % 5) * 60}
              direction="scale"
              className={`h-full ${item.span} ${
                index % 3 === 0 ? 'md:min-h-[240px]' : 'md:min-h-[220px]'
              }`}
            >
              <article className="hover-lift group flex h-full flex-col rounded-xl border border-transparent bg-[#161616] p-6 hover:border-white/10">
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#FF5733]">
                    {item.period}
                  </p>
                  <h3 className="mt-2 font-sans text-lg font-bold text-white transition-colors duration-300 group-hover:text-white">
                    {item.role}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[#c4c4cc]">{item.company}</p>
                  <p className="mt-1 text-sm text-[#8A8A93]">{item.location}</p>
                  <ul className="mt-4 space-y-2">
                    {item.highlights.map((point) => (
                      <li
                        key={point}
                        className="text-[14px] leading-relaxed text-[#8A8A93] transition-colors duration-300 group-hover:text-[#a8a8b0]"
                      >
                        · {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <footer className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-5">
                  <CompanyMark company={item.company} />
                  <p className="text-sm text-[#8A8A93]">Professional experience</p>
                </footer>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
