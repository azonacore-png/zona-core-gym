import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export default function InstructorManager() {
  const [list, setList] = useState<any[]>([])
  const [form, setForm] = useState({ full_name: '', email: '', specialty: '' })

  const load = () => supabase.from('instructors').select('*').then((r) => setList(r.data || []))
  useEffect(() => { load() }, [])

  const handleSubmit = async () => {
    await supabase.from('instructors').insert([form])
    setForm({ full_name: '', email: '', specialty: '' })
    load()
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Instructores</h2>
      <div className="bg-white p-4 rounded shadow mb-4 space-y-2">
        <input className="w-full border px-3 py-2" placeholder="Nombre" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
        <input className="w-full border px-3 py-2" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full border px-3 py-2" placeholder="Especialidad" value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })} />
        <button onClick={handleSubmit} className="bg-[#FF7A3C] text-white px-4 py-2 rounded">Guardar</button>
      </div>
      <ul className="bg-white rounded shadow divide-y">
        {list.map((i) => (
          <li key={i.id} className="p-3">{i.full_name} – {i.specialty}</li>
        ))}
      </ul>
    </div>
  )
}
