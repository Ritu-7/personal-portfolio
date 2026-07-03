import { motion, AnimatePresence } from 'framer-motion'

export default function PageLoader({ loading }) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[200] grid place-items-center bg-[rgb(var(--bg))]"
        >
          <div className="flex flex-col items-center gap-6">
            {/* Animated logo */}
            <div className="relative">
              <motion.div
                className="grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-brand-400 to-accent-400 text-slate-900 font-display text-4xl font-extrabold shadow-glow"
                animate={{ scale: [1, 1.08, 1], rotate: [0, 3, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                R
              </motion.div>
              <motion.span
                className="absolute -inset-2 rounded-3xl border-2 border-brand-400/30"
                animate={{ scale: [1, 1.3], opacity: [0.6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
              />
            </div>

            {/* Progress bar */}
            <div className="w-48">
              <div className="h-1 overflow-hidden rounded-full bg-[rgb(var(--bg-soft))]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-brand-400 to-accent-400"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.85, ease: 'easeInOut' }}
                />
              </div>
              <motion.p
                className="mt-3 text-center font-display text-xs font-semibold gradient-text"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Loading experience...
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
