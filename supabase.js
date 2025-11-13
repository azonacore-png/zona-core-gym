// supabase.js - Conexión con Supabase CORREGIDA
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://vfiawrvuoapsgxbbddku.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmaWF3cnZ1b2Fwc2d4YmJkZGt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNTAxNzYsImV4cCI6MjA3ODYyNjE3Nn0.TSBFZQoaQD-24sLr5QMV2tiIYndR-OmY4nBCj9UT7EE'

// Crear cliente de Supabase
const supabase = createClient(supabaseUrl, supabaseKey)

// Verificar conexión
async function testConnection() {
    try {
        const { data, error } = await supabase.from('clientes').select('count')
        if (error) throw error
        console.log('✅ Conectado a Supabase correctamente')
        return true
    } catch (error) {
        console.error('❌ Error conectando a Supabase:', error)
        return false
    }
}

// Funciones para clientes - CORREGIDAS
const ClientesService = {
    // Obtener todos los clientes
    async obtenerClientes() {
        try {
            const { data, error } = await supabase
                .from('clientes')
                .select('*')
                .order('created_at', { ascending: false })
            
            if (error) {
                console.error('❌ Error obteniendo clientes:', error)
                throw new Error(`Error al cargar clientes: ${error.message}`)
            }
            
            console.log('✅ Clientes cargados:', data?.length || 0)
            return data || []
        } catch (error) {
            console.error('❌ Error en obtenerClientes:', error)
            throw error
        }
    },

    // Crear nuevo cliente
    async crearCliente(clienteData) {
        try {
            console.log('🆕 Creando cliente:', clienteData)
            
            // Validar campos requeridos
            if (!clienteData.nombre || !clienteData.email) {
                throw new Error('Nombre y email son campos requeridos')
            }

            // Limpiar y formatear datos
            const datosLimpios = {
                nombre: clienteData.nombre.trim(),
                email: clienteData.email.trim().toLowerCase(),
                telefono: clienteData.telefono?.trim() || null,
                fecha_nacimiento: clienteData.fecha_nacimiento || null,
                genero: clienteData.genero || null,
                ocupacion: clienteData.ocupacion?.trim() || null,
                experiencia_ejercicio: Boolean(clienteData.experiencia_ejercicio),
                contacto_emergencia: clienteData.contacto_emergencia?.trim() || null,
                telefono_emergencia: clienteData.telefono_emergencia?.trim() || null,
                alergias: clienteData.alergias?.trim() || null,
                condiciones_medicas: clienteData.condiciones_medicas?.trim() || null,
                restricciones_medicas: clienteData.restricciones_medicas?.trim() || null,
                membresia_tipo: clienteData.membresia_tipo || 'mensualidad',
                estado: clienteData.estado || 'activa',
                fecha_ingreso: clienteData.fecha_ingreso || new Date().toISOString().split('T')[0],
                proximo_pago: clienteData.proximo_pago || this.calcularProximoPago(clienteData.membresia_tipo),
                observaciones: clienteData.observaciones?.trim() || null
            }

            console.log('📤 Enviando a Supabase:', datosLimpios)

            const { data, error } = await supabase
                .from('clientes')
                .insert([datosLimpios])
                .select()
            
            if (error) {
                console.error('❌ Error Supabase:', error)
                throw new Error(`Error al crear cliente: ${error.message}`)
            }

            console.log('✅ Cliente creado:', data[0])
            return data[0]

        } catch (error) {
            console.error('❌ Error en crearCliente:', error)
            throw error
        }
    },

    // Actualizar cliente
    async actualizarCliente(id, updates) {
        try {
            console.log('✏️ Actualizando cliente:', id, updates)

            // Limpiar y formatear datos
            const datosLimpios = { ...updates }
            
            if (datosLimpios.experiencia_ejercicio !== undefined) {
                datosLimpios.experiencia_ejercicio = Boolean(datosLimpios.experiencia_ejercicio)
            }

            // Limpiar campos vacíos
            Object.keys(datosLimpios).forEach(key => {
                if (datosLimpios[key] === '' || datosLimpios[key] === undefined) {
                    datosLimpios[key] = null
                }
                if (typeof datosLimpios[key] === 'string') {
                    datosLimpios[key] = datosLimpios[key].trim()
                }
            })

            console.log('📤 Actualizando en Supabase:', datosLimpios)

            const { data, error } = await supabase
                .from('clientes')
                .update(datosLimpios)
                .eq('id', id)
                .select()
            
            if (error) {
                console.error('❌ Error Supabase:', error)
                throw new Error(`Error al actualizar cliente: ${error.message}`)
            }

            console.log('✅ Cliente actualizado:', data[0])
            return data[0]

        } catch (error) {
            console.error('❌ Error en actualizarCliente:', error)
            throw error
        }
    },

    // Eliminar cliente
    async eliminarCliente(id) {
        try {
            console.log('🗑️ Eliminando cliente:', id)

            const { error } = await supabase
                .from('clientes')
                .delete()
                .eq('id', id)
            
            if (error) {
                console.error('❌ Error Supabase:', error)
                throw new Error(`Error al eliminar cliente: ${error.message}`)
            }

            console.log('✅ Cliente eliminado')
            return true

        } catch (error) {
            console.error('❌ Error en eliminarCliente:', error)
            throw error
        }
    },

    // Helper para calcular próximo pago
    calcularProximoPago(membresiaTipo) {
        const today = new Date()
        switch(membresiaTipo) {
            case 'mensualidad':
                today.setMonth(today.getMonth() + 1)
                break
            case 'trimestral':
                today.setMonth(today.getMonth() + 3)
                break
            case 'semestral':
                today.setMonth(today.getMonth() + 6)
                break
            case 'anualidad':
                today.setFullYear(today.getFullYear() + 1)
                break
            default:
                today.setMonth(today.getMonth() + 1)
        }
        return today.toISOString().split('T')[0]
    }
}

// Servicio de Pagos
const PagosService = {
    async obtenerPagos() {
        const { data, error } = await supabase
            .from('pagos')
            .select('*')
            .order('fecha_pago', { ascending: false })
        
        if (error) throw error
        return data
    }
}

// Configuración inicial de políticas (ejecutar una vez)
async function configurarPoliticas() {
    try {
        // Verificar si las políticas existen
        const { error } = await supabase.from('clientes').select('*').limit(1)
        
        if (error && error.code === '42501') {
            console.warn('⚠️ Las políticas RLS pueden estar bloqueando el acceso')
            console.warn('💡 Ve a Supabase → Authentication → Policies y asegúrate de tener políticas que permitan todas las operaciones')
        }
    } catch (error) {
        console.error('❌ Error verificando políticas:', error)
    }
}

// Ejecutar configuración al cargar
configurarPoliticas()

// Exportar para usar en otros archivos
window.supabase = supabase
window.ClientesService = ClientesService
window.PagosService = PagosService
window.testConnection = testConnection
