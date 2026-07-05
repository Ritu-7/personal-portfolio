import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineLockClosed, HiOutlineEnvelope, HiOutlineArrowLeft, HiOutlineEye, HiOutlineEyeSlash, HiOutlineCheckCircle, HiOutlineExclamationCircle } from 'react-icons/hi2'
import { supabase } from '../context/SupabaseContext.jsx'
import { profile } from '../data/portfolio.js'

function Particles() {
  const dots = useMemo(
    () =>
      Array.from({ length: 16 }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 4,
        dur: Math.random() * 6 + 6,
      })),
    [],
  )
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-brand-400/30"
          style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.size, height: d.size }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

export default function AdminLogin({ onSuccess, onBack }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [remember, setRemember] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [forgotMode, setForgotMode] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      if (forgotMode) {
        const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/#admin/login`,
        })
        if (err) throw err
        setSuccess('Password reset link sent! Check your email.')
        return
      }

      const { error: err } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (err) throw err
      setSuccess('Welcome back! Redirecting...')
      setTimeout(() => onSuccess(), 600)
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative z-10 grid min-h-screen place-items-center px-5 py-12">
      <Particles />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md gradient-border rounded-3xl p-8 shadow-glow"
      >
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 text-sm text-[rgb(var(--text-soft))] hover:text-brand-400 transition group"
        >
          <HiOutlineArrowLeft className="transition group-hover:-translate-x-1" /> Back to portfolio
        </button>

        <div className="mb-8 flex items-center gap-3">
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-400 to-accent-400 text-slate-900 shadow-lg"
          >
            <HiOutlineLockClosed className="text-2xl" />
          </motion.div>
          <div>
            <h1 className="font-display text-xl font-extrabold">
              {forgotMode ? 'Reset Password' : 'Admin Access'}
            </h1>
            <p className="text-sm text-[rgb(var(--text-soft))]">{profile.name}'s dashboard</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <HiOutlineEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[rgb(var(--text-soft))]" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder=" "
              className="input peer !pl-11"
              autoComplete="email"
            />
            <label className="input-label peer-focus:text-brand-400 left-11">Email address</label>
          </div>

          {!forgotMode && (
            <div className="relative">
              <HiOutlineLockClosed className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[rgb(var(--text-soft))]" />
              <input
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder=" "
                className="input peer !pl-11 !pr-11"
                autoComplete="current-password"
              />
              <label className="input-label peer-focus:text-brand-400 left-11">Password</label>
              <button
                type="button"
                onClick={() => setShowPwd((s) => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[rgb(var(--text-soft))] hover:text-brand-400 transition"
                aria-label={showPwd ? 'Hide password' : 'Show password'}
              >
                {showPwd ? <HiOutlineEyeSlash /> : <HiOutlineEye />}
              </button>
            </div>
          )}

          {!forgotMode && (
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-[rgb(var(--text-soft))]">
                <button
                  type="button"
                  onClick={() => setRemember((r) => !r)}
                  className={`relative h-5 w-9 rounded-full transition ${remember ? 'bg-brand-400' : 'bg-[rgb(var(--border))]'}`}
                  aria-pressed={remember}
                >
                  <motion.span
                    layout
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm ${remember ? 'left-4' : 'left-0.5'}`}
                  />
                </button>
                Remember me
              </label>
              <button
                type="button"
                onClick={() => { setForgotMode((f) => !f); setError(''); setSuccess('') }}
                className="text-sm text-brand-400 hover:underline"
              >
                {forgotMode ? 'Back to login' : 'Forgot password?'}
              </button>
            </div>
          )}

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 8, x: -10 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center gap-2 rounded-xl bg-rose-400/10 border border-rose-400/30 p-3 text-sm text-rose-400"
              >
                <HiOutlineExclamationCircle className="shrink-0" /> {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 8, x: -10 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center gap-2 rounded-xl bg-emerald-400/10 border border-emerald-400/30 p-3 text-sm text-emerald-400"
              >
                <HiOutlineCheckCircle className="shrink-0" /> {success}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900/30 border-t-slate-900" />
                Please wait...
              </span>
            ) : forgotMode ? (
              'Send Reset Link'
            ) : (
              'Sign In to Dashboard'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-[rgb(var(--text-soft))]">
          Protected area. Authorized personnel only.
        </p>
      </motion.div>
    </div>
  )
}
