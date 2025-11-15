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
  <div className="min-h-screen bg-gradient-to-br from-[#2A5B8A] to-[#FF7A3C] flex items-center justify-center p-4 text-white">
    <div className="text-center max-w-xl">
      <h1 className="text-5xl font-extrabold mb-4">ZONA CORE</h1>
      <p className="text-xl mb-8">Gestión integral para gimnasios femeninos</p>
      <div className="flex gap-4 justify-center">
        <a
          href="/login/"
          className="bg-white text-[#2A5B8A] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Iniciar sesión
        </a>
        <a
          href="https://github.com/azonacore-png/zona-core-gym"
          target="_blank"
          rel="noopener noreferrer"
          className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#2A5B8A] transition"
        >
          Ver código
        </a>
      </div>
    </div>
  </div>
)
}
