import { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { HiOutlineBriefcase, HiOutlineMapPin, HiOutlineChevronDown } from 'react-icons/hi2'
import Section from '../components/Section.jsx'
import { experience } from '../data/portfolio.js'

function TimelineCard({ exp, i }) {
  const [open, setOpen] = useState(false)
  const left = i % 2 === 0
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className={`relative flex sm:items-center ${left ? 'sm:justify-start' : 'sm:justify-end'}`}
    >
      <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-10">
        <motion.span
          className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-accent-400 text-slate-900 ring-4 ring-[rgb(var(--bg))]"
          whileHover={{ scale: 1.2 }}
        >
          <HiOutlineBriefcase className="text-sm" />
        </motion.span>
      </div>

      <div className={`ml-12 sm:ml-0 sm:w-[calc(50%-2.5rem)] ${left ? '' : 'sm:order-2'}`}>
        <motion.div
          whileHover={{ y: -6 }}
          className="card hover:border-brand-400/40 hover:shadow-glow"
        >
          <span className="chip mb-3">{exp.period}</span>
          <h3 className="font-display text-lg font-bold">{exp.role}</h3>
          <div className="mt-1 flex items-center gap-2 text-sm text-brand-400">
            <span className="font-medium">{exp.company}</span>
            <span className="text-[rgb(var(--text-soft))]">·</span>
            <span className="inline-flex items-center gap-1 text-[rgb(var(--text-soft))]">
              <HiOutlineMapPin className="text-xs" /> {exp.location}
            </span>
          </div>
          <p className="mt-3 text-sm text-[rgb(var(--text-soft))] text-pretty">{exp.description}</p>

          <button
            onClick={() => setOpen((o) => !o)}
            className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-400 hover:gap-2 transition-all"
            aria-expanded={open}
          >
            {open ? 'Hide' : 'View'} achievements
            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <HiOutlineChevronDown />
            </motion.span>
          </button>

          <motion.div
            initial={false}
            animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <ul className="mt-3 space-y-2">
              {exp.achievements.map((a) => (
                <li key={a} className="flex gap-2 text-sm text-[rgb(var(--text-soft))]">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                  {a}
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="mt-4 flex flex-wrap gap-2">
            {exp.tags.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const { scrollYProgress } = useScroll()
  const lineScale = useTransform(scrollYProgress, [0.1, 0.5], [0, 1])

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="My professional journey"
      subtitle="Internships, contributions, and the impact I've delivered along the way."
    >
      <div className="relative">
        <div className="absolute left-4 top-2 bottom-2 w-px bg-[rgb(var(--border))] sm:left-1/2" />
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute left-4 top-2 bottom-2 w-px origin-top bg-gradient-to-b from-brand-400 via-accent-400 to-transparent sm:left-1/2"
        />

        <div className="space-y-10">
          {experience.map((exp, i) => (
            <TimelineCard key={exp.role + exp.company} exp={exp} i={i} />
          ))}
        </div>
      </div>
    </Section>
  )
}
