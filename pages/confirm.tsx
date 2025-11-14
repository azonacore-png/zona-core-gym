import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabase'

export default function ConfirmPage() {
  const router = useRouter()

  useEffect(() => {
    const confirm = async () => {
      const { error } = await supabase.auth.getSession()
      if (error) {
        alert('Token inválido o expirado')
        router.push('/login')
      } else {
        router.push('/')
      }
    }
    confirm()
  }, [router])

  return <p className="p-6">Verificando...</p>
}
