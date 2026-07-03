import { motion } from 'framer-motion'
import { FaGithub, FaCode, FaGlobe, FaAward } from 'react-icons/fa'
import { HiOutlineTrophy } from 'react-icons/hi2'
import Section from '../components/Section.jsx'
import { Counter } from '../components/Motion.jsx'
import { achievements } from '../data/portfolio.js'

const profileIcons = {
  code: FaCode,
  globe: FaGlobe,
  github: FaGithub,
  award: FaAward,
}

export default function Achievements() {
  return (
    <Section
      id="achievements"
      eyebrow="Achievements"
      title="Coding profiles & awards"
      subtitle="Where I practice, compete, and contribute."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="mb-4 font-display text-lg font-bold">Coding Profiles</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {achievements.codingProfiles.map((p, i) => {
              const Icon = profileIcons[p.icon] || FaCode
              return (
                <motion.a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="card group flex items-center justify-between hover:border-brand-400/40 hover:shadow-glow"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-xl glass-soft text-xl text-brand-400 transition group-hover:bg-gradient-to-br group-hover:from-brand-400 group-hover:to-accent-400 group-hover:text-slate-900 group-hover:scale-110">
                      <Icon />
                    </div>
                    <div>
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-xs text-[rgb(var(--text-soft))]">@{p.handle}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-2xl font-extrabold gradient-text">
                      <Counter value={p.solved} suffix="+" />
                    </p>
                    <p className="text-xs text-[rgb(var(--text-soft))]">solved</p>
                  </div>
                </motion.a>
              )
            })}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-display text-lg font-bold">Awards & Recognition</h3>
          <div className="space-y-4">
            {achievements.awards.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ x: -4 }}
                className="card flex gap-4 hover:border-brand-400/40 hover:shadow-glow"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-900"
                >
                  <HiOutlineTrophy className="text-xl" />
                </motion.div>
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-semibold">{a.title}</h4>
                    <span className="chip">{a.year}</span>
                  </div>
                  <p className="text-sm text-brand-400">{a.org}</p>
                  <p className="mt-1 text-sm text-[rgb(var(--text-soft))] text-pretty">{a.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
