// js/backup.js - SISTEMA DE BACKUP MANUAL
class BackupSystem {
    constructor() {
        this.version = "1.0";
    }

    // EXPORTAR TODOS LOS DATOS
    exportarBackup() {
        try {
            const backupData = {
                metadata: {
                    version: this.version,
                    fechaExportacion: new Date().toISOString(),
                    sistema: "ZONA CORE",
                    totalRegistros: 0
                },
                datos: {
                    clientes: this.obtenerDatos('clientes'),
                    pagos: this.obtenerDatos('pagos'),
                    clases: this.obtenerDatos('clases'),
                    ejercicios: this.obtenerDatos('ejercicios'),
                    configuracion: this.obtenerDatos('configuracion'),
                    progreso: this.obtenerDatos('progresoClientes')
                }
            };

            // Calcular total de registros
            backupData.metadata.totalRegistros = 
                backupData.datos.clientes.length +
                backupData.datos.pagos.length +
                backupData.datos.clases.length;

            // Crear y descargar archivo
            this.descargarJSON(backupData, `backup-zona-core-${this.getFechaActual()}.json`);
            
            this.mostrarNotificacion('✅ Backup exportado correctamente', 'success');
            return true;

        } catch (error) {
            console.error('Error exportando backup:', error);
            this.mostrarNotificacion('❌ Error al exportar backup', 'error');
            return false;
        }
    }

    // IMPORTAR DATOS
    importarBackup(event) {
        const file = event.target.files[0];
        
        if (!file) return;

        if (!file.name.endsWith('.json')) {
            this.mostrarNotificacion('❌ Solo se permiten archivos JSON', 'error');
            return;
        }

        const reader = new FileReader();
        
        reader.onload = (e) => {
            try {
                const backupData = JSON.parse(e.target.result);
                
                if (!backupData.datos) {
                    throw new Error('Formato de backup inválido');
                }

                if (confirm(`¿Importar backup?\n\n• Fecha: ${backupData.metadata.fechaExportacion}\n• Registros: ${backupData.metadata.totalRegistros}\n\n⚠️ Se SOBREESCRIBIRÁN los datos actuales`)) {
                    
                    // Guardar todos los datos
                    this.guardarDatos('clientes', backupData.datos.clientes || []);
                    this.guardarDatos('pagos', backupData.datos.pagos || []);
                    this.guardarDatos('clases', backupData.datos.clases || []);
                    this.guardarDatos('ejercicios', backupData.datos.ejercicios || []);
                    this.guardarDatos('configuracion', backupData.datos.configuracion || {});
                    this.guardarDatos('progresoClientes', backupData.datos.progreso || []);

                    this.mostrarNotificacion('✅ Backup importado correctamente', 'success');
                    
                    // Recargar después de 2 segundos
                    setTimeout(() => location.reload(), 2000);
                }

            } catch (error) {
                this.mostrarNotificacion('❌ Error al importar backup', 'error');
            }
        };
        
        reader.readAsText(file);
        event.target.value = ''; // Limpiar input
    }

    // FUNCIONES AUXILIARES
    obtenerDatos(key) {
        return JSON.parse(localStorage.getItem(key) || '[]');
    }

    guardarDatos(key, datos) {
        localStorage.setItem(key, JSON.stringify(datos));
    }

    descargarJSON(data, filename) {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    getFechaActual() {
        return new Date().toISOString().split('T')[0];
    }

    mostrarNotificacion(mensaje, tipo = 'info') {
        // Notificación simple (puedes mejorar esto)
        alert(mensaje);
    }
}

// Crear instancia global
const backupManager = new BackupSystem();