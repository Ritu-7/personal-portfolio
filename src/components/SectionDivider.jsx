import { motion } from 'framer-motion'

export default function SectionDivider({ className = '' }) {
  return (
    <div className={`pointer-events-none relative mx-auto h-px max-w-5xl ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgb(var(--border))] to-transparent" />
      <motion.div
        className="absolute top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-brand-400 shadow-glow"
        style={{ left: '50%' }}
        animate={{ x: ['-50vw', '50vw'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
