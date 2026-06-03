export default function AnimatedDivider({ className = '' }) {
  return (
    <div
      className={`divider-grow mx-auto mt-16 max-w-6xl md:mt-24 ${className}`}
      aria-hidden="true"
    />
  )
}
