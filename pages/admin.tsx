import Layout from '@/components/Layout'
import AdminDashboard from '@/components/AdminDashboard'
import InstructorManager from '@/components/InstructorManager'
import FinanceManager from '@/components/FinanceManager'

export default function AdminPage() {
  return (
    <Layout>
      <AdminDashboard />
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <InstructorManager />
        <FinanceManager />
      </div>
    </Layout>
  )
}
