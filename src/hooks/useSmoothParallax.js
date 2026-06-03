import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

const LERP = 0.08

export function useSmoothParallax(speed = 0.15) {
  const ref = useRef(null)
  const targetRef = useRef(0)
  const currentRef = useRef(0)
  const [offset, setOffset] = useState(0)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reducedMotion) {
      setOffset(0)
      return
    }

    let rafId = 0

    const measure = () => {
      const el = ref.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const viewportH = window.innerHeight
      const elementCenter = rect.top + rect.height / 2
      const distanceFromCenter = elementCenter - viewportH / 2
      const normalized = distanceFromCenter / viewportH

      targetRef.current = normalized * speed * 100
    }

    const tick = () => {
      const diff = targetRef.current - currentRef.current
      if (Math.abs(diff) > 0.05) {
        currentRef.current += diff * LERP
        setOffset(currentRef.current)
      }
      rafId = requestAnimationFrame(tick)
    }

    const onScroll = () => measure()

    measure()
    rafId = requestAnimationFrame(tick)
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
    style: reducedMotion ? undefined : { transform: `translate3d(0, ${offset}px, 0)` },
  }
}
