import Layout from '@/components/Layout'
import UserProgress from '@/components/UserProgress'
import { useUser } from '@/lib/hooks'

export default function UserPage() {
  const user = useUser()
  if (!user) return null
  return (
    <Layout>
  <div className="mb-6">
    <a
      href="/user/nueva-medida"
      className="bg-[#FF7A3C] hover:bg-[#e66a2b] text-white px-4 py-2 rounded-lg font-semibold"
    >
      + Registrar nuevas medidas
    </a>
  </div>
      <UserProgress />
    </Layout>
  )
}
