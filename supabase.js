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

// Funciones para clientes - COMPATIBLE CON LA ESTRUCTURA
const ClientesService = {
    // Obtener todos los clientes
    async obtenerClientes() {
        try {
            console.log('🔄 Solicitando clientes desde Supabase...')
            const { data, error } = await supabase
                .from('clientes')
                .select('*')
                .order('created_at', { ascending: false })
            
            if (error) {
                console.error('❌ Error Supabase:', error)
                throw new Error(`Error de base de datos: ${error.message}`)
            }
            
            console.log(`✅ ${data?.length || 0} clientes cargados correctamente`)
            return data || []
        } catch (error) {
            console.error('❌ Error en obtenerClientes:', error)
            throw error
        }
    },

    // Crear nuevo cliente - COMPATIBLE CON LA ESTRUCTURA
    async crearCliente(clienteData) {
        try {
            console.log('🆕 Iniciando creación de cliente...')
            
            // Validar campos requeridos
            if (!clienteData.nombre?.trim()) {
                throw new Error('El nombre es requerido')
            }
            if (!clienteData.email?.trim()) {
                throw new Error('El email es requerido')
            }

            // Preparar datos EXACTAMENTE como la tabla los espera
            const datosParaSupabase = {
                nombre: clienteData.nombre.trim(),
                email: clienteData.email.trim().toLowerCase(),
                telefono: clienteData.telefono?.trim() || null,
                fecha_nacimiento: clienteData.fecha_nacimiento || null,
                genero: clienteData.genero || null,
                ocupacion: clienteData.ocupacion?.trim() || null,
                experiencia_ejercicio: clienteData.experiencia_ejercicio === true || clienteData.experiencia_ejercicio === 'true',
                contacto_emergencia: clienteData.contacto_emergencia?.trim() || null,
                telefono_emergencia: clienteData.telefono_emergencia?.trim() || null,
                alergias: clienteData.alergias?.trim() || null,
                condiciones_medicas: clienteData.condiciones_medicas?.trim() || null,
                restricciones_medicas: clienteData.restricciones_medicas?.trim() || null,
                membresia_tipo: clienteData.membresia_tipo || 'mensualidad',
                estado: clienteData.estado || 'activa',
                fecha_ingreso: clienteData.fecha_ingreso || new Date().toISOString().split('T')[0],
                proximo_pago: clienteData.proximo_pago || this.calcularProximoPago(clienteData.membresia_tipo),
                observaciones: clienteData.observaciones?.trim() || null,
                activo: true // Siempre true para nuevos clientes
            }

            console.log('📤 Enviando a Supabase:', datosParaSupabase)

            const { data, error } = await supabase
                .from('clientes')
                .insert([datosParaSupabase])
                .select()
            
            if (error) {
                console.error('❌ Error Supabase al crear:', error)
                throw new Error(`Error al crear cliente: ${error.message}`)
            }

            if (!data || data.length === 0) {
                throw new Error('No se recibió respuesta del servidor')
            }

            console.log('✅ Cliente creado exitosamente:', data[0])
            return data[0]

        } catch (error) {
            console.error('❌ Error en crearCliente:', error)
            throw error
        }
    },

    // Actualizar cliente
    async actualizarCliente(id, updates) {
        try {
            console.log('✏️ Actualizando cliente ID:', id)
            
            // Preparar datos para actualización
            const datosActualizacion = { ...updates }
            
            // Convertir experiencia_ejercicio a booleano si es necesario
            if (datosActualizacion.experiencia_ejercicio !== undefined) {
                datosActualizacion.experiencia_ejercicio = 
                    datosActualizacion.experiencia_ejercicio === true || 
                    datosActualizacion.experiencia_ejercicio === 'true'
            }

            console.log('📤 Actualizando en Supabase:', datosActualizacion)

            const { data, error } = await supabase
                .from('clientes')
                .update(datosActualizacion)
                .eq('id', id)
                .select()
            
            if (error) {
                console.error('❌ Error Supabase al actualizar:', error)
                throw new Error(`Error al actualizar cliente: ${error.message}`)
            }

            if (!data || data.length === 0) {
                throw new Error('Cliente no encontrado')
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
            console.log('🗑️ Eliminando cliente ID:', id)

            const { error } = await supabase
                .from('clientes')
                .delete()
                .eq('id', id)
            
            if (error) {
                console.error('❌ Error Supabase al eliminar:', error)
                throw new Error(`Error al eliminar cliente: ${error.message}`)
            }

            console.log('✅ Cliente eliminado exitosamente')
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

// Exportar para usar en otros archivos
window.supabase = supabase
window.ClientesService = ClientesService
window.PagosService = PagosService
window.testConnection = testConnection

console.log('📦 Supabase.js cargado correctamente')
