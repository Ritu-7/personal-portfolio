export default function Skeleton({ className = '', count = 1 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`relative overflow-hidden rounded-2xl glass-soft ${className}`}
        >
          <div
            className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-[rgb(var(--border))] to-transparent"
            style={{ backgroundSize: '1000px 100%' }}
          />
        </div>
      ))}
    </>
  )
}
