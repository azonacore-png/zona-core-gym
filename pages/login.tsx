import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const BASE_PATH = '/zona-core-gym'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  // Magic-link handler
  useEffect(() => {
    const hash = window.location.hash.substring(1)
    const params = new URLSearchParams(hash)
    const access = params.get('access_token')
    const refresh = params.get('refresh_token')
    if (access && refresh) {
      supabase.auth.setSession({ access_token: access, refresh_token: refresh })
        .then(() => window.location.replace(`${BASE_PATH}/admin/`))
        .catch(() => alert('Enlace inválido o expirado'))
    }
  }, [])

  const handleLogin = async () => {
    if (!email.includes('@')) return alert('Escribe un email con @')
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}${window.location.pathname}` },
    })
    if (error) alert(error.message)
    else setSent(true)
  }

  if (sent) return <SentScreen />

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2A5B8A] to-[#FF7A3C] flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8 w-full max-w-2xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[#2A5B8A]">ZONA CORE</h1>
          <p className="text-sm text-gray-600 mt-2">Ingresa con tu email</p>
        </div>

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

        <div className="mt-6 text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">¿Qué podrás hacer dentro?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg p-3">
              <div className="text-xl mb-1">💪</div>
              <div className="font-bold">Usuario</div>
              <div className="opacity-90">Ve tu progreso, reserva clases, edita perfil</div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg p-3">
              <div className="text-xl mb-1">📚</div>
              <div className="font-bold">Instructor</div>
              <div className="opacity-90">Gestiona clases y alumnos</div>
            </div>
            <div className="bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg p-3">
              <div className="text-xl mb-1">🔧</div>
              <div className="font-bold">Administrador</div>
              <div className="opacity-90">Control total del gimnasio</div>
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-500 text-center mt-4">
          Magic link seguro • Sin contraseñas
        </div>
      </div>
    </div>
  )
}

function SentScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2A5B8A] to-[#FF7A3C] flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <div className="text-4xl mb-4">✉️</div>
        <h2 className="text-2xl font-bold text-[#2A5B8A] mb-2">Revisa tu correo</h2>
        <p className="text-gray-600 mb-4">Hemos enviado un enlace mágico a tu bandeja.</p>
        <p className="text-sm text-gray-500">Incluye spam y vuelve a esta pestaña.</p>
      </div>
    </div>
  )
}
