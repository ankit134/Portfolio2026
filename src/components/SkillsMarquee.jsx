import { skillTags as defaultSkillTags } from '../data/content'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function SkillsMarquee({ skillTags = defaultSkillTags }) {
  const reducedMotion = usePrefersReducedMotion()
  const items = [...skillTags, ...skillTags]

  if (reducedMotion) {
    return (
      <ul className="mt-10 flex flex-wrap gap-2">
        {skillTags.map((tag) => (
          <li key={tag}>
            <span className="hover-pill inline-block rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[#c4c4cc]">
              {tag}
            </span>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="marquee-mask relative mt-10 overflow-hidden">
      <div className="marquee-track flex w-max gap-3">
        {items.map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            className="hover-pill shrink-0 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[#c4c4cc]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
