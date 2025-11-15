import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabase'
import Link from 'next/link' // ← importación faltante

export default function RegistroPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    email: '',
    full_name: '',
    phone: '',
    birth_date: '',
    sex: 'F',
    id_type: 'DNI',
    id_number: '',
    role: 'client',
  })
  const [sent, setSent] = useState(false)

  const handleRegister = async () => {
    if (!form.email.includes('@') || !form.full_name || !form.id_number) {
      alert('Completa email, nombre y número de identificación')
      return
    }

    // Verificar que el número no exista
    const { data: exists } = await supabase
      .from('users')
      .select('id')
      .eq('id_number', form.id_number)
      .single()

    if (exists) {
      alert('Ese número de identificación ya está registrado')
      return
    }

    // Crear usuario en Supabase Auth
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: Math.random().toString(36), // contraseña aleatoria (no se usa)
      options: {
        data: {
          full_name: form.full_name,
          phone: form.phone,
          birth_date: form.birth_date,
          sex: form.sex,
          id_type: form.id_type,
          id_number: form.id_number,
          role: form.role,
        },
        emailRedirectTo: `${window.location.origin}/login/`,
      },
    })

    if (error) {
      alert(error.message)
      return
    }

    setSent(true)
  }

  if (sent) return <SentScreen />

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2A5B8A] to-[#FF7A3C] flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[#2A5B8A]">Crear cuenta</h1>
          <p className="text-sm text-gray-600 mt-2">Regístrate y recibirás un enlace mágico</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }} className="space-y-4">
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A3C] focus:border-transparent"
            placeholder="Email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A3C] focus:border-transparent"
            placeholder="Nombre completo"
            required
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          />
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A3C] focus:border-transparent"
            placeholder="Teléfono"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A3C] focus:border-transparent"
            placeholder="Fecha de nacimiento"
            type="date"
            value={form.birth_date}
            onChange={(e) => setForm({ ...form, birth_date: e.target.value })}
          />
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A3C] focus:border-transparent"
            value={form.sex}
            onChange={(e) => setForm({ ...form, sex: e.target.value })}
          >
            <option value="F">Femenino</option>
            <option value="M">Masculino</option>
            <option value="Otro">Otro</option>
          </select>

          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A3C] focus:border-transparent"
            value={form.id_type}
            onChange={(e) => setForm({ ...form, id_type: e.target.value })}
          >
            <option value="CC">Cédula de Ciudadania</option>
            <option value="CE">Cédula de extranjería</option>
            <option value="PAS">Pasaporte</option>
            <option value="NIT">NIT</option>
            <option value="TI">Tarjeta de Identidad</option>
            <option value="OTRO">Otro</option>
          </select>

          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A3C] focus:border-transparent"
            placeholder="Número de identificación"
            required
            value={form.id_number}
            onChange={(e) => setForm({ ...form, id_number: e.target.value })}
          />

          <button
            type="submit"
            className="w-full bg-[#FF7A3C] hover:bg-[#e66a2b] text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Crear cuenta
          </button>
        </form>

        <div className="text-center mt-4">
          <Link href="/login/" className="text-sm text-[#2A5B8A] hover:underline">
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  )
}

function SentScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2A5B8A] to-[#FF7A3C] flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <div className="text-4xl mb-2">✉️</div>
        <h2 className="text-2xl font-bold text-[#2A5B8A] mb-2">Revisa tu correo</h2>
        <p className="text-gray-600 mb-4">Te hemos enviado un enlace mágico para ingresar.</p>
        <Link href="/login/" className="text-sm text-[#2A5B8A] hover:underline">
          Volver al login
        </Link>
      </div>
    </div>
  )
}
