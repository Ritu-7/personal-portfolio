import { motion } from 'framer-motion'
import { HiOutlineMapPin, HiOutlineBriefcase, HiOutlineSparkles } from 'react-icons/hi2'
import Section from '../components/Section.jsx'
import { about, profile } from '../data/portfolio.js'

const stats = [
  { label: 'Years Coding', value: '3+' },
  { label: 'Projects Built', value: '15+' },
  { label: 'Technologies', value: '20+' },
  { label: 'Open Source PRs', value: '8+' },
]

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="About Me"
      title="Turning ideas into polished, accessible products"
      subtitle="A developer who cares about the details — from API design to pixel-perfect UI."
    >
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="card"
        >
          <h3 className="font-display text-xl font-bold">Career Objective</h3>
          <p className="mt-3 text-[rgb(var(--text-soft))] leading-relaxed text-pretty">
            {about.objectives}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl glass-soft p-3">
              <HiOutlineMapPin className="text-xl text-brand-400" />
              <div>
                <p className="text-xs text-[rgb(var(--text-soft))]">Location</p>
                <p className="text-sm font-medium">{profile.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl glass-soft p-3">
              <HiOutlineBriefcase className="text-xl text-brand-400" />
              <div>
                <p className="text-xs text-[rgb(var(--text-soft))]">Role</p>
                <p className="text-sm font-medium">Full Stack Developer</p>
              </div>
            </div>
          </div>

          <h4 className="mt-8 flex items-center gap-2 text-sm font-semibold">
            <HiOutlineSparkles className="text-brand-400" /> Interests
          </h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {about.interests.map((i) => (
              <span key={i} className="chip">{i}</span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-6"
        >
          <div className="card">
            <h3 className="font-display text-xl font-bold">Technologies I work with</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {about.technologies.map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="card text-center"
              >
                <p className="font-display text-3xl font-extrabold gradient-text">{s.value}</p>
                <p className="mt-1 text-xs text-[rgb(var(--text-soft))]">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
