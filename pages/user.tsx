import Layout from '@/components/Layout'
import UserProgress from '@/components/UserProgress'
import { useUser } from '@/lib/hooks'

export default function UserPage() {
  const user = useUser()
  if (!user) return null
  return (
    <Layout>
      <UserProgress userEmail={user.email} />
    </Layout>
  )
}
