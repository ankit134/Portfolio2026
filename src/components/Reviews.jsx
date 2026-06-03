import { testimonials } from '../data/content'

function Avatar({ name }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white"
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
        <div className="text-center">
          <p className="text-sm font-semibold text-[#FF5733]">Reviews</p>
          <h2 className="mt-4 font-sans text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            What they say about me
          </h2>
        </div>

        <div className="mt-16 grid auto-rows-min grid-cols-1 gap-4 md:mt-20 md:grid-flow-dense md:grid-cols-3 md:gap-5">
          {testimonials.map((item, index) => (
            <article
              key={item.name}
              className={`flex flex-col rounded-xl bg-[#161616] p-6 ${item.span} ${
                index % 3 === 1 ? 'md:min-h-[280px]' : index % 3 === 0 ? 'md:min-h-[220px]' : 'md:min-h-[240px]'
              }`}
            >
              <blockquote className="flex-1">
                <p className="text-[15px] leading-relaxed text-[#d4d4dc] md:text-base">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </blockquote>
              <footer className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-5">
                <Avatar name={item.name} />
                <div>
                  <cite className="not-italic font-semibold text-white">{item.name}</cite>
                  <p className="text-sm text-[#8A8A93]">{item.role}</p>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
