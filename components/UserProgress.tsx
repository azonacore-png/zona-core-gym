import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export default function UserProgress({ userEmail }: { userEmail: string }) {
  const [rows, setRows] = useState<any[]>([])

  useEffect(() => {
    supabase.from('users').select('id').eq('email', userEmail).single().then(({ data: u }) => {
      if (!u) return
      supabase.from('progress_tracking').select('*').eq('user_id', u.id).order('date', { ascending: false }).then((r) => setRows(r.data || []))
    })
  }, [userEmail])

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
