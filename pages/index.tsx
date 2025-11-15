// pages/index.tsx
import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const BASE_PATH = '/zona-core-gym' // ← para GitHub Pages

  useEffect(() => {
    const hash = window.location.hash.substring(1)
    const params = new URLSearchParams(hash)
    const access = params.get('access_token')
    const refresh = params.get('refresh_token')

    if (access && refresh) {
      supabase.auth.setSession({ access_token: access, refresh_token: refresh })
        .then(() => {
          // ✅ CORREGIDO: ruta absoluta + .html
          window.location.replace(`${BASE_PATH}/admin.html`)
        })
        .catch(() => alert('Enlace inválido o expirado'))
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2A5B8A] to-[#FF7A3C] flex items-center justify-center p-4 text-white">
      <div className="text-center max-w-xl">
        <h1 className="text-5xl font-extrabold mb-4">ZONA CORE</h1>
        <p className="text-xl mb-8">Gestión integral para gimnasios femeninos</p>
        <div className="flex gap-4 justify-center">
          <a
            href={`${BASE_PATH}/login.html`} // ← .html para GitHub Pages
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
