import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineShieldCheck, HiOutlineBuildingOffice2, HiOutlineArrowTopRightOnSquare, HiOutlineXMark } from 'react-icons/hi2'
import Section from '../components/Section.jsx'
import { Tilt } from '../components/Motion.jsx'
import { certifications } from '../data/portfolio.js'

function CertModal({ cert, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] grid place-items-center bg-slate-950/70 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-3xl glass p-8"
      >
        <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full glass-soft hover:text-brand-400 hover:rotate-90 transition-all">
          <HiOutlineXMark className="text-lg" />
        </button>
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
            className="grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-brand-400 to-accent-400 text-slate-900 shadow-glow"
          >
            <HiOutlineShieldCheck className="text-4xl" />
          </motion.div>
          <h3 className="mt-5 font-display text-xl font-extrabold text-balance">{cert.title}</h3>
          <p className="mt-1 text-brand-400">{cert.org}</p>
          <p className="mt-1 text-sm text-[rgb(var(--text-soft))]">Issued {cert.date}</p>
          <div className="mt-5 w-full rounded-xl glass-soft p-4 text-left">
            <p className="text-xs text-[rgb(var(--text-soft))]">Credential ID</p>
            <p className="font-mono text-sm">{cert.credentialId}</p>
          </div>
          <a href={cert.verifyUrl} target="_blank" rel="noreferrer" className="btn-primary mt-6 w-full">
            Verify Certificate <HiOutlineArrowTopRightOnSquare />
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Certifications() {
  const [active, setActive] = useState(null)

  return (
    <Section
      id="certifications"
      eyebrow="Certifications"
      title="Credentials & continuous learning"
      subtitle="Verified certifications that back up my skills."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {certifications.map((c, i) => (
          <motion.button
            key={c.title}
            onClick={() => setActive(c)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="text-left"
          >
            <Tilt max={6} className="h-full">
              <div className="card group h-full flex flex-col justify-between hover:border-brand-400/40 hover:shadow-glow">
                <div>
                  <div className="flex items-start justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-accent-400 text-slate-900 transition group-hover:scale-110">
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
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-400 group-hover:gap-3 transition-all">
                  View Certificate <HiOutlineArrowTopRightOnSquare />
                </span>
              </div>
            </Tilt>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && <CertModal cert={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </Section>
  )
}
