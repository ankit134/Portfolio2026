/** Shown while a lazy-loaded route chunk is fetching */
export default function RoutePageFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B0B0B] font-sans text-[#8A8A93]">
      Loading…
    </div>
  )
}
