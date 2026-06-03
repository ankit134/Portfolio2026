import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

/**
 * Framer-style "layer in view" progress (0 → 1) as the element scrolls through the viewport.
 */
export function useInViewProgress(options = {}) {
  const { start = 0.88, end = 0.28 } = options
  const ref = useRef(null)
  const [progress, setProgress] = useState(0)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reducedMotion) {
      setProgress(1)
      return
    }

    let rafId = 0

    const update = () => {
      const el = ref.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const startPx = vh * start
      const endPx = vh * end
      const range = startPx - endPx + rect.height
      const travelled = startPx - rect.top

      setProgress(clamp(travelled / range))
    }

    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [start, end, reducedMotion])

  return { ref, progress }
}

export function framerEase(t) {
  return 1 - Math.pow(1 - t, 3)
}

export function mapRange(progress, start, end) {
  if (progress <= start) return 0
  if (progress >= end) return 1
  return (progress - start) / (end - start)
}
