import { motion } from 'framer-motion'
import { HiOutlineAcademicCap, HiOutlineCalendarDays, HiOutlineMapPin } from 'react-icons/hi2'
import Section from '../components/Section.jsx'
import { education } from '../data/portfolio.js'

export default function Education() {
  return (
    <Section
      id="education"
      eyebrow="Education"
      title="Academic background"
      subtitle="Where I built my foundation in computer science and engineering."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {education.map((edu, i) => (
          <motion.div
            key={edu.degree}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="card group hover:border-brand-400/40 hover:shadow-glow"
          >
            <div className="flex items-start gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-accent-400 text-slate-900 shadow-lg transition group-hover:scale-110">
                <HiOutlineAcademicCap className="text-2xl" />
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-lg font-bold text-balance">{edu.degree}</h3>
                <p className="mt-1 text-sm font-medium text-brand-400">{edu.institution}</p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[rgb(var(--text-soft))]">
                  <span className="inline-flex items-center gap-1">
                    <HiOutlineCalendarDays /> {edu.period}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <HiOutlineMapPin /> Haryana, India
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-xl glass-soft p-3">
              <span className="text-xs text-[rgb(var(--text-soft))]">Current CGPA</span>
              <span className="font-display text-2xl font-extrabold gradient-text">{edu.cgpa}</span>
            </div>

            <h4 className="mt-5 text-sm font-semibold">Relevant Coursework</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {edu.coursework.map((c) => (
                <span key={c} className="chip">{c}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
