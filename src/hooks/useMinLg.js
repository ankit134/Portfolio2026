import { useEffect, useState } from 'react'

/** True at Tailwind `lg` (1024px) and up — laptop / desktop hover targets */
export function useMinLg() {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(min-width: 1024px)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setMatches(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return matches
}
