import { motion } from 'framer-motion'

export default function Section({ id, eyebrow, title, subtitle, children, className = '' }) {
  return (
    <section id={id} className={`relative scroll-mt-20 py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {(eyebrow || title) && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="mb-12 max-w-2xl"
          >
            {eyebrow && (
              <span className="chip mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                {eyebrow}
              </span>
            )}
            {title && <h2 className="section-title text-balance">{title}</h2>}
            {subtitle && (
              <p className="mt-4 text-[rgb(var(--text-soft))] text-pretty">{subtitle}</p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  )
}
