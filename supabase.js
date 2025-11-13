// supabase.js - Conexión con Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Configuración de Supabase - REEMPLAZA con tus datos
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

// Funciones para clientes
const ClientesService = {
    // Obtener todos los clientes
    async obtenerClientes() {
        const { data, error } = await supabase
            .from('clientes')
            .select('*')
            .order('created_at', { ascending: false })
        
        if (error) throw error
        return data
    },

    // Crear nuevo cliente
    async crearCliente(clienteData) {
        const { data, error } = await supabase
            .from('clientes')
            .insert([clienteData])
            .select()
        
        if (error) throw error
        return data[0]
    },

    // Actualizar cliente
    async actualizarCliente(id, updates) {
        const { data, error } = await supabase
            .from('clientes')
            .update(updates)
            .eq('id', id)
            .select()
        
        if (error) throw error
        return data[0]
    },

    // Eliminar cliente
    async eliminarCliente(id) {
        const { error } = await supabase
            .from('clientes')
            .delete()
            .eq('id', id)
        
        if (error) throw error
        return true
    }
}

// Exportar para usar en otros archivos
window.supabase = supabase
window.ClientesService = ClientesService
window.testConnection = testConnection
