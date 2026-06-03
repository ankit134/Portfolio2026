import { useCallback, useRef } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export function useMagnetic(strength = 0.35) {
  const ref = useRef(null)
  const reducedMotion = usePrefersReducedMotion()

  const onMove = useCallback(
    (e) => {
      if (reducedMotion || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = e.clientX - (rect.left + rect.width / 2)
      const y = e.clientY - (rect.top + rect.height / 2)
      ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    },
    [strength, reducedMotion],
  )

  const onLeave = useCallback(() => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0, 0)'
  }, [])

  return { ref, onMove, onLeave }
}
