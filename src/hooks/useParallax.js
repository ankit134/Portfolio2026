import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * Scroll-linked parallax offset in pixels.
 * Positive speed moves element down as you scroll; negative moves up (background depth).
 */
export function useParallax(speed = 0.15) {
  const ref = useRef(null)
  const [offset, setOffset] = useState(0)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reducedMotion) {
      setOffset(0)
      return
    }

    let rafId = 0

    const update = () => {
      const el = ref.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const viewportH = window.innerHeight
      const elementCenter = rect.top + rect.height / 2
      const distanceFromCenter = elementCenter - viewportH / 2
      const normalized = distanceFromCenter / viewportH

      setOffset(normalized * speed * 100)
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
  }, [speed, reducedMotion])

  return {
    ref,
    offset,
    style: reducedMotion ? undefined : { transform: `translate3d(0, ${offset}px, 0)` },
  }
}
