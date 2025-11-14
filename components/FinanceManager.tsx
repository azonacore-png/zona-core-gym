import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export default function FinanceManager() {
  const [list, setList] = useState<any[]>([])
  const [form, setForm] = useState({ type: 'Ingreso', category: '', amount: 0, description: '' })

  const load = () => supabase.from('financial_transactions').select('*').order('created_at', { ascending: false }).then((r) => setList(r.data || []))
  useEffect(() => { load() }, [])

  const handleSubmit = async () => {
    await supabase.from('financial_transactions').insert([form])
    setForm({ type: 'Ingreso', category: '', amount: 0, description: '' })
    load()
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Gestión Financiera</h2>
      <div className="bg-white p-4 rounded shadow mb-4 space-y-2">
        <select className="w-full border px-3 py-2" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option value="Ingreso">Ingreso</option>
          <option value="Egreso">Egreso</option>
        </select>
        <input className="w-full border px-3 py-2" placeholder="Categoría" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <input className="w-full border px-3 py-2" type="number" placeholder="Monto" value={form.amount} onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })} />
        <input className="w-full border px-3 py-2" placeholder="Descripción" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <button onClick={handleSubmit} className="bg-[#FF7A3C] text-white px-4 py-2 rounded">Guardar</button>
      </div>
      <ul className="bg-white rounded shadow divide-y">
        {list.map((t) => (
          <li key={t.id} className="p-3 flex justify-between">
            <span>{t.category} – {t.description}</span>
            <span className={t.type === 'Ingreso' ? 'text-green-600' : 'text-red-600'}>${t.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
