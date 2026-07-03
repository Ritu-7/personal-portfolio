export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40 mask-fade-b" />
      <div className="absolute -top-40 -right-40 h-[40rem] w-[40rem] rounded-full bg-brand-400/20 blur-3xl animate-float" />
      <div className="absolute top-1/3 -left-40 h-[35rem] w-[35rem] rounded-full bg-accent-400/20 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-0 right-1/4 h-[30rem] w-[30rem] rounded-full bg-emerald-400/10 blur-3xl animate-float" style={{ animationDelay: '4s' }} />
    </div>
  )
}
