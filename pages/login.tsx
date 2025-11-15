import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [preview, setPreview] = useState<'admin' | 'user' | 'instructor'>('user')
  const BASE_PATH = '/zona-core-gym' // ← para GitHub Pages
  const router = useRouter()

  // Verifica token en URL
  useEffect(() => {
    const hash = window.location.hash.substring(1)
    const params = new URLSearchParams(hash)
    const access = params.get('access_token')
    const refresh = params.get('refresh_token')
    if (access && refresh) {
      supabase.auth.setSession({ access_token: access, refresh_token: refresh })
      .then(() => {
        // ✅ CORREGIDO: ruta absoluta + .html
        window.location.replace(`${BASE_PATH}/admin`)
      })
      .catch(() => alert('Enlace inválido o expirado'))
    }
  }, [])

  const handleLogin = async () => {
    if (!email.includes('@')) {
      alert('Escribe un email con @')
      return
    }
  // ✅ misma ventana
  const redirectTo = `${window.location.origin}${window.location.pathname}`
  // pages/login.tsx
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}${window.location.pathname}`, // ← ya está bien
    },
  })
    if (error) alert(error.message)
    else setSent(true)
  }

  // Preview de perfil según rol
  const profileData = {
    admin: {
      title: 'Administrador',
      desc: 'Acceso total: crea, edita y elimina toda la información del gimnasio.',
      color: 'from-red-500 to-red-700',
      icon: '🔧',
    },
    user: {
      title: 'Usuario',
      desc: 'Ve tu progreso, edita tu perfil y reserva clases.',
      color: 'from-blue-500 to-blue-700',
      icon: '💪',
    },
    instructor: {
      title: 'Instructor',
      desc: 'Gestiona clases, agenda y progreso de usuarios.',
      color: 'from-green-500 to-green-700',
      icon: '📚',
    },
  }

  if (sent) return <SentScreen />

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2A5B8A] to-[#FF7A3C] flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8 w-full max-w-4xl grid md:grid-cols-2 gap-6">
        {/* Columna izquierda: formulario */}
        <div className="space-y-6">
          <div className="text-center">
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

          <div className="text-xs text-gray-500 text-center">
            Magic link seguro • Sin contraseñas
          </div>
        </div>

        {/* Columna derecha: preview de perfil */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-700">¿Cómo usarás ZONA CORE?</h2>
          </div>

          <div className="flex gap-2 justify-center">
            {(['user', 'instructor', 'admin'] as const).map((rol) => (
              <button
                key={rol}
                onClick={() => setPreview(rol)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${preview === rol ? 'bg-[#FF7A3C] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {profileData[rol].icon} {profileData[rol].title}
              </button>
            ))}
          </div>

          <div className={`bg-gradient-to-r ${profileData[preview].color} text-white rounded-lg p-4 text-center`}>
            <div className="text-2xl mb-2">{profileData[preview].icon}</div>
            <div className="font-bold text-lg">{profileData[preview].title}</div>
            <div className="text-sm mt-1">{profileData[preview].desc}</div>
          </div>

          <div className="text-xs text-gray-500 text-center">
            Podrás subir foto de perfil una vez dentro
          </div>
        </div>
      </div>
    </div>
  )
}

// Pantalla de éxito
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
