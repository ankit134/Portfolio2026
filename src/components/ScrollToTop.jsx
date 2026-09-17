import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Ensures route changes start at the top (SPA scroll is not reset by default). */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
