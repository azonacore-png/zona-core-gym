import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ClienteDetallePage() {
  const router = useRouter()
  const { id } = router.query
  const [client, setClient] = useState<any>(null)

  useEffect(() => {
    if (!id) return
    supabase.from('users').select('*').eq('id', id).single().then(({ data }) => setClient(data))
  }, [id])

  if (!client) return <div className="p-6">Cargando...</div>

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#2A5B8A]">Cliente: {client.full_name}</h2>
            <div className="space-x-2">
              <button
                onClick={() => router.push(`/admin/clientes/${id}/editar/`)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Editar
              </button>
              <button
                onClick={async () => {
                  if (confirm('¿Eliminar cliente?')) {
                    await supabase.from('users').delete().eq('id', id)
                    router.push('/admin/clientes/')
                  }
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Eliminar
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Información</h3>
              <p><strong>Email:</strong> {client.email}</p>
              <p><strong>Teléfono:</strong> {client.phone}</p>
              <p><strong>Fecha de nacimiento:</strong> {client.birth_date}</p>
              <p><strong>Sexo:</strong> {client.sex}</p>
              <p><strong>Cédula:</strong> {client.id_number}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Membresía</h3>
              <p><strong>Tipo:</strong> {client.membership_type || 'Sin definir'}</p>
              <p><strong>Estado:</strong> {client.status || 'Activo'}</p>
              <p><strong>Fecha de ingreso:</strong> {new Date(client.created_at).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Información adicional</h3>
            <p><strong>Contacto de emergencia:</strong> {client.emergency_name} – {client.emergency_phone}</p>
            <p><strong>Alergias:</strong> {client.allergies || 'Ninguna'}</p>
            <p><strong>Condiciones médicas:</strong> {client.medical_conditions || 'Ninguna'}</p>
            <p><strong>¿Ha hecho ejercicio antes?</strong> {client.has_experience ? 'Sí' : 'No'}</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
