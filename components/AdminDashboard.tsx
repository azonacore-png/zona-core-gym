import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>({})

  useEffect(() => {
    Promise.all([
      supabase.from('users').select('*', { count: 'exact', head: true }),
      supabase.from('payments').select('amount').eq('is_paid', true),
      supabase.from('vw_monthly_income').select('*').order('month', { ascending: false }).limit(1).single(),
    ]).then(([users, pay, inc]) => {
      setStats({
        totalClients: users.count,
        totalIncome: pay.data?.reduce((a: any, b: any) => a + b.amount, 0) || 0,
        lastMonthIncome: inc.data?.total || 0,
      })
    })
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#2A5B8A] mb-4">Dashboard Admin</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow"><p className="text-sm text-gray-600">Clientes</p><p className="text-2xl font-bold">{stats.totalClients}</p></div>
        <div className="bg-white p-4 rounded shadow"><p className="text-sm text-gray-600">Ingresos totales</p><p className="text-2xl font-bold">${stats.totalIncome}</p></div>
        <div className="bg-white p-4 rounded shadow"><p className="text-sm text-gray-600">Ingreso mes pasado</p><p className="text-2xl font-bold">${stats.lastMonthIncome}</p></div>
      </div>
    </div>
  )
}
