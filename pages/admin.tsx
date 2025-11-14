import Layout from '@/components/Layout'
import AdminDashboard from '@/components/AdminDashboard'
import InstructorManager from '@/components/InstructorManager'
import FinanceManager from '@/components/FinanceManager'

export default function AdminPage() {
  return (
    <Layout>
      <div className="p-4">
        <AdminDashboard />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <InstructorManager />
          <FinanceManager />
        </div>
      </div>
    </Layout>
  )
}
