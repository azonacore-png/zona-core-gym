// pages/index.tsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const hash = window.location.hash.substring(1)
    const params = new URLSearchParams(hash)
    const access = params.get('access_token')
    const refresh = params.get('refresh_token')

    if (access && refresh) {
      supabase.auth.setSession({ access_token: access, refresh_token: refresh })
        .then(() => {
          // Redirige según el rol del usuario (ejemplo: '/admin')
          router.replace('/admin')
        })
        .catch(() => alert('Enlace inválido o expirado'))
    }
  }, [router])

  return (
    // Tu contenido de la página de inicio
    <div>Bienvenido a ZONA CORE</div>
  )
}
