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
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold text-[#2A5B8A] mb-6">Dashboard Admin</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
          <p className="text-gray-600 text-sm">Clientes registrados</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalClients || 0}</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg shadow-sm">
          <p className="text-gray-600 text-sm">Ingresos totales</p>
          <p className="text-3xl font-bold text-green-600 mt-2">${stats.totalIncome || 0}</p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-lg shadow-sm">
          <p className="text-gray-600 text-sm">Ingreso mes pasado</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">${stats.lastMonthIncome || 0}</p>
        </div>
      </div>
    </div>
  )
}
