import Layout from '@/components/Layout'
import ClassBooker from '@/components/ClassBooker'
import { useUser } from '@/lib/hooks'

export default function ReservarPage() {
  const user = useUser()
  if (!user) return null
  return (
    <Layout>
      <ClassBooker />
    </Layout>
  )
}
