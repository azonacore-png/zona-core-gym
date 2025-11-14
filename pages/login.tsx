import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const router = useRouter()

  // ---- VERIFICACIÓN DEL TOKEN ----
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

  // ---- ENVÍO DE MAGIC LINK ----
const handleLogin = async () => {
  if (!email.includes('@')) {
    alert('Escribe un email con @')
    return
  }
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



  if (sent) return (
  <p className="text-center p-6">
    Revisa tu correo (incluye spam) y <b>vuelve a esta pestaña</b> después de hacer clic en el enlace.
  </p>
)


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-full max-w-sm">
        <h1 className="text-2xl font-bold text-[#2A5B8A] mb-4">ZONA CORE</h1>
        <input className="w-full border px-3 py-2 mb-4" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button onClick={handleLogin} className="w-full bg-[#FF7A3C] text-white py-2 rounded">Enviar enlace </button>
      </div>
    </div>
  )
}
