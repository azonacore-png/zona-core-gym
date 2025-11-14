import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export default function InstructorManager() {
  const [list, setList] = useState<any[]>([])
  const [form, setForm] = useState({ full_name: '', email: '', specialty: '' })

  const load = () =>
    supabase
      .from('instructors')
      .select('*')
      .then((r) => setList(r.data || []))

  useEffect(() => { load() }, [])

  const handleSubmit = async () => {
    if (!form.full_name || !form.email || !form.specialty) {
      alert('Por favor, completa todos los campos.')
      return
    }
    await supabase.from('instructors').insert([form])
    setForm({ full_name: '', email: '', specialty: '' })
    load()
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Instructores</h2>
      <div className="bg-gray-50 p-4 rounded-lg mb-6 space-y-3">
        <input
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#FF7A3C] focus:border-transparent"
          placeholder="Nombre completo"
          value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
        />
        <input
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#FF7A3C] focus:border-transparent"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#FF7A3C] focus:border-transparent"
          placeholder="Especialidad"
          value={form.specialty}
          onChange={(e) => setForm({ ...form, specialty: e.target.value })}
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-[#FF7A3C] text-white p-2 rounded-lg hover:bg-[#e66a2b] transition-colors"
        >
          Guardar
        </button>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-gray-700 mb-3">Lista de instructores</h3>
        <ul className="divide-y divide-gray-200">
          {list.map((i) => (
            <li key={i.id} className="py-3">
              <p className="font-medium">{i.full_name}</p>
              <p className="text-sm text-gray-500">{i.email}</p>
              <p className="text-sm text-gray-400">{i.specialty}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
