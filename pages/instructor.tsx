import Layout from '@/components/Layout'
import { useUser, useRole } from '@/lib/hooks'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function InstructorPage() {
  const user = useUser()
  const role = useRole(user?.email)
  const [classes, setClasses] = useState<any[]>([])

  useEffect(() => {
    if (!user) {
      window.location.replace('/zona-core-gym/login.html')
      return
    }

    supabase
      .from('classes')
      .select('*, class_bookings(*, users(full_name))')
      .eq('instructor_id', user.id)
      .then(({ data }) => setClasses(data || []))
  }, [user])

  useEffect(() => {
    if (role === 'instructor') {
      window.location.replace('/zona-core-gym/instructor.html')
    }
  }, [role])

  if (role !== 'instructor') return <div className="p-6">No autorizado</div>

  return (
    <Layout>
      <h2 className="text-2xl font-bold text-[#2A5B8A] mb-4">Mis Clases</h2>
      <ul className="bg-white rounded shadow divide-y">
        {classes.map((c) => (
          <li key={c.id} className="p-4">
            <p className="font-semibold">{c.name} – {new Date(c.scheduled_at).toLocaleString()}</p>
            <p className="text-sm text-gray-600">Reservas: {c.class_bookings.length}</p>
          </li>
        ))}
      </ul>
    </Layout>
  )
}
