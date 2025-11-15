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
    router.push('/login/')
  }

  if (!user || role === 'loading') return <div className="p-4 text-center">Cargando...</div>

  // Menús por rol
  const menus = {
    admin: [
      { label: 'Dashboard', href: '/admin/' },
      { label: 'Clientes', href: '/admin/clientes/' },
      { label: 'Instructores', href: '/admin/instructores/' },
      { label: 'Finanzas', href: '/admin/finanzas/' },
      { label: 'Clases', href: '/admin/clases/' },
      { label: 'Ejercicios', href: '/admin/ejercicios/' },
      { label: 'Mi Perfil', href: '/admin/perfil/' },
    ],
    instructor: [
      { label: 'Mis Clases', href: '/instructor/' },
      { label: 'Mi Perfil', href: '/instructor/perfil/' },
    ],
    client: [
      { label: 'Mi Progreso', href: '/user/' },
      { label: 'Reservar Clase', href: '/user/reservar/' },
      { label: 'Mi Perfil', href: '/user/perfil/' },
      { label: 'Crear cuenta', href: '/registro/' }, // ← nuevo
    ],
  }

  const links = menus[role] || menus.client

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#2A5B8A] text-white p-4 flex flex-col">
        <h1 className="text-xl font-bold mb-8">ZONA CORE</h1>
        <nav className="space-y-2 flex-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-3 py-2 rounded-lg hover:bg-[#1E4A6E] transition-colors ${
                router.pathname === link.href ? 'bg-[#1E4A6E]' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={signOut}
          className="mt-4 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors w-full"
        >
          Cerrar sesión
        </button>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
