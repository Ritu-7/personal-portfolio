import { useEffect, useState } from 'react'
import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './sections/Hero.jsx'
import About from './sections/About.jsx'
import Skills from './sections/Skills.jsx'
import Experience from './sections/Experience.jsx'
import Projects from './sections/Projects.jsx'
import Education from './sections/Education.jsx'
import Certifications from './sections/Certifications.jsx'
import Achievements from './sections/Achievements.jsx'
import Contact from './sections/Contact.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Background from './components/Background.jsx'
import PageLoader from './components/PageLoader.jsx'
import MouseGlow from './components/MouseGlow.jsx'
import { ScrollProgress } from './components/Motion.jsx'
import { ToastProvider } from './components/Toast.jsx'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import { supabase } from './context/SupabaseContext.jsx'

const AdminLogin = lazy(() => import('./admin/AdminLogin.jsx'))
const AdminDashboard = lazy(() => import('./admin/AdminDashboard.jsx'))

function AdminRoute() {
  const { session, loading } = useAuth()
  const [, setRoute] = useState(window.location.hash)

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand-400 border-t-transparent" />
      </div>
    )
  }

  if (!session) return <AdminLogin onSuccess={() => setRoute('#admin')} onBack={() => { window.location.hash = '' }} />
  return <AdminDashboard onSignOut={() => setRoute('#admin')} onBack={() => { window.location.hash = '' }} />
}

function AdminShell() {
  return (
    <Suspense fallback={<div className="grid min-h-screen place-items-center"><div className="h-10 w-10 animate-spin rounded-full border-2 border-brand-400 border-t-transparent" /></div>}>
      <AdminRoute />
    </Suspense>
  )
}

function Portfolio() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900)
    ;(async () => {
      await supabase.from('analytics').insert({
        event_type: 'visit',
        path: window.location.pathname,
      })
    })()
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <PageLoader loading={loading} />
      <Background />
      <MouseGlow />
      <ScrollProgress />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Certifications />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default function App() {
  const [isAdmin, setIsAdmin] = useState(() => window.location.hash.startsWith('#admin'))

  useEffect(() => {
    const onHash = () => setIsAdmin(window.location.hash.startsWith('#admin'))
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (isAdmin) {
    return (
      <AuthProvider>
        <div className="relative min-h-screen overflow-x-hidden">
          <Background />
          <AdminShell />
        </div>
      </AuthProvider>
    )
  }

  return (
    <ToastProvider>
      <Portfolio />
    </ToastProvider>
  )
}
