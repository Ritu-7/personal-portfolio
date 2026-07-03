import { motion } from 'framer-motion'
import { HiOutlineBriefcase, HiOutlineMapPin } from 'react-icons/hi2'
import Section from '../components/Section.jsx'
import { experience } from '../data/portfolio.js'

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="My professional journey"
      subtitle="Internships, contributions, and the impact I've delivered along the way."
    >
      <div className="relative">
        <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-brand-400 via-accent-400 to-transparent sm:left-1/2" />

        <div className="space-y-10">
          {experience.map((exp, i) => {
            const left = i % 2 === 0
            return (
              <motion.div
                key={exp.role + exp.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
                className={`relative flex sm:items-center ${left ? 'sm:justify-start' : 'sm:justify-end'}`}
              >
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-10">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-accent-400 text-slate-900 ring-4 ring-[rgb(var(--bg))]">
                    <HiOutlineBriefcase className="text-sm" />
                  </span>
                </div>

                <div className={`ml-12 sm:ml-0 sm:w-[calc(50%-2.5rem)] ${left ? '' : 'sm:order-2'}`}>
                  <div className="card hover:border-brand-400/40">
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
                    <ul className="mt-4 space-y-2">
                      {exp.achievements.map((a) => (
                        <li key={a} className="flex gap-2 text-sm text-[rgb(var(--text-soft))]">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                          {a}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {exp.tags.map((t) => (
                        <span key={t} className="chip">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
