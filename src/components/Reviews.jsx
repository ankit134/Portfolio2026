import { testimonials } from '../data/content'
import Reveal from './Reveal'

function Avatar({ name }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white transition-all duration-300 group-hover:bg-[#FF5733]/20 group-hover:ring-2 group-hover:ring-[#FF5733]/30"
      aria-hidden="true"
    >
      {initials}
    </div>
  )
}

export default function Reviews() {
  return (
    <section id="reviews" className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="text-sm font-semibold text-[#FF5733]">Reviews</p>
          <h2 className="mt-4 font-sans text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            What they say about me
          </h2>
        </Reveal>

        <div className="mt-16 grid auto-rows-min grid-cols-1 gap-4 md:mt-20 md:grid-flow-dense md:grid-cols-3 md:gap-5">
          {testimonials.map((item, index) => (
            <Reveal
              key={item.name}
              delay={(index % 6) * 60}
              direction="scale"
              className={`h-full ${item.span} ${
                index % 3 === 1
                  ? 'md:min-h-[280px]'
                  : index % 3 === 0
                    ? 'md:min-h-[220px]'
                    : 'md:min-h-[240px]'
              }`}
            >
              <article className="hover-lift group flex h-full cursor-default flex-col rounded-xl border border-transparent bg-[#161616] p-6 hover:border-white/10">
                <blockquote className="flex-1">
                  <p className="text-[15px] leading-relaxed text-[#d4d4dc] transition-colors duration-300 group-hover:text-white md:text-base">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </blockquote>
                <footer className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-5 transition-colors duration-300 group-hover:border-white/12">
                  <Avatar name={item.name} />
                  <div>
                    <cite className="not-italic font-semibold text-white">{item.name}</cite>
                    <p className="text-sm text-[#8A8A93] transition-colors duration-300 group-hover:text-[#a8a8b0]">
                      {item.role}
                    </p>
                  </div>
                </footer>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
