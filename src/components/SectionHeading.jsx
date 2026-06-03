import Reveal from './Reveal'
import TextReveal from './TextReveal'

export default function SectionHeading({
  label,
  title,
  subtitle,
  labelClassName = 'text-sm font-semibold text-[#FF5733]',
  align = 'center',
}) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left'

  return (
    <Reveal blur className={alignClass}>
      {label && <p className={labelClassName}>{label}</p>}
      <h2 className="mt-4 font-sans text-4xl font-extrabold tracking-tight text-white md:text-5xl">
        <TextReveal text={title} delay={0.1} />
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base leading-relaxed text-[#8A8A93] md:text-lg ${align === 'center' ? 'mx-auto max-w-xl' : 'max-w-xl'}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}
