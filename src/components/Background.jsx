import { useMemo } from 'react'
import { motion } from 'framer-motion'

export default function Background() {
  const orbs = useMemo(
    () => [
      { size: 38, top: '-8%', left: '70%', color: 'rgba(34,211,238,0.18)', delay: 0, dur: 22 },
      { size: 32, top: '30%', left: '-6%', color: 'rgba(139,92,246,0.16)', delay: 2, dur: 26 },
      { size: 28, top: '65%', left: '60%', color: 'rgba(16,185,129,0.12)', delay: 4, dur: 24 },
      { size: 24, top: '85%', left: '15%', color: 'rgba(244,114,182,0.10)', delay: 1, dur: 28 },
    ],
    [],
  )

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Aurora mesh gradient */}
      <div className="absolute inset-0 opacity-60 dark:opacity-80">
        <div
          className="absolute inset-0 animate-gradient-x"
          style={{
            background:
              'radial-gradient(60rem 40rem at 20% 10%, rgba(34,211,238,0.12), transparent 60%),' +
              'radial-gradient(50rem 40rem at 80% 20%, rgba(139,92,246,0.12), transparent 60%),' +
              'radial-gradient(45rem 35rem at 50% 80%, rgba(16,185,129,0.08), transparent 60%)',
            backgroundSize: '200% 200%',
          }}
        />
      </div>

      {/* Animated grid */}
      <div className="absolute inset-0 bg-grid opacity-30 mask-fade-b" />

      {/* Floating blurred orbs */}
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: `${o.size}rem`,
            height: `${o.size}rem`,
            top: o.top,
            left: o.left,
            background: o.color,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: o.dur,
            delay: o.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  )
}
