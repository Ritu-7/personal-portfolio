import { motion } from 'framer-motion'
import { HiOutlineServer, HiOutlineCircleStack, HiOutlineCpuChip, HiOutlineWrenchScrewdriver, HiOutlineRectangleGroup } from 'react-icons/hi2'
import Section from '../components/Section.jsx'
import { skills } from '../data/portfolio.js'

const icons = {
  layout: HiOutlineRectangleGroup,
  server: HiOutlineServer,
  database: HiOutlineCircleStack,
  cpu: HiOutlineCpuChip,
  wrench: HiOutlineWrenchScrewdriver,
}

function SkillBar({ name, level, delay }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="text-[rgb(var(--text-soft))]">{level}%</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-[rgb(var(--bg-soft))]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-brand-400 to-accent-400"
        />
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="A versatile, full-stack toolkit"
      subtitle="From pixel-perfect interfaces to resilient APIs and data modeling."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, gi) => {
          const Icon = icons[group.icon] || HiOutlineWrenchScrewdriver
          return (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: gi * 0.08 }}
              whileHover={{ y: -6 }}
              className="card group"
            >
              <div className="flex items-center gap-3">
                <div className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${group.color} text-slate-900 shadow-lg`}>
                  <Icon className="text-xl" />
                </div>
                <h3 className="font-display text-lg font-bold">{group.category}</h3>
              </div>
              <div className="mt-6 space-y-4">
                {group.items.map((s, i) => (
                  <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 0.1} />
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
