import { useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 })

  const onMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - rect.left - rect.width / 2
    const relY = e.clientY - rect.top - rect.height / 2
    x.set(relX * strength)
    y.set(relY * strength)
  }, [strength, x, y])

  const onLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  )
}

export function Tilt({ children, max = 10, className = '', glare = true }) {
  const ref = useRef(null)
  const [transform, setTransform] = useState('')
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, o: 0 })

  const onMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rx = (py - 0.5) * -2 * max
    const ry = (px - 0.5) * 2 * max
    setTransform(`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`)
    setGlarePos({ x: px * 100, y: py * 100, o: 0.15 })
  }, [max])

  const onLeave = useCallback(() => {
    setTransform('perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)')
    setGlarePos((g) => ({ ...g, o: 0 }))
  }, [])

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transform, transition: 'transform 0.25s ease-out' }}
      className={`relative ${className}`}
    >
      {children}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.25), transparent 50%)`,
            opacity: glarePos.o,
          }}
        />
      )}
    </div>
  )
}

export function Counter({ value, duration = 1.5, suffix = '', className = '' }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  const animate = useCallback(() => {
    if (started.current) return
    started.current = true
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(eased * value))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [value, duration])

  return (
    <motion.span
      ref={ref}
      onViewportEnter={animate}
      viewport={{ once: true }}
      className={className}
    >
      {display}{suffix}
    </motion.span>
  )
}

export function ScrollProgress() {
  const scaleX = useSpring(0, { stiffness: 120, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-brand-400 via-accent-400 to-brand-500"
      style={{ scaleX }}
      onUpdate={(latest) => {
        const scroll = window.scrollY
        const max = document.documentElement.scrollHeight - window.innerHeight
        scaleX.set(max > 0 ? scroll / max : 0)
      }}
    />
  )
}
