import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Route changes start at the top; hash targets scroll into view once rendered. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }

    let frame
    let attempts = 0

    // Home sections mount only after portfolio data resolves, so retry briefly.
    const scrollToTarget = () => {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        target.scrollIntoView({ block: 'start' })
      } else if (attempts++ < 60) {
        frame = requestAnimationFrame(scrollToTarget)
      }
    }

    scrollToTarget()
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}
