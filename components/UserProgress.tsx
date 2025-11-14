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
    <div>
      <h2 className="text-xl font-bold mb-2">Mi Progreso</h2>
      <ul className="bg-white rounded shadow divide-y">
        {rows.map((p) => (
          <li key={p.id} className="p-3">
            {p.date} – Peso: {p.weight_kg} kg – Grasa: {p.body_fat_pct} %
          </li>
        ))}
      </ul>
    </div>
  )
}
