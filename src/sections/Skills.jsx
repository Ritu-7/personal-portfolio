import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineServer, HiOutlineCircleStack, HiOutlineCpuChip, HiOutlineWrenchScrewdriver, HiOutlineRectangleGroup } from 'react-icons/hi2'
import Section from '../components/Section.jsx'
import { skills } from '../data/portfolio.js'
import { Counter } from '../components/Motion.jsx'

const icons = {
  layout: HiOutlineRectangleGroup,
  server: HiOutlineServer,
  database: HiOutlineCircleStack,
  cpu: HiOutlineCpuChip,
  wrench: HiOutlineWrenchScrewdriver,
}

function CircleProgress({ level, delay }) {
  const r = 42
  const circ = 2 * Math.PI * r
  return (
    <div className="relative grid place-items-center">
      <svg viewBox="0 0 100 100" className="h-20 w-20 -rotate-90">
        <circle cx="50" cy="50" r={r} className="fill-none stroke-[rgb(var(--bg-soft))]" strokeWidth="8" />
        <motion.circle
          cx="50"
          cy="50"
          r={r}
          className="fill-none stroke-brand-400"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          whileInView={{ strokeDashoffset: circ - (level / 100) * circ }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.2, delay, ease: 'easeOut' }}
        />
      </svg>
      <span className="absolute font-display text-sm font-bold">
        <Counter value={level} suffix="%" duration={1.2} />
      </span>
    </div>
  )
}

export default function Skills() {
  const [active, setActive] = useState('All')
  const tabs = ['All', ...skills.map((s) => s.category)]
  const visible = active === 'All' ? skills : skills.filter((s) => s.category === active)

  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="A versatile, full-stack toolkit"
      subtitle="From pixel-perfect interfaces to resilient APIs and data modeling."
    >
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${
              active === t
                ? 'text-slate-900'
                : 'glass-soft text-[rgb(var(--text-soft))] hover:text-[rgb(var(--text))]'
            }`}
          >
            {active === t && (
              <motion.span
                layoutId="skill-tab"
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-brand-400 to-accent-400"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            {t}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((group, gi) => {
            const Icon = icons[group.icon] || HiOutlineWrenchScrewdriver
            return (
              <motion.div
                key={group.category}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: gi * 0.06 }}
                whileHover={{ y: -6 }}
                className="card group hover:border-brand-400/40 hover:shadow-glow"
              >
                <div className="flex items-center gap-3">
                  <div className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${group.color} text-slate-900 shadow-lg transition group-hover:scale-110`}>
                    <Icon className="text-xl" />
                  </div>
                  <h3 className="font-display text-lg font-bold">{group.category}</h3>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {group.items.map((s, i) => (
                    <div key={s.name} className="flex flex-col items-center gap-2 text-center">
                      <CircleProgress level={s.level} delay={i * 0.1} />
                      <span className="text-xs font-medium text-[rgb(var(--text-soft))]">{s.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </Section>
  )
}
