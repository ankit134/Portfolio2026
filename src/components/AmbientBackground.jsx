import Parallax from './Parallax'

export default function AmbientBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <Parallax speed={-0.35} className="absolute -left-24 top-[8%]">
        <div className="h-[420px] w-[420px] rounded-full bg-[#FF5733]/[0.07] blur-[100px]" />
      </Parallax>
      <Parallax speed={-0.2} className="absolute -right-32 top-[42%]">
        <div className="h-[360px] w-[360px] rounded-full bg-violet-600/[0.06] blur-[90px]" />
      </Parallax>
      <Parallax speed={-0.45} className="absolute bottom-[12%] left-[30%]">
        <div className="h-[280px] w-[280px] rounded-full bg-emerald-500/[0.05] blur-[80px]" />
      </Parallax>
    </div>
  )
}
