import Layout from '@/components/Layout'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminEjercicios() {
  const [exercises, setExercises] = useState<any[]>([])

  useEffect(() => {
    supabase.from('exercises').select('*').then(({ data }) => setExercises(data || []))
  }, [])

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#2A5B8A]">Biblioteca de Ejercicios</h2>
            <button className="bg-[#FF7A3C] text-white px-4 py-2 rounded-lg hover:bg-[#e66a2b] transition">
              <i className="fas fa-plus mr-2"></i>Nuevo Ejercicio
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exercises.map((ex) => (
              <div key={ex.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition">
                <h3 className="font-semibold text-gray-800 mb-2">{ex.name}</h3>
                <p className="text-sm text-gray-600 mb-1">Categoría: {ex.category}</p>
                <p className="text-sm text-gray-500">{ex.description}</p>
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
