import { useTilt } from '../hooks/useTilt'

export default function TiltCard({ children, className = '', intensity = 8 }) {
  const { ref, onMove, onLeave } = useTilt(intensity)

  return (
    <div
      ref={ref}
      className={`tilt-card transition-transform duration-200 ease-out ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  )
}
