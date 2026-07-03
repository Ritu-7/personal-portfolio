import { motion } from 'framer-motion'
import { HiOutlineShieldCheck, HiOutlineCalendarDays, HiOutlineBuildingOffice2 } from 'react-icons/hi2'
import Section from '../components/Section.jsx'
import { certifications } from '../data/portfolio.js'

export default function Certifications() {
  return (
    <Section
      id="certifications"
      eyebrow="Certifications"
      title="Credentials & continuous learning"
      subtitle="Verified certifications that back up my skills."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {certifications.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="card group flex flex-col justify-between hover:border-brand-400/40"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-accent-400 text-slate-900">
                  <HiOutlineShieldCheck className="text-xl" />
                </div>
                <span className="chip">{c.date}</span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-balance">{c.title}</h3>
              <div className="mt-2 flex items-center gap-2 text-sm text-[rgb(var(--text-soft))]">
                <HiOutlineBuildingOffice2 className="text-xs" /> {c.org}
              </div>
              <p className="mt-3 text-xs text-[rgb(var(--text-soft))]">
                Credential ID: <span className="font-mono">{c.credentialId}</span>
              </p>
            </div>
            <a
              href={c.verifyUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-400 hover:gap-3 transition-all"
            >
              <HiOutlineCalendarDays /> Verify Certificate
            </a>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
