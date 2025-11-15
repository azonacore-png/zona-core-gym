// pages/login.tsx
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const hash = window.location.hash.substring(1)
    const params = new URLSearchParams(hash)
    const access = params.get('access_token')
    const refresh = params.get('refresh_token')
    if (access && refresh) {
      supabase.auth.setSession({ access_token: access, refresh_token: refresh })
        .then(() => router.replace('/'))
        .catch(() => alert('Enlace inválido o expirado'))
    }
  }, [router])

  const handleLogin = async () => {
    if (!email.includes('@')) {
      alert('Escribe un email con @')
      return
    }
    // ✅ URL de redirección correcta para GitHub Pages
    const redirectTo = 'https://azonacore-png.github.io/zona-core-gym/'
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
      },
    })
    if (error) alert(error.message)
    else setSent(true)
  }

  if (sent) return <p className="text-center p-6">Revisa tu correo (incluye spam) y <b>vuelve a esta pestaña</b>.</p>

return (
  <div className="min-h-screen bg-gradient-to-br from-[#2A5B8A] to-[#FF7A3C] flex items-center justify-center p-4">
    <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8 w-full max-w-md">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-[#2A5B8A]">ZONA CORE</h1>
        <p className="text-sm text-gray-600 mt-2">Ingresa con tu email</p>
      </div>

      {sent ? (
        <div className="text-center text-green-700 font-medium">
          ✉️ Revisa tu correo (incluye spam) y vuelve a esta pestaña.
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A3C] focus:border-transparent"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#FF7A3C] hover:bg-[#e66a2b] text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Enviar enlace mágico
          </button>
        </form>
      )}
    </div>
  </div>
)
}
