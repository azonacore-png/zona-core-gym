import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { useUser } from '@/lib/hooks' // ← importa el hook

export default function UserProgress() {
  const user = useUser()
  const [rows, setRows] = useState<any[]>([])

  useEffect(() => {
    if (!user) return
    // ✅ usa user.id directamente
    supabase
      .from('progress_tracking')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false })
      .then((r) => setRows(r.data || []))
  }, [user])

  if (!user) return <div className="p-6">Cargando usuario...</div>

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Mi Progreso</h2>
      <div className="bg-gray-50 p-4 rounded-lg">
        <ul className="divide-y divide-gray-200">
          {rows.map((p) => (
            <li key={p.id} className="py-3">
              <p className="font-medium">{new Date(p.date).toLocaleDateString()}</p>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Peso: {p.weight_kg} kg</span>
                <span className="text-sm text-gray-600">Grasa: {p.body_fat_pct}%</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
