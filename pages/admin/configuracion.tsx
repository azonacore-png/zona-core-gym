import Layout from '@/components/Layout'

export default function AdminConfiguracion() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-[#2A5B8A] mb-6">Configuración del Sistema</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Gimnasio</label>
              <input type="text" defaultValue="ZONA CORE" className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email de Contacto</label>
              <input type="email" defaultValue="info@zonacore.cl" className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <button className="bg-[#FF7A3C] text-white px-6 py-2 rounded-lg hover:bg-[#e66a2b] transition">
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
