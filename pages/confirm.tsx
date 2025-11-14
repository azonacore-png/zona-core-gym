import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabase'

export default function ConfirmPage() {
  const router = useRouter()

  useEffect(() => {
    const exchangeToken = async () => {
      // 1. Leemos los tokens que Supabase pone en la URL
      const query = new URLSearchParams(window.location.hash.substring(1))
      const accessToken = query.get('access_token')
      const refreshToken = query.get('refresh_token')
      const errorDesc = query.get('error_description')

      if (errorDesc) {
        alert('Error: ' + errorDesc)
        router.push('/login')
        return
      }

      if (!accessToken || !refreshToken) {
        alert('Enlace incompleto o expirado')
        router.push('/login')
        return
      }

      // 2. Guardamos la sesión manualmente
      const { error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      })

      if (error) {
        alert('Token inválido o expirado')
        router.push('/login')
      } else {
        // 3. ¡Login OK! Llevamos al dashboard
        router.push('/')
      }
    }

    exchangeToken()
  }, [router])

  return <p className="p-6 text-center">Verificando sesión...</p>
}
