import { useMagnetic } from '../hooks/useMagnetic'

export default function MagneticButton({ children, className = '', href = '#', ...props }) {
  const { ref, onMove, onLeave } = useMagnetic(0.28)

  return (
    <a
      ref={ref}
      href={href}
      className={`magnetic-wrap inline-flex transition-transform duration-300 ease-out ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...props}
    >
      {children}
    </a>
  )
}
