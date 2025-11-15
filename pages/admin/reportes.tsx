import Layout from '@/components/Layout'

export default function AdminReportes() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-[#2A5B8A] mb-6">Reportes y Análisis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition text-left">
              <div className="flex items-center space-x-3">
                <i className="fas fa-dollar-sign text-green-600"></i>
                <span className="font-medium">Reporte de Ingresos</span>
              </div>
            </button>
            <button className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition text-left">
              <div className="flex items-center space-x-3">
                <i className="fas fa-users text-blue-600"></i>
                <span className="font-medium">Reporte de Clientes</span>
              </div>
            </button>
            <button className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition text-left">
              <div className="flex items-center space-x-3">
                <i className="fas fa-calendar-alt text-orange-600"></i>
                <span className="font-medium">Reporte de Asistencia</span>
              </div>
            </button>
            <button className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition text-left">
              <div className="flex items-center space-x-3">
                <i className="fas fa-chart-line text-purple-600"></i>
                <span className="font-medium">Reporte de Progreso</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
