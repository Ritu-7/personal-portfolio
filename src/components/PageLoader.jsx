import { motion, AnimatePresence } from 'framer-motion'

export default function PageLoader({ loading }) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[200] grid place-items-center bg-[rgb(var(--bg))]"
        >
          <div className="flex flex-col items-center gap-5">
            <div className="relative h-16 w-16">
              <motion.span
                className="absolute inset-0 rounded-full border-2 border-brand-400/20"
              />
              <motion.span
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-brand-400"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
              />
              <motion.span
                className="absolute inset-2 rounded-full border-2 border-transparent border-t-accent-400"
                animate={{ rotate: -360 }}
                transition={{ duration: 1.3, repeat: Infinity, ease: 'linear' }}
              />
            </div>
            <motion.p
              className="font-display text-sm font-semibold gradient-text"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Loading portfolio...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
