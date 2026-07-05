import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiOutlineShieldCheck,
  HiOutlineBuildingOffice2,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineXMark,
  HiOutlineDocumentArrowDown,
  HiOutlineDocumentText,
  HiOutlineCalendar,
  HiOutlineEye,
} from 'react-icons/hi2'
import Section from '../components/Section.jsx'
import { Tilt } from '../components/Motion.jsx'
import { certifications as fallbackCerts } from '../data/portfolio.js'
import { supabase } from '../context/SupabaseContext.jsx'

function CertModal({ cert, onClose }) {
  const hasPdf = Boolean(cert.pdfUrl || cert.pdf_url)
  const pdfUrl = cert.pdfUrl || cert.pdf_url
  const hasVerify = Boolean(cert.verifyUrl || cert.verify_url)

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
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full glass-soft hover:text-brand-400 hover:rotate-90 transition-all"
        >
          <HiOutlineXMark className="text-lg" />
        </button>

        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
            className="grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-brand-400 to-accent-400 text-slate-900 shadow-glow"
          >
            {hasPdf ? <HiOutlineDocumentText className="text-4xl" /> : <HiOutlineShieldCheck className="text-4xl" />}
          </motion.div>

          <h3 className="mt-5 font-display text-xl font-extrabold text-balance">{cert.title}</h3>
          <p className="mt-1 text-brand-400">{cert.org}</p>
          <p className="mt-1 text-sm text-[rgb(var(--text-soft))]">Issued {cert.date}</p>

          {(cert.credentialId || cert.credential_id) && (
            <div className="mt-5 w-full rounded-xl glass-soft p-4 text-left">
              <p className="text-xs text-[rgb(var(--text-soft))]">Credential ID</p>
              <p className="font-mono text-sm">{cert.credentialId || cert.credential_id}</p>
            </div>
          )}

          <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row">
            {hasPdf && (
              <a href={pdfUrl} target="_blank" rel="noreferrer" className="btn-primary flex-1">
                <HiOutlineEye /> View Certificate
              </a>
            )}
            {hasPdf && (
              <a href={pdfUrl} download className="btn-ghost flex-1">
                <HiOutlineDocumentArrowDown /> Download
              </a>
            )}
            {hasVerify && !hasPdf && (
              <a
                href={cert.verifyUrl || cert.verify_url}
                target="_blank"
                rel="noreferrer"
                className="btn-primary w-full"
              >
                Verify Certificate <HiOutlineArrowTopRightOnSquare />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function CertCard({ cert, index, onOpen }) {
  const hasPdf = Boolean(cert.pdfUrl || cert.pdf_url)
  const pdfUrl = cert.pdfUrl || cert.pdf_url
  const date = cert.date || 'Unknown'
  const org = cert.org || 'Unknown'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="h-full"
    >
      <Tilt max={6} className="h-full">
        <div className="card group h-full flex flex-col justify-between hover:border-brand-400/40 hover:shadow-glow">
          {/* PDF preview header */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/40 to-slate-950/60 p-6">
            <div className="flex items-start justify-between">
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                className={`grid h-12 w-12 place-items-center rounded-xl text-slate-900 shadow-lg ${
                  hasPdf
                    ? 'bg-gradient-to-br from-rose-400 to-orange-400'
                    : 'bg-gradient-to-br from-brand-400 to-accent-400'
                }`}
              >
                {hasPdf ? <HiOutlineDocumentText className="text-xl" /> : <HiOutlineShieldCheck className="text-xl" />}
              </motion.div>
              <span className="chip flex items-center gap-1">
                <HiOutlineCalendar className="text-xs" /> {date}
              </span>
            </div>

            {/* Decorative PDF preview mockup */}
            {hasPdf && (
              <div className="mt-4 flex items-center gap-3 rounded-xl glass-soft p-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-rose-400/15 text-rose-400">
                  <HiOutlineDocumentText className="text-lg" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-[rgb(var(--text-soft))]">PDF Document</p>
                  <p className="truncate text-[10px] text-[rgb(var(--text-soft))] opacity-60">
                    {pdfUrl?.split('/').pop()}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Body */}
          <div className="mt-4 flex flex-1 flex-col">
            <h3 className="font-display text-lg font-bold text-balance">{cert.title}</h3>
            <div className="mt-2 flex items-center gap-2 text-sm text-[rgb(var(--text-soft))]">
              <HiOutlineBuildingOffice2 className="text-xs" /> {org}
            </div>
            {(cert.credentialId || cert.credential_id) && (
              <p className="mt-3 text-xs text-[rgb(var(--text-soft))]">
                Credential ID: <span className="font-mono">{cert.credentialId || cert.credential_id}</span>
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="mt-5 flex gap-2">
            <button
              onClick={() => onOpen(cert)}
              className="flex-1 chip justify-center hover:border-brand-400/60 hover:text-brand-400 transition-all"
            >
              <HiOutlineEye /> Details
            </button>
            {hasPdf && (
              <>
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="chip hover:border-brand-400/60 hover:text-brand-400 transition-all"
                  title="View PDF"
                >
                  <HiOutlineArrowTopRightOnSquare />
                </a>
                <a
                  href={pdfUrl}
                  download
                  className="chip hover:border-brand-400/60 hover:text-brand-400 transition-all"
                  title="Download PDF"
                >
                  <HiOutlineDocumentArrowDown />
                </a>
              </>
            )}
          </div>
        </div>
      </Tilt>
    </motion.div>
  )
}

export default function Certifications() {
  const [active, setActive] = useState(null)
  const [certs, setCerts] = useState(fallbackCerts)
  const [loading, setLoading] = useState(true)

  const loadCerts = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true })

      if (error) throw error
      if (data && data.length > 0) {
        const mapped = data.map((c) => ({
          ...c,
          credentialId: c.credential_id,
          verifyUrl: c.verify_url,
          pdfUrl: c.pdf_url,
        }))
        setCerts(mapped)
      }
    } catch {
      // keep fallback static data on error
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadCerts()
  }, [loadCerts])

  return (
    <Section
      id="certifications"
      eyebrow="Certifications"
      title="Credentials & continuous learning"
      subtitle="Verified certifications that back up my skills."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certs.map((c, i) => (
          <CertCard key={c.id || c.title} cert={c} index={i} onOpen={setActive} />
        ))}
      </div>

      {loading && certs.length === 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card h-64 animate-pulse" />
          ))}
        </div>
      )}

      <AnimatePresence>
        {active && <CertModal cert={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </Section>
  )
}
