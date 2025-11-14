import { supabase } from '@/lib/supabase'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
  const [email, setEmail] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    await supabase.auth.signInWithOtp({ email })
    alert('Revisa tu correo (incluye spam)')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-full max-sm mx-4">
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
