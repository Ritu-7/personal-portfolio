import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from './SupabaseContext.jsx'

const AuthContext = createContext({ session: null, loading: true, user: null })

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      (async () => {
        setSession(sess)
        setUser(sess?.user ?? null)
        setLoading(false)

        if (sess?.user) {
          await supabase.from('activity_logs').insert({
            action: 'login',
            entity: 'auth',
            entity_id: sess.user.id,
          })
        }
      })()
    })

    return () => sub.subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ session, user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
