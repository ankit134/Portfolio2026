import { useEffect, useState } from 'react'
import { profile } from '../data/content'

function formatNepalTime(date) {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kathmandu',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date)
}

export default function LiveClock() {
  const [time, setTime] = useState(() => formatNepalTime(new Date()))

  useEffect(() => {
    const id = setInterval(() => setTime(formatNepalTime(new Date())), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="hero-enter hero-enter-delay-3 mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[#8A8A93]">
      <span className="font-medium text-white/90">{profile.location}</span>
      <span className="hidden h-4 w-px bg-white/15 sm:inline-block" aria-hidden="true" />
      <span className="font-mono tabular-nums tracking-wider text-white/80 transition-opacity duration-300">
        {time}
      </span>
      <span className="text-xs text-[#8A8A93]">(UTC+5:45)</span>
    </div>
  )
}
