import { useCallback, useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

const FOLLOW_EASE = 0.42

function applyCtaPosition(cta, x, y) {
  cta.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
}

function isPointerContextValid(container, cta, clientX, clientY) {
  if (!container) return false

  const section = container.closest('.work-section')
  if (section) {
    const sectionRect = section.getBoundingClientRect()
    if (sectionRect.bottom <= 0 || sectionRect.top >= window.innerHeight) {
      return false
    }
    if (clientY < sectionRect.top || clientY > sectionRect.bottom) {
      return false
    }
  }

  const hit = document.elementFromPoint(clientX, clientY)
  if (!hit) return false

  return container.contains(hit) || cta?.contains(hit) || hit === cta
}

/** Positions a floating CTA at the pointer inside `containerRef`. */
export function usePointerFollow(enabled = true) {
  const containerRef = useRef(null)
  const ctaRef = useRef(null)
  const clientRef = useRef({ x: 0, y: 0, active: false })
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(0)
  const reducedMotion = usePrefersReducedMotion()
  const followPointer = enabled && !reducedMotion

  const showCta = useCallback(() => {
    ctaRef.current?.classList.add('work-card__cta--visible')
  }, [])

  const hideCta = useCallback(() => {
    ctaRef.current?.classList.remove('work-card__cta--visible')
  }, [])

  const deactivate = useCallback(() => {
    clientRef.current.active = false
    hideCta()
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
    }
  }, [hideCta])

  const recalcTarget = useCallback(() => {
    if (!followPointer || !containerRef.current || !clientRef.current.active) return null

    const rect = containerRef.current.getBoundingClientRect()
    const x = clientRef.current.x - rect.left
    const y = clientRef.current.y - rect.top

    targetRef.current = { x, y }
    return { x, y }
  }, [followPointer])

  const paint = useCallback(
    (instant = false) => {
      const cta = ctaRef.current
      if (!cta || !clientRef.current.active) return

      const target = targetRef.current
      const current = currentRef.current

      if (instant || reducedMotion) {
        currentRef.current = { ...target }
        applyCtaPosition(cta, target.x, target.y)
        return
      }

      const nextX = current.x + (target.x - current.x) * FOLLOW_EASE
      const nextY = current.y + (target.y - current.y) * FOLLOW_EASE
      const settled =
        Math.abs(nextX - target.x) < 0.35 && Math.abs(nextY - target.y) < 0.35

      currentRef.current = settled ? { ...target } : { x: nextX, y: nextY }
      applyCtaPosition(cta, currentRef.current.x, currentRef.current.y)

      if (!settled) {
        rafRef.current = requestAnimationFrame(() => paint(false))
      } else {
        rafRef.current = 0
      }
    },
    [reducedMotion],
  )

  const schedulePaint = useCallback(
    (instant = false) => {
      if (!clientRef.current.active) return

      if (instant) {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current)
          rafRef.current = 0
        }
        recalcTarget()
        paint(true)
        return
      }

      recalcTarget()
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => paint(false))
      }
    },
    [paint, recalcTarget],
  )

  const validatePointer = useCallback(
    (instant = false) => {
      if (!followPointer || !clientRef.current.active) return

      const valid = isPointerContextValid(
        containerRef.current,
        ctaRef.current,
        clientRef.current.x,
        clientRef.current.y,
      )

      if (!valid) {
        deactivate()
        return
      }

      schedulePaint(instant)
    },
    [deactivate, followPointer, schedulePaint],
  )

  const onPointerEnter = useCallback(
    (e) => {
      if (!followPointer) return
      clientRef.current = { x: e.clientX, y: e.clientY, active: true }
      showCta()
      schedulePaint(true)
    },
    [followPointer, schedulePaint, showCta],
  )

  const onPointerMove = useCallback(
    (e) => {
      if (!followPointer) return
      clientRef.current = { x: e.clientX, y: e.clientY, active: true }
      if (
        !isPointerContextValid(containerRef.current, ctaRef.current, e.clientX, e.clientY)
      ) {
        deactivate()
        return
      }
      if (!ctaRef.current?.classList.contains('work-card__cta--visible')) {
        showCta()
      }
      schedulePaint(false)
    },
    [deactivate, followPointer, schedulePaint, showCta],
  )

  const onPointerLeave = useCallback(() => {
    deactivate()
  }, [deactivate])

  useEffect(() => {
    if (!followPointer) return

    const onScrollOrResize = () => {
      validatePointer(true)
    }

    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)

    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = 0
      }
    }
  }, [followPointer, validatePointer])

  return {
    containerRef,
    ctaRef,
    followPointer,
    onPointerEnter,
    onPointerMove,
    onPointerLeave,
  }
}
