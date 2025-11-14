import Link from 'next/link'
import { useUser, useRole } from '@/lib/hooks'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/router'

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = useUser()
  const role = useRole(user?.email)
  const router = useRouter()

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (!user || role === 'loading') return <div className="p-4">Cargando...</div>

  const links: { label: string; href: string }[] =
    role === 'admin'
      ? [
          { label: 'Dashboard', href: '/admin' },
          { label: 'Clientes', href: '/admin/clientes' },
          { label: 'Instructores', href: '/admin/instructores' },
          { label: 'Finanzas', href: '/admin/finanzas' },
          { label: 'Clases', href: '/admin/clases' },
          { label: 'Ejercicios', href: '/admin/ejercicios' },
        ]
      : role === 'instructor'
      ? [
          { label: 'Mis Clases', href: '/instructor' },
        ]
      : [
          { label: 'Mi Progreso', href: '/user' },
          { label: 'Reservar Clase', href: '/user/reservar' },
        ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-[#2A5B8A] text-white p-4">
        <h1 className="text-xl font-bold mb-6">ZONA CORE</h1>
        <nav className="space-y-2">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="block hover:underline">
              {l.label}
            </Link>
          ))}
          <button onClick={signOut} className="mt-6 text-sm underline">Cerrar sesión</button>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
