import Layout from '@/components/Layout'
import FinanceManager from '@/components/FinanceManager'

export default function AdminFinanzas() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-[#2A5B8A] mb-6">Gestión Financiera</h2>
          <FinanceManager />
        </div>
      </div>
    </Layout>
  )
}
