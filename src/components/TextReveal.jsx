import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function TextReveal({ text, className = '', delay = 0, as: Tag = 'span' }) {
  const reducedMotion = usePrefersReducedMotion()

  if (reducedMotion) {
    return <Tag className={className}>{text}</Tag>
  }

  const words = text.split(' ')

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="text-reveal-part inline-block"
          style={{ animationDelay: `${delay + i * 0.045}s` }}
          aria-hidden={i > 0 ? undefined : false}
        >
          {word}
          {i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  )
}
