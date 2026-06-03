export default function ProjectMockup({ title, mockBg, accent }) {
  return (
    <div
      className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br ${mockBg} p-6 shadow-2xl shadow-black/40 md:aspect-[5/4] md:p-8`}
    >
      <div className="flex h-full flex-col rounded-xl border border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="ml-auto text-[10px] font-medium uppercase tracking-wider text-white/40">
            {title}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
          <div
            className="h-3 w-2/5 rounded-full opacity-90"
            style={{ backgroundColor: accent }}
          />
          <div className="h-2 w-full max-w-[85%] rounded-full bg-white/15" />
          <div className="h-2 w-3/5 rounded-full bg-white/10" />
          <div className="mt-auto grid grid-cols-2 gap-2">
            <div className="aspect-[4/3] rounded-lg bg-white/10" />
            <div className="aspect-[4/3] rounded-lg bg-white/5" />
            <div className="col-span-2 aspect-[5/2] rounded-lg bg-white/[0.07]" />
          </div>
        </div>
      </div>
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full blur-3xl"
        style={{ backgroundColor: `${accent}33` }}
      />
    </div>
  )
}
