import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'
import { HiOutlineEnvelope, HiOutlinePhone, HiOutlineMapPin, HiOutlinePaperAirplane, HiOutlineCheckCircle, HiOutlineExclamationCircle } from 'react-icons/hi2'
import Section from '../components/Section.jsx'
import { supabase } from '../context/SupabaseContext.jsx'
import { useToast } from '../components/Toast.jsx'
import { profile } from '../data/portfolio.js'

const contactItems = [
  { icon: HiOutlineEnvelope, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: HiOutlinePhone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone}` },
  { icon: HiOutlineMapPin, label: 'Location', value: profile.location, href: '#' },
]

function Field({ name, type = 'text', label, value, onChange, error, textarea, required }) {
  return (
    <div className="relative">
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder=" "
          rows={5}
          className={`input peer resize-none ${error ? 'ring-rose-400/60' : ''}`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder=" "
          className={`input peer ${error ? 'ring-rose-400/60' : ''}`}
        />
      )}
      <label className="input-label peer-focus:text-brand-400">{label}{required && ' *'}</label>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-1 flex items-center gap-1 text-xs text-rose-400"
          >
            <HiOutlineExclamationCircle /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Contact() {
  const toast = useToast()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.message.trim()) e.message = 'Message is required'
    else if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors((er) => ({ ...er, [e.target.name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) {
      toast('Please fix the errors in the form', 'error')
      return
    }
    setLoading(true)
    try {
      const { error: dbError } = await supabase.from('contacts').insert({
        name: form.name,
        email: form.email,
        subject: form.subject || 'General Inquiry',
        message: form.message,
      })
      if (dbError) throw dbError
      toast('Message sent successfully! I will get back to you soon.', 'success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      toast(err.message || 'Something went wrong. Please try again.', 'error')
    } finally {
      setLoading(false)
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
                  className="group flex items-center gap-3 rounded-xl glass-soft p-3 transition hover:-translate-y-0.5 hover:border-brand-400/60 hover:shadow-glow"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-br from-brand-400 to-accent-400 text-slate-900 transition group-hover:scale-110">
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
                  className="grid h-11 w-11 place-items-center rounded-full glass-soft text-lg text-[rgb(var(--text-soft))] hover:text-brand-400 hover:-translate-y-1 hover:shadow-glow active:scale-90 transition"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          noValidate
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="card space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="name" label="Your Name" value={form.name} onChange={handleChange} error={errors.name} required />
            <Field name="email" type="email" label="Your Email" value={form.email} onChange={handleChange} error={errors.email} required />
          </div>
          <Field name="subject" label="Subject" value={form.subject} onChange={handleChange} error={errors.subject} />
          <Field name="message" label="Your Message" value={form.message} onChange={handleChange} error={errors.message} textarea required />

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900/30 border-t-slate-900" />
                Sending...
              </span>
            ) : (
              <>Send Message <HiOutlinePaperAirplane /></>
            )}
          </button>
        </motion.form>
      </div>
    </Section>
  )
}
