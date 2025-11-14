import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

const handleLogin = async () => {
  if (!email.includes('@')) {   // ← única comprobación mínima
    alert('Escribe un email con @')
    return
  }
  const { error } = await supabase.auth.signInWithOtp({ email })
  if (error) alert(error.message)
  else setSent(true)
  }

  if (sent) return <p className="text-green-600">Revisa tu correo (incluye spam) y vuelve a esta pestaña.</p>

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-full max-w-sm">
        <h1 className="text-2xl font-bold text-[#2A5B8A] mb-4">ZONA CORE</h1>
        <input
          className="w-full border px-3 py-2 mb-4"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-[#FF7A3C] text-white py-2 rounded"
        >
          Enviar enlace mágico
        </button>
      </div>
    </div>
  )
}
