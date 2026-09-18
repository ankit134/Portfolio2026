import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

function readScrollProgress() {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  return docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
}

export default function ScrollProgress() {
  const { pathname } = useLocation()
  const reducedMotion = usePrefersReducedMotion()
  const [progress, setProgress] = useState(() =>
    reducedMotion ? 0 : readScrollProgress(),
  )

  const update = useCallback(() => {
    setProgress(readScrollProgress())
  }, [])

  useEffect(() => {
    if (reducedMotion) return

    const frame = requestAnimationFrame(update)
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [reducedMotion, update, pathname])

  if (reducedMotion) return null

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[2px] w-full bg-white/5"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-[#FF5733] to-[#ff8a6b] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
