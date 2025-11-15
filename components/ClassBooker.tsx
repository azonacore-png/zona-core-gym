import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { useUser } from '@/lib/hooks' // ← hook para obtener usuario autenticado

export default function ClassBooker() {
  const user = useUser()
  const [classes, setClasses] = useState<any[]>([])
  const [booked, setBooked] = useState<string[]>([])

  useEffect(() => {
    if (!user) return

    // 1. Cargar clases
    supabase
      .from('classes')
      .select('*, instructors(full_name)')
      .then(({ data }) => setClasses(data || []))

    // 2. Cargar reservas del usuario autenticado (por ID)
    supabase
      .from('class_bookings')
      .select('class_id')
      .eq('user_id', user.id)
      .then(({ data }) => setBooked((data || []).map((x: any) => x.class_id)))
  }, [user])

  const book = async (classId: string) => {
    if (!user) return

    // Reservar usando ID único
    await supabase
      .from('class_bookings')
      .insert([{ user_id: user.id, class_id: classId }])

    // Actualizar lista local
    setBooked([...booked, classId])
  }

  if (!user) return <div className="p-6">Cargando usuario...</div>

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Reservar Clase</h2>
      <div className="bg-gray-50 p-4 rounded-lg">
        <ul className="divide-y divide-gray-200">
          {classes.map((c) => (
            <li key={c.id} className="py-4 flex justify-between items-center">
              <div>
                <p className="font-medium">{c.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(c.scheduled_at).toLocaleString()} – {c.instructors.full_name}
                </p>
              </div>
              {booked.includes(c.id) ? (
                <span className="text-green-600 text-sm font-medium">Reservado</span>
              ) : (
                <button
                  onClick={() => book(c.id)}
                  className="bg-[#FF7A3C] text-white px-3 py-1 rounded-lg text-sm hover:bg-[#e66a2b] transition-colors"
                >
                  Reservar
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
