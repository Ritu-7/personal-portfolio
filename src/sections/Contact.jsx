import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'
import { HiOutlineEnvelope, HiOutlinePhone, HiOutlineMapPin, HiOutlinePaperAirplane, HiOutlineCheckCircle, HiOutlineExclamationCircle } from 'react-icons/hi2'
import Section from '../components/Section.jsx'
import { supabase } from '../context/SupabaseContext.jsx'
import { profile } from '../data/portfolio.js'

const contactItems = [
  { icon: HiOutlineEnvelope, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: HiOutlinePhone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone}` },
  { icon: HiOutlineMapPin, label: 'Location', value: profile.location, href: '#' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setError('')
    try {
      const { error: dbError } = await supabase.from('contacts').insert({
        name: form.name,
        email: form.email,
        subject: form.subject || 'General Inquiry',
        message: form.message,
      })
      if (dbError) throw dbError
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something together"
      subtitle="Have a project, role, or idea in mind? I'd love to hear about it."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          <div className="card">
            <h3 className="font-display text-xl font-bold">Get in touch</h3>
            <p className="mt-2 text-sm text-[rgb(var(--text-soft))] text-pretty">
              Reach out via the form or any of the channels below — I usually respond within 24 hours.
            </p>
            <div className="mt-6 space-y-3">
              {contactItems.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="flex items-center gap-3 rounded-xl glass-soft p-3 transition hover:-translate-y-0.5 hover:border-brand-400/60"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-br from-brand-400 to-accent-400 text-slate-900">
                    <c.icon className="text-lg" />
                  </div>
                  <div>
                    <p className="text-xs text-[rgb(var(--text-soft))]">{c.label}</p>
                    <p className="text-sm font-medium">{c.value}</p>
                  </div>
                </a>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              {[
                { href: profile.socials.github, icon: <FaGithub />, label: 'GitHub' },
                { href: profile.socials.linkedin, icon: <FaLinkedinIn />, label: 'LinkedIn' },
                { href: profile.socials.whatsapp, icon: <FaWhatsapp />, label: 'WhatsApp' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid h-11 w-11 place-items-center rounded-full glass-soft text-lg text-[rgb(var(--text-soft))] hover:text-brand-400 hover:-translate-y-1 transition"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="card"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[rgb(var(--text-soft))]">Name</label>
              <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name" className="input" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[rgb(var(--text-soft))]">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" className="input" />
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-1.5 block text-xs font-medium text-[rgb(var(--text-soft))]">Subject</label>
            <input name="subject" value={form.subject} onChange={handleChange} placeholder="What's this about?" className="input" />
          </div>
          <div className="mt-4">
            <label className="mb-1.5 block text-xs font-medium text-[rgb(var(--text-soft))]">Message</label>
            <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tell me about your project..." className="input resize-none" />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="mt-6 btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Sending...' : (
              <>Send Message <HiOutlinePaperAirplane /></>
            )}
          </button>

          <AnimatePresence>
            {status === 'success' && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-400/10 p-3 text-sm text-emerald-500"
              >
                <HiOutlineCheckCircle /> Thanks! Your message has been sent.
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 flex items-center gap-2 rounded-xl bg-rose-400/10 p-3 text-sm text-rose-500"
              >
                <HiOutlineExclamationCircle /> {error}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </Section>
  )
}
