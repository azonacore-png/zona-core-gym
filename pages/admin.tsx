// pages/admin.tsx
import Layout from '@/components/Layout'
import AdminDashboard from '@/components/AdminDashboard'
import InstructorManager from '@/components/InstructorManager'
import FinanceManager from '@/components/FinanceManager'

export default function AdminPage() {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Admin</h1>
        <AdminDashboard />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <InstructorManager />
          <FinanceManager />
        </div>
      </div>
    </Layout>
  )
}
