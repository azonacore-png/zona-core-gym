import Layout from '@/components/Layout'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminInstructores() {
  const [instructors, setInstructors] = useState<any[]>([])

  useEffect(() => {
    supabase.from('users').select('*').eq('role', 'instructor').then(({ data }) => setInstructors(data || []))
  }, [])

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#2A5B8A]">Instructores</h2>
            <button className="bg-[#FF7A3C] text-white px-4 py-2 rounded-lg hover:bg-[#e66a2b] transition">
              <i className="fas fa-plus mr-2"></i>Nuevo Instructor
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {instructors.map((inst) => (
              <div key={inst.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    {inst.full_name?.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{inst.full_name}</h3>
                    <p className="text-sm text-gray-600">{inst.email}</p>
                    <p className="text-sm text-gray-500">{inst.phone}</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button className="text-blue-600 hover:underline text-sm">Ver</button>
                  <button className="text-green-600 hover:underline text-sm">Editar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
