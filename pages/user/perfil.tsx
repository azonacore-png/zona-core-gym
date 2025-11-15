import Layout from '@/components/Layout'
import { useUser, useRole } from '@/lib/hooks'
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import UploadAvatar from '@/components/UploadAvatar'

export default function UserPerfilPage() {
  const user = useUser()
  const role = useRole(user?.email)
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    if (!user) return
    supabase.from('users').select('*').eq('id', user.id).single().then(({ data }) => setProfile(data))
  }, [user])

  const updateAvatar = async (url: string) => {
    await supabase.from('users').update({ avatar_url: url }).eq('id', user!.id)
    setProfile({ ...profile, avatar_url: url })
  }

  if (role !== 'client') return <div className="p-6">No autorizado</div>
  if (!profile) return <p className="p-6">Cargando...</p>

  return (
    <Layout>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-[#2A5B8A] mb-6">Mi Perfil</h2>

        <div className="flex flex-col items-center mb-6">
          <UploadAvatar
            url={profile.avatar_url}
            size={128}
            onUpload={updateAvatar}
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
            <input
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A3C]"
              defaultValue={profile.full_name}
              onBlur={(e) => supabase.from('users').update({ full_name: e.target.value }).eq('id', user.id)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input className="mt-1 w-full px-3 py-2 border rounded-lg bg-gray-100" value={profile.email} disabled />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Teléfono</label>
            <input
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A3C]"
              defaultValue={profile.phone}
              onBlur={(e) => supabase.from('users').update({ phone: e.target.value }).eq('id', user.id)}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}
