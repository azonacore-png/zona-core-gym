import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export default function ClassBooker({ userEmail }: { userEmail: string }) {
  const [classes, setClasses] = useState<any[]>([])
  const [booked, setBooked] = useState<string[]>([])

  const load = async () => {
    const { data: c } = await supabase.from('classes').select('*, instructors(full_name)')
    setClasses(c || [])
    const { data: u } = await supabase.from('users').select('id').eq('email', userEmail).single()
    if (!u) return
    const { data: b } = await supabase.from('class_bookings').select('class_id').eq('user_id', u.id)
    setBooked((b || []).map((x: any) => x.class_id))
  }

  useEffect(() => { load() }, [userEmail])

  const book = async (classId: string) => {
    const { data: u } = await supabase.from('users').select('id').eq('email', userEmail).single()
    if (!u) return
    await supabase.from('class_bookings').insert([{ user_id: u.id, class_id: classId }])
    load()
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Reservar Clase</h2>
      <ul className="bg-white rounded shadow divide-y">
        {classes.map((c) => (
          <li key={c.id} className="p-3 flex justify-between items-center">
            <div>
              <p className="font-semibold">{c.name}</p>
              <p className="text-sm text-gray-600">{new Date(c.scheduled_at).toLocaleString()} – {c.instructors.full_name}</p>
            </div>
            {booked.includes(c.id) ? (
              <span className="text-green-600 text-sm">Reservado</span>
            ) : (
              <button onClick={() => book(c.id)} className="bg-[#FF7A3C] text-white px-3 py-1 rounded text-sm">Reservar</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
