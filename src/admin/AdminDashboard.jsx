import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiOutlineEye, HiOutlineEnvelope, HiOutlineDocumentArrowDown, HiOutlineArrowLeft,
  HiOutlineXMark, HiOutlineCheckBadge, HiOutlineSquares2X2, HiOutlineCodeBracket,
  HiOutlineBriefcase, HiOutlineAcademicCap, HiOutlineShieldCheck, HiOutlineChartBar,
  HiOutlineCog6Tooth, HiOutlineUser, HiOutlineClock, HiOutlinePlus, HiOutlinePencil,
  HiOutlineTrash, HiOutlineBars3, HiOutlineMoon, HiOutlineSun,
} from 'react-icons/hi2'
import { supabase } from '../context/SupabaseContext.jsx'
import { profile } from '../data/portfolio.js'
import { useTheme } from '../context/ThemeContext.jsx'
import CRUDPanel from './CRUDPanel.jsx'

const navItems = [
  { id: 'overview', label: 'Overview', icon: HiOutlineSquares2x2 },
  { id: 'projects', label: 'Projects', icon: HiOutlineCodeBracket },
  { id: 'skills', label: 'Skills', icon: HiOutlineCog6Tooth },
  { id: 'experience', label: 'Experience', icon: HiOutlineBriefcase },
  { id: 'education', label: 'Education', icon: HiOutlineAcademicCap },
  { id: 'certifications', label: 'Certificates', icon: HiOutlineShieldCheck },
  { id: 'messages', label: 'Messages', icon: HiOutlineEnvelope },
  { id: 'analytics', label: 'Analytics', icon: HiOutlineChartBar },
  { id: 'profile', label: 'Profile', icon: HiOutlineUser },
]

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

function MiniChart({ data, labels }) {
  const max = Math.max(...data, 1)
  return (
    <div className="flex h-32 items-end gap-2">
      {data.map((v, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${(v / max) * 100}%` }}
          transition={{ delay: i * 0.05, type: 'spring', stiffness: 200 }}
          className="flex-1 rounded-t-md bg-gradient-to-t from-brand-400 to-accent-400 min-h-[2px]"
          title={`${labels[i]}: ${v}`}
        />
      ))}
    </div>
  )
}

function MessageRow({ msg, onRead, onDelete }) {
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
        <div className="flex gap-1">
          {!msg.is_read && (
            <button onClick={() => onRead(msg.id)} className="chip hover:border-brand-400/60" title="Mark as read">
              <HiOutlineCheckBadge /> Read
            </button>
          )}
          <button onClick={() => onDelete(msg.id)} className="chip hover:border-rose-400/60 hover:text-rose-400" title="Delete">
            <HiOutlineTrash />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard({ onSignOut, onBack }) {
  const { theme, toggle } = useTheme()
  const [tab, setTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [stats, setStats] = useState({ visits: 0, messages: 0, unread: 0, downloads: 0, projects: 0, skills: 0, certs: 0 })
  const [messages, setMessages] = useState([])
  const [recentVisits, setRecentVisits] = useState([])
  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(true)
  const [lastLogin, setLastLogin] = useState(null)

  const loadStats = useCallback(async () => {
    const [visits, msgs, unread, downloads, projects, skills, certs] = await Promise.all([
      supabase.from('analytics').select('id', { count: 'exact', head: true }).eq('event_type', 'visit'),
      supabase.from('contacts').select('id', { count: 'exact', head: true }),
      supabase.from('contacts').select('id', { count: 'exact', head: true }).eq('is_read', false),
      supabase.from('analytics').select('id', { count: 'exact', head: true }).eq('event_type', 'resume_download'),
      supabase.from('projects').select('id', { count: 'exact', head: true }),
      supabase.from('skills').select('id', { count: 'exact', head: true }),
      supabase.from('certifications').select('id', { count: 'exact', head: true }),
    ])
    setStats({
      visits: visits.count || 0,
      messages: msgs.count || 0,
      unread: unread.count || 0,
      downloads: downloads.count || 0,
      projects: projects.count || 0,
      skills: skills.count || 0,
      certs: certs.count || 0,
    })
  }, [])

  const loadMessages = useCallback(async () => {
    const { data } = await supabase.from('contacts').select('*').order('created_at', { ascending: false }).limit(10)
    setMessages(data || [])
  }, [])

  const loadVisits = useCallback(async () => {
    const { data } = await supabase.from('analytics').select('created_at').eq('event_type', 'visit').order('created_at', { ascending: false }).limit(50)
    setRecentVisits(data || [])

    const days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date()
      d.setDate(d.getDate() - (6 - i))
      return d.toISOString().slice(0, 10)
    })
    const counts = days.map((day) => (data || []).filter((v) => v.created_at?.slice(0, 10) === day).length)
    setChartData(counts)
  }, [])

  const loadLastLogin = useCallback(async () => {
    const { data } = await supabase.from('activity_logs').select('created_at').eq('action', 'login').order('created_at', { ascending: false }).limit(2)
    if (data && data.length > 1) setLastLogin(new Date(data[1].created_at))
  }, [])

  useEffect(() => {
    (async () => {
      await Promise.all([loadStats(), loadMessages(), loadVisits(), loadLastLogin()])
      setLoading(false)
    })()
  }, [])

  const markRead = async (id) => {
    await supabase.from('contacts').update({ is_read: true }).eq('id', id)
    loadMessages()
    loadStats()
  }

  const deleteMsg = async (id) => {
    await supabase.from('contacts').delete().eq('id', id)
    loadMessages()
    loadStats()
  }

  const handleSignOut = async () => {
    await supabase.from('activity_logs').insert({ action: 'logout', entity: 'auth' })
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

  const dayLabels = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return d.toLocaleDateString('en', { weekday: 'short' })
  })

  return (
    <div className="relative z-10 min-h-screen">
      {/* Mobile header */}
      <header className="sticky top-0 z-30 glass border-b border-[rgb(var(--border))] lg:hidden">
        <div className="flex items-center justify-between px-5 py-4">
          <button onClick={() => setSidebarOpen(true)} aria-label="Menu">
            <HiOutlineBars3 className="text-xl" />
          </button>
          <h1 className="font-display font-extrabold">Admin</h1>
          <button onClick={toggle} aria-label="Theme" className="text-xl">
            {theme === 'dark' ? <HiOutlineSun /> : <HiOutlineMoon />}
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
            />
          )}
        </AnimatePresence>

        <aside
          className={`fixed lg:sticky top-0 z-50 h-screen w-64 shrink-0 glass border-r border-[rgb(var(--border))] p-4 transition-transform lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="mb-8 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-accent-400 text-slate-900 font-display font-extrabold">
              R
            </div>
            <div>
              <p className="font-display text-sm font-extrabold">Admin Panel</p>
              <p className="text-xs text-[rgb(var(--text-soft))]">{profile.name}</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((n) => (
              <button
                key={n.id}
                onClick={() => { setTab(n.id); setSidebarOpen(false) }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  tab === n.id
                    ? 'bg-brand-400/15 text-brand-400 border border-brand-400/30'
                    : 'text-[rgb(var(--text-soft))] hover:bg-[rgb(var(--bg-soft))] hover:text-[rgb(var(--text))]'
                }`}
              >
                <n.icon className="text-lg" /> {n.label}
              </button>
            ))}
          </nav>

          <div className="mt-8 space-y-2">
            <button onClick={onBack} className="btn-ghost w-full !py-2.5 text-sm">
              <HiOutlineArrowLeft /> View Site
            </button>
            <button onClick={handleSignOut} className="btn-primary w-full !py-2.5 text-sm">
              <HiOutlineXMark /> Sign Out
            </button>
          </div>

          {lastLogin && (
            <div className="mt-6 rounded-xl glass-soft p-3 text-xs text-[rgb(var(--text-soft))]">
              <p className="flex items-center gap-1.5"><HiOutlineClock /> Last login</p>
              <p className="mt-1 font-medium text-[rgb(var(--text))]">{lastLogin.toLocaleString()}</p>
            </div>
          )}
        </aside>

        {/* Main content */}
        <main className="flex-1 px-5 sm:px-8 py-8 lg:py-8">
          {tab === 'overview' && (
            <div>
              <h1 className="font-display text-2xl font-extrabold">Overview</h1>
              <p className="text-sm text-[rgb(var(--text-soft))]">Welcome back to your dashboard.</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard icon={HiOutlineEye} label="Portfolio Visits" value={stats.visits} color="from-brand-400 to-cyan-500" />
                <StatCard icon={HiOutlineEnvelope} label="Contact Messages" value={stats.messages} color="from-accent-400 to-violet-500" />
                <StatCard icon={HiOutlineDocumentArrowDown} label="Resume Downloads" value={stats.downloads} color="from-emerald-400 to-teal-500" />
                <StatCard icon={HiOutlineCheckBadge} label="Unread Messages" value={stats.unread} color="from-rose-400 to-pink-500" />
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <StatCard icon={HiOutlineCodeBracket} label="Projects" value={stats.projects} color="from-sky-400 to-blue-500" />
                <StatCard icon={HiOutlineCog6Tooth} label="Skills" value={stats.skills} color="from-amber-400 to-orange-500" />
                <StatCard icon={HiOutlineShieldCheck} label="Certificates" value={stats.certs} color="from-fuchsia-400 to-pink-500" />
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
                <div className="card">
                  <h2 className="font-display text-lg font-bold">Visits (last 7 days)</h2>
                  <div className="mt-4">
                    <MiniChart data={chartData} labels={dayLabels} />
                    <div className="mt-2 flex justify-between text-xs text-[rgb(var(--text-soft))]">
                      {dayLabels.map((d) => <span key={d}>{d}</span>)}
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h2 className="font-display text-lg font-bold">Recent Visitors</h2>
                  <div className="mt-4 space-y-2">
                    {recentVisits.slice(0, 5).map((v, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="text-[rgb(var(--text-soft))]">{v.path || '/'}</span>
                        <span className="text-xs text-[rgb(var(--text-soft))]">
                          {new Date(v.created_at).toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                    {recentVisits.length === 0 && <p className="text-sm text-[rgb(var(--text-soft))]">No visits yet.</p>}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="mb-4 font-display text-lg font-bold">Recent Messages</h2>
                <div className="space-y-3">
                  {messages.length === 0 ? (
                    <p className="card text-center text-[rgb(var(--text-soft))]">No messages yet.</p>
                  ) : (
                    messages.slice(0, 5).map((m) => <MessageRow key={m.id} msg={m} onRead={markRead} onDelete={deleteMsg} />)
                  )}
                </div>
              </div>
            </div>
          )}

          {tab === 'messages' && (
            <div>
              <h1 className="font-display text-2xl font-extrabold">Contact Messages</h1>
              <p className="text-sm text-[rgb(var(--text-soft))]">{stats.messages} total, {stats.unread} unread.</p>
              <div className="mt-6 space-y-3">
                {messages.length === 0 ? (
                  <p className="card text-center text-[rgb(var(--text-soft))]">No messages yet.</p>
                ) : (
                  messages.map((m) => <MessageRow key={m.id} msg={m} onRead={markRead} onDelete={deleteMsg} />)
                )}
              </div>
            </div>
          )}

          {tab === 'analytics' && (
            <div>
              <h1 className="font-display text-2xl font-extrabold">Analytics</h1>
              <p className="text-sm text-[rgb(var(--text-soft))]">Visitor and engagement metrics.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <StatCard icon={HiOutlineEye} label="Total Visits" value={stats.visits} color="from-brand-400 to-cyan-500" />
                <StatCard icon={HiOutlineDocumentArrowDown} label="Resume Downloads" value={stats.downloads} color="from-emerald-400 to-teal-500" />
                <StatCard icon={HiOutlineEnvelope} label="Messages" value={stats.messages} color="from-accent-400 to-violet-500" />
              </div>
              <div className="mt-8 card">
                <h2 className="font-display text-lg font-bold">Visits (last 7 days)</h2>
                <div className="mt-4">
                  <MiniChart data={chartData} labels={dayLabels} />
                  <div className="mt-2 flex justify-between text-xs text-[rgb(var(--text-soft))]">
                    {dayLabels.map((d) => <span key={d}>{d}</span>)}
                  </div>
                </div>
              </div>
              <div className="mt-8 card">
                <h2 className="font-display text-lg font-bold">Recent Visitors</h2>
                <div className="mt-4 space-y-2">
                  {recentVisits.map((v, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-[rgb(var(--text-soft))]">{v.path || '/'}</span>
                      <span className="text-xs text-[rgb(var(--text-soft))]">{new Date(v.created_at).toLocaleString()}</span>
                    </div>
                  ))}
                  {recentVisits.length === 0 && <p className="text-sm text-[rgb(var(--text-soft))]">No visits yet.</p>}
                </div>
              </div>
            </div>
          )}

          {['projects', 'skills', 'experience', 'education', 'certifications', 'profile'].includes(tab) && (
            <CRUDPanel entity={tab} />
          )}
        </main>
      </div>
    </div>
  )
}
