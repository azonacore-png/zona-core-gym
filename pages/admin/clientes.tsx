import Layout from '@/components/Layout'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminClientes() {
  const [clients, setClients] = useState<any[]>([])

  useEffect(() => {
    supabase
      .from('users')
      .select('*')
      .eq('role', 'client')
      .then(({ data }) => setClients(data || []))
  }, [])

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#2A5B8A]">Clientes</h2>
            <button className="bg-[#FF7A3C] text-white px-4 py-2 rounded-lg hover:bg-[#e66a2b] transition">
              <i className="fas fa-plus mr-2"></i>Nuevo Cliente
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client) => (
              <div key={client.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {client.full_name?.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{client.full_name}</h3>
                    <p className="text-sm text-gray-600">{client.email}</p>
                    <p className="text-sm text-gray-500">{client.phone}</p>
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
