import { useCallback, useRef } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export function useTilt(intensity = 10) {
  const ref = useRef(null)
  const reducedMotion = usePrefersReducedMotion()

  const onMove = useCallback(
    (e) => {
      if (reducedMotion || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      ref.current.style.transform = `perspective(900px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg) translateZ(0)`
    },
    [intensity, reducedMotion],
  )

  const onLeave = useCallback(() => {
    if (!ref.current) return
    ref.current.style.transform =
      'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)'
  }, [])

  return { ref, onMove, onLeave }
}
