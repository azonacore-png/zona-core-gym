import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ClienteEditarPage() {
  const router = useRouter()
  const { id } = router.query
  const [client, setClient] = useState<any>(null)
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    birth_date: '',
    sex: 'F',
    membership_type: 'monthly',
    status: 'active',
    id_number: '',
    emergency_name: '',
    emergency_phone: '',
    allergies: '',
    medical_conditions: '',
    has_experience: false,
  })

  useEffect(() => {
    if (!id) return
    supabase.from('users').select('*').eq('id', id).single().then(({ data }) => {
      if (data) {
        setClient(data)
        setForm({
          full_name: data.full_name || '',
          email: data.email || '',
          phone: data.phone || '',
          birth_date: data.birth_date || '',
          sex: data.sex || 'F',
          membership_type: data.membership_type || 'monthly',
          status: data.status || 'active',
          id_number: data.id_number || '',
          emergency_name: data.emergency_name || '',
          emergency_phone: data.emergency_phone || '',
          allergies: data.allergies || '',
          medical_conditions: data.medical_conditions || '',
          has_experience: data.has_experience || false,
        })
      }
    })
  }, [id])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase
      .from('users')
      .update({
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        birth_date: form.birth_date,
        sex: form.sex,
        membership_type: form.membership_type,
        status: form.status,
        id_number: form.id_number,
        emergency_name: form.emergency_name,
        emergency_phone: form.emergency_phone,
        allergies: form.allergies,
        medical_conditions: form.medical_conditions,
        has_experience: form.has_experience,
      })
      .eq('id', id)

    if (error) {
      alert('Error al guardar: ' + error.message)
    } else {
      alert('Cliente actualizado')
      window.location.href = `/zona-core-gym/admin/clientes/${id}/`
    }
  }

  if (!client) return <div className="p-6">Cargando...</div>

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-[#2A5B8A] mb-6">Editar Cliente</h2>

          <form onSubmit={handleSave} className="space-y-6">
            {/* Información personal */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Información personal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
                  <input
                    type="text"
                    value={form.full_name}
                    onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A3C]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A3C]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A3C]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de nacimiento</label>
                  <input
                    type="date"
                    value={form.birth_date}
                    onChange={(e) => setForm({ ...form, birth_date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A3C]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sexo</label>
                  <select
                    value={form.sex}
                    onChange={(e) => setForm({ ...form, sex: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A3C]"
                  >
                    <option value="F">Femenino</option>
                    <option value="M">Masculino</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cédula / Pasaporte</label>
                  <input
                    type="text"
                    value={form.id_number}
                    onChange={(e) => setForm({ ...form, id_number: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A3C]"
                  />
                </div>
              </div>
            </div>

            {/* Membresía */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Membresía</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                  <select
                    value={form.membership_type}
                    onChange={(e) => setForm({ ...form, membership_type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A3C]"
                  >
                    <option value="monthly">Mensual</option>
                    <option value="quarterly">Trimestral</option>
                    <option value="semester">Semestral</option>
                    <option value="annual">Anual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A3C]"
                  >
                    <option value="active">Activo</option>
                    <option value="inactive">Inactivo</option>
                    <option value="suspended">Suspendido</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contacto de emergencia */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Contacto de emergencia</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                  <input
                    type="text"
                    value={form.emergency_name}
                    onChange={(e) => setForm({ ...form, emergency_name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A3C]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                  <input
                    type="tel"
                    value={form.emergency_phone}
                    onChange={(e) => setForm({ ...form, emergency_phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A3C]"
                  />
                </div>
              </div>
            </div>

            {/* Salud */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Salud</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alergias</label>
                  <textarea
                    value={form.allergies}
                    onChange={(e) => setForm({ ...form, allergies: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A3C]"
                    rows={3}
                    placeholder="Listar alergias conocidas..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Condiciones médicas</label>
                  <textarea
                    value={form.medical_conditions}
                    onChange={(e) => setForm({ ...form, medical_conditions: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A3C]"
                    rows={3}
                    placeholder="Describir condiciones médicas relevantes..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={form.has_experience}
                      onChange={(e) => setForm({ ...form, has_experience: e.target.checked })}
                      className="w-4 h-4 text-[#FF7A3C] border-gray-300 rounded focus:ring-[#FF7A3C]"
                    />
                    <span className="text-sm font-medium text-gray-700">¿Ha hecho ejercicio antes?</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => window.location.href = `/zona-core-gym/admin/clientes/${id}/`}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-[#FF7A3C] hover:bg-[#e66a2b] text-white px-6 py-2 rounded-lg font-medium"
              >
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}
