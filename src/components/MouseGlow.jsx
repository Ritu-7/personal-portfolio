import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function MouseGlow() {
  const x = useMotionValue(-500)
  const y = useMotionValue(-500)
  const sx = useSpring(x, { stiffness: 60, damping: 20, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 60, damping: 20, mass: 0.5 })
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    setEnabled(true)
    const onMove = (e) => {
      x.set(e.clientX - 300)
      y.set(e.clientY - 300)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [x, y])

  if (!enabled) return null

  return (
    <motion.div
      className="pointer-events-none fixed z-0 h-[600px] w-[600px] rounded-full"
      style={{
        x: sx,
        y: sy,
        background: 'radial-gradient(circle, rgba(34,211,238,0.08), transparent 60%)',
      }}
    />
  )
}
