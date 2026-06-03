import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export const STACK_PIN = 152
export const STACK_GAP = 14

export function getCardPin(index) {
  return STACK_PIN + index * STACK_GAP
}

/**
 * Tracks which card is on top of the stack and scales cards underneath.
 */
export function useWorkStack(itemRefs, count) {
  const [cardStyles, setCardStyles] = useState(() =>
    Array.from({ length: count }, () => ({})),
  )
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (!count) return

    if (reducedMotion) {
      setCardStyles(Array.from({ length: count }, () => ({})))
      return
    }

    let rafId = 0

    const update = () => {
      let activeIndex = 0

      itemRefs.forEach((ref, index) => {
        const item = ref.current
        if (!item) return

        const card = item.querySelector('.work-card')
        if (!card) return

        const pin = getCardPin(index)
        const cardTop = card.getBoundingClientRect().top

        if (cardTop <= pin + 2) {
          activeIndex = Math.max(activeIndex, index)
        }
      })

      setCardStyles(
        Array.from({ length: count }, (_, index) => {
          const depth = activeIndex - index

          if (depth <= 0) {
            return {
              transform: 'scale(1) translate3d(0, 0, 0)',
              filter: 'none',
            }
          }

          const scale = Math.max(0.88, 1 - depth * 0.04)
          const translateY = -depth * 10

          return {
            transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
            filter: `brightness(${Math.max(0.78, 1 - depth * 0.08)})`,
          }
        }),
      )
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
  }, [itemRefs, count, reducedMotion])

  return cardStyles
}
