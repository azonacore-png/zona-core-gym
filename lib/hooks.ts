import { useEffect, useState } from 'react'
import { supabase } from './supabase'

export function useUser() {
  const [user, setUser] = useState<any>(null)
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null))
    return () => sub.subscription.unsubscribe()
  }, [])
  return user
}

export function useRole(email?: string) {
  const [role, setRole] = useState<'admin'|'instructor'|'client'|'loading'>('loading')
  useEffect(() => {
    if (!email) return
    supabase.from('users').select('role').eq('email', email).single().then(({ data }) => {
      setRole(data?.role || 'client')
    })
  }, [email])
  return role
}
