import { useParallax } from '../hooks/useParallax'

export default function Parallax({ children, speed = 0.15, className = '' }) {
  const { ref, style } = useParallax(speed)

  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}
