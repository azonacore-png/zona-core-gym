import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export default function FinanceManager() {
  const [list, setList] = useState<any[]>([])
  const [form, setForm] = useState({ type: 'Ingreso', category: '', amount: 0, description: '' })

  const load = () =>
    supabase
      .from('financial_transactions')
      .select('*')
      .order('created_at', { ascending: false })
      .then((r) => setList(r.data || []))

  useEffect(() => { load() }, [])

  const handleSubmit = async () => {
    if (!form.category || form.amount <= 0) {
      alert('Por favor, completa los campos obligatorios.')
      return
    }
    await supabase.from('financial_transactions').insert([form])
    setForm({ type: 'Ingreso', category: '', amount: 0, description: '' })
    load()
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Gestión Financiera</h2>
      <div className="bg-gray-50 p-4 rounded-lg mb-6 space-y-3">
        <select
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#FF7A3C] focus:border-transparent"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="Ingreso">Ingreso</option>
          <option value="Egreso">Egreso</option>
        </select>
        <input
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#FF7A3C] focus:border-transparent"
          placeholder="Categoría"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <input
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#FF7A3C] focus:border-transparent"
          type="number"
          placeholder="Monto"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
        />
        <input
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#FF7A3C] focus:border-transparent"
          placeholder="Descripción"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-[#FF7A3C] text-white p-2 rounded-lg hover:bg-[#e66a2b] transition-colors"
        >
          Guardar
        </button>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-gray-700 mb-3">Transacciones recientes</h3>
        <ul className="divide-y divide-gray-200">
          {list.map((t) => (
            <li key={t.id} className="py-3 flex justify-between items-center">
              <div>
                <p className="font-medium">{t.category}</p>
                <p className="text-sm text-gray-500">{t.description}</p>
              </div>
              <span className={`font-medium ${t.type === 'Ingreso' ? 'text-green-600' : 'text-red-600'}`}>
                {t.type === 'Ingreso' ? '+' : '-'}${t.amount}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
