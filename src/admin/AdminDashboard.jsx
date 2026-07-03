import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineEnvelope, HiOutlineEye, HiOutlineDocumentArrowDown, HiOutlineArrowLeft, HiOutlineXMark, HiOutlineCheckBadge } from 'react-icons/hi2'
import { supabase } from '../context/SupabaseContext.jsx'
import { profile } from '../data/portfolio.js'

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card flex items-center gap-4"
    >
      <div className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${color} text-slate-900`}>
        <Icon className="text-xl" />
      </div>
      <div>
        <p className="font-display text-2xl font-extrabold">{value}</p>
        <p className="text-xs text-[rgb(var(--text-soft))]">{label}</p>
      </div>
    </motion.div>
  )
}

function MessageRow({ msg, onRead }) {
  return (
    <div className={`flex items-start justify-between gap-3 rounded-xl p-4 glass-soft ${!msg.is_read ? 'border-brand-400/40' : ''}`}>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="truncate font-semibold">{msg.name}</p>
          {!msg.is_read && <span className="h-2 w-2 shrink-0 rounded-full bg-brand-400" />}
        </div>
        <p className="truncate text-sm text-[rgb(var(--text-soft))]">{msg.email}</p>
        <p className="mt-1 truncate text-sm text-brand-400">{msg.subject}</p>
        <p className="mt-1 line-clamp-2 text-sm text-[rgb(var(--text-soft))]">{msg.message}</p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2">
        <span className="text-xs text-[rgb(var(--text-soft))]">
          {new Date(msg.created_at).toLocaleDateString()}
        </span>
        {!msg.is_read && (
          <button onClick={() => onRead(msg.id)} className="chip hover:border-brand-400/60" title="Mark as read">
            <HiOutlineCheckBadge /> Read
          </button>
        )}
      </div>
    </div>
  )
}

export default function AdminDashboard({ onSignOut, onBack }) {
  const [stats, setStats] = useState({ visits: 0, messages: 0, unread: 0, downloads: 0 })
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  const loadStats = async () => {
    const [visits, msgs, unread, downloads] = await Promise.all([
      supabase.from('analytics').select('id', { count: 'exact', head: true }).eq('event_type', 'visit'),
      supabase.from('contacts').select('id', { count: 'exact', head: true }),
      supabase.from('contacts').select('id', { count: 'exact', head: true }).eq('is_read', false),
      supabase.from('analytics').select('id', { count: 'exact', head: true }).eq('event_type', 'resume_download'),
    ])
    setStats({
      visits: visits.count || 0,
      messages: msgs.count || 0,
      unread: unread.count || 0,
      downloads: downloads.count || 0,
    })
  }

  const loadMessages = async () => {
    const { data } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)
    setMessages(data || [])
  }

  useEffect(() => {
    (async () => {
      await Promise.all([loadStats(), loadMessages()])
      setLoading(false)
    })()
  }, [])

  const markRead = async (id) => {
    await supabase.from('contacts').update({ is_read: true }).eq('id', id)
    loadMessages()
    loadStats()
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    onSignOut()
  }

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand-400 border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="relative z-10 min-h-screen">
      <header className="sticky top-0 z-20 glass border-b border-[rgb(var(--border))]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 py-4">
          <div>
            <h1 className="font-display text-lg font-extrabold">Admin Dashboard</h1>
            <p className="text-xs text-[rgb(var(--text-soft))]">{profile.name}'s portfolio</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="btn-ghost !py-2.5">
              <HiOutlineArrowLeft /> View Site
            </button>
            <button onClick={handleSignOut} className="btn-primary !py-2.5">
              <HiOutlineXMark /> Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={HiOutlineEye} label="Portfolio Visits" value={stats.visits} color="from-brand-400 to-cyan-500" />
          <StatCard icon={HiOutlineEnvelope} label="Contact Messages" value={stats.messages} color="from-accent-400 to-violet-500" />
          <StatCard icon={HiOutlineCheckBadge} label="Unread Messages" value={stats.unread} color="from-rose-400 to-pink-500" />
          <StatCard icon={HiOutlineDocumentArrowDown} label="Resume Downloads" value={stats.downloads} color="from-emerald-400 to-teal-500" />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="mb-4 font-display text-xl font-bold">Recent Messages</h2>
            <div className="space-y-3">
              {messages.length === 0 ? (
                <p className="card text-center text-[rgb(var(--text-soft))]">No messages yet.</p>
              ) : (
                messages.map((m) => <MessageRow key={m.id} msg={m} onRead={markRead} />)
              )}
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-display text-xl font-bold">Quick Actions</h2>
            <div className="card space-y-3">
              <p className="text-sm text-[rgb(var(--text-soft))]">
                Content management (projects, skills, experience, certifications) is stored in Supabase and editable via the Supabase dashboard or API.
              </p>
              <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" className="btn-ghost w-full">
                Open Supabase Dashboard
              </a>
              <a href={profile.resumeUrl} download className="btn-primary w-full">
                <HiOutlineDocumentArrowDown /> Download Resume
              </a>
            </div>

            <div className="mt-6 card">
              <h3 className="font-semibold">Content Tables</h3>
              <ul className="mt-3 space-y-2 text-sm text-[rgb(var(--text-soft))]">
                <li className="flex justify-between"><span>Projects</span><span className="font-mono text-brand-400">projects</span></li>
                <li className="flex justify-between"><span>Skills</span><span className="font-mono text-brand-400">skills</span></li>
                <li className="flex justify-between"><span>Experience</span><span className="font-mono text-brand-400">experience</span></li>
                <li className="flex justify-between"><span>Certifications</span><span className="font-mono text-brand-400">certifications</span></li>
                <li className="flex justify-between"><span>Contacts</span><span className="font-mono text-brand-400">contacts</span></li>
                <li className="flex justify-between"><span>Analytics</span><span className="font-mono text-brand-400">analytics</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
