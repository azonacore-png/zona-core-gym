import Layout from '@/components/Layout'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminCrearUsuario() {
  const [form, setForm] = useState({
    email: '',
    full_name: '',
    role: 'client',
  })

  const handleCreate = async () => {
    if (!form.email || !form.full_name) return alert('Completa todos los campos')

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: Math.random().toString(36),
      options: {
        data: {
          full_name: form.full_name,
          role: form.role,
        },
        emailRedirectTo: `${window.location.origin}/zona-core-gym/login/`,
      },
    })

    if (error) return alert(error.message)
    alert('Usuario creado. Se le envió un email para ingresar.')
    setForm({ email: '', full_name: '', role: 'client' })
  }

  return (
    <Layout>
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-[#2A5B8A] mb-4">Crear Usuario</h2>
        <input
          className="w-full mb-3 px-4 py-2 border rounded-lg"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="w-full mb-3 px-4 py-2 border rounded-lg"
          placeholder="Nombre completo"
          value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
        />
        <select
          className="w-full mb-3 px-4 py-2 border rounded-lg"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="client">Cliente</option>
          <option value="instructor">Instructor</option>
        </select>
        <button
          onClick={handleCreate}
          className="w-full bg-[#FF7A3C] text-white py-2 rounded-lg hover:bg-[#e66a2b] transition"
        >
          Crear y enviar enlace mágico
        </button>
      </div>
    </Layout>
  )
}
