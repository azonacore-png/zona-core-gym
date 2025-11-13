// ZONA CORE - Main JavaScript File
// Sistema de Administración de Gimnasio

// Global variables
let currentUser = {
    name: 'Administrador',
    role: 'admin',
    id: 1
};

let systemData = {
    clients: [],
    payments: [],
    classes: [],
    exercises: [],
    reports: []
};

// Initialize system
document.addEventListener('DOMContentLoaded', function() {
    initializeSystem();
    loadStoredData();
    setupEventListeners();
    startAnimations();
});

// System initialization
function initializeSystem() {
    console.log('Iniciando sistema ZONA CORE...');
    
    // Set current date for date inputs
    const today = new Date().toISOString().split('T')[0];
    document.querySelectorAll('input[type="date"]').forEach(input => {
        if (!input.value) {
            input.value = today;
        }
    });
    
    // Initialize notifications
    initializeNotifications();
    
    // Setup auto-save
    setupAutoSave();
}

// Load data from localStorage
function loadStoredData() {
    try {
        const storedData = localStorage.getItem('zonacore_data');
        if (storedData) {
            systemData = JSON.parse(storedData);
            console.log('Datos cargados desde localStorage');
        }
    } catch (error) {
        console.error('Error al cargar datos:', error);
    }
}

// Save data to localStorage
function saveData() {
    try {
        localStorage.setItem('zonacore_data', JSON.stringify(systemData));
        console.log('Datos guardados en localStorage');
    } catch (error) {
        console.error('Error al guardar datos:', error);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', handleNavigation);
    });
    
    // Form submissions
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', handleFormSubmission);
    });
    
    // Search inputs
    document.querySelectorAll('input[type="search"], input[placeholder*="buscar" i]').forEach(input => {
        input.addEventListener('input', handleSearch);
    });
    
    // Modal close buttons
    document.querySelectorAll('[onclick*="close" i]').forEach(button => {
        button.addEventListener('click', handleModalClose);
    });
}

// Handle navigation
function handleNavigation(e) {
    const href = this.getAttribute('href');
    if (href && href !== '#' && href !== '') {
        // Add loading animation
        showLoading();
        
        setTimeout(() => {
            window.location.href = href;
        }, 300);
    }
}

// Handle form submissions
function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    console.log('Formulario enviado:', data);
    
    // Show success message
    showNotification('Datos guardados exitosamente', 'success');
    
    // Close modal if exists
    const modal = form.closest('.fixed');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
    
    // Reset form
    form.reset();
}

// Handle search
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const searchableElements = document.querySelectorAll('[data-searchable]');
    
    searchableElements.forEach(element => {
        const text = element.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            element.style.display = '';
        } else {
            element.style.display = 'none';
        }
    });
}

// Handle modal close
function handleModalClose(e) {
    const modal = e.target.closest('.fixed');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        
        // Reset form inside modal
        const form = modal.querySelector('form');
        if (form) {
            form.reset();
        }
    }
}

// Notification system
function initializeNotifications() {
    // Create notification container
    if (!document.getElementById('notification-container')) {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.className = 'fixed top-4 right-4 z-50 space-y-2';
        document.body.appendChild(container);
    }
}

// Show notification
function showNotification(message, type = 'info', duration = 3000) {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    
    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        warning: 'bg-yellow-500',
        info: 'bg-blue-500'
    };
    
    notification.className = `${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300`;
    notification.textContent = message;
    
    container.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, duration);
}

// Auto-save functionality
function setupAutoSave() {
    // Auto-save every 30 seconds
    setInterval(() => {
        saveData();
        console.log('Auto-save ejecutado');
    }, 30000);
    
    // Save before page unload
    window.addEventListener('beforeunload', () => {
        saveData();
    });
}

// Animation system
function startAnimations() {
    // Fade in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    if (fadeElements.length > 0) {
        anime({
            targets: fadeElements,
            translateY: [30, 0],
            opacity: [0, 1],
            delay: anime.stagger(150),
            duration: 600,
            easing: 'easeOutExpo'
        });
    }
    
    // Pulse animation for important elements
    const pulseElements = document.querySelectorAll('.pulse-animation');
    if (pulseElements.length > 0) {
        anime({
            targets: pulseElements,
            scale: [1, 1.05, 1],
            duration: 2000,
            loop: true,
            easing: 'easeInOutSine'
        });
    }
}

// Loading animation
function showLoading() {
    const loader = document.createElement('div');
    loader.id = 'loading-overlay';
    loader.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    loader.innerHTML = `
        <div class="bg-white rounded-lg p-6 flex items-center space-x-4">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span class="text-gray-800 font-medium">Cargando...</span>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    // Remove loader after 2 seconds
    setTimeout(() => {
        if (loader.parentNode) {
            loader.parentNode.removeChild(loader);
        }
    }, 2000);
}

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    
    return age;
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^\+?[\d\s\-\(\)]{8,}$/;
    return re.test(phone);
}

// Data management functions
function addClient(clientData) {
    const client = {
        id: generateId(),
        ...clientData,
        createdAt: new Date().toISOString(),
        status: 'active'
    };
    
    systemData.clients.push(client);
    saveData();
    return client;
}

function updateClient(id, updates) {
    const index = systemData.clients.findIndex(c => c.id === id);
    if (index !== -1) {
        systemData.clients[index] = { ...systemData.clients[index], ...updates };
        saveData();
        return systemData.clients[index];
    }
    return null;
}

function deleteClient(id) {
    const index = systemData.clients.findIndex(c => c.id === id);
    if (index !== -1) {
        systemData.clients.splice(index, 1);
        saveData();
        return true;
    }
    return false;
}

function getClient(id) {
    return systemData.clients.find(c => c.id === id);
}

function searchClients(query) {
    return systemData.clients.filter(client =>
        client.name.toLowerCase().includes(query.toLowerCase()) ||
        client.email.toLowerCase().includes(query.toLowerCase()) ||
        client.phone.includes(query)
    );
}

// Payment management
function addPayment(paymentData) {
    const payment = {
        id: generateId(),
        ...paymentData,
        createdAt: new Date().toISOString(),
        status: 'completed'
    };
    
    systemData.payments.push(payment);
    saveData();
    return payment;
}

function getPaymentsByClient(clientId) {
    return systemData.payments.filter(p => p.clientId === clientId);
}

function getPendingPayments() {
    return systemData.payments.filter(p => p.status === 'pending');
}

// Class management
function addClass(classData) {
    const classItem = {
        id: generateId(),
        ...classData,
        enrolled: 0,
        createdAt: new Date().toISOString()
    };
    
    systemData.classes.push(classItem);
    saveData();
    return classItem;
}

function bookClass(clientId, classId) {
    const classItem = systemData.classes.find(c => c.id === classId);
    if (classItem && classItem.enrolled < classItem.capacity) {
        classItem.enrolled++;
        saveData();
        return true;
    }
    return false;
}

function cancelBooking(clientId, classId) {
    const classItem = systemData.classes.find(c => c.id === classId);
    if (classItem && classItem.enrolled > 0) {
        classItem.enrolled--;
        saveData();
        return true;
    }
    return false;
}

// Exercise management
function addExercise(exerciseData) {
    const exercise = {
        id: generateId(),
        ...exerciseData,
        createdAt: new Date().toISOString()
    };
    
    systemData.exercises.push(exercise);
    saveData();
    return exercise;
}

function searchExercises(query) {
    return systemData.exercises.filter(exercise =>
        exercise.name.toLowerCase().includes(query.toLowerCase()) ||
        exercise.category.toLowerCase().includes(query.toLowerCase()) ||
        exercise.primaryMuscles.toLowerCase().includes(query.toLowerCase())
    );
}

function getExercisesByCategory(category) {
    return systemData.exercises.filter(e => e.category === category);
}

// Report generation
function generateReport(type, filters = {}) {
    const report = {
        id: generateId(),
        type,
        filters,
        generatedAt: new Date().toISOString(),
        data: {}
    };
    
    switch (type) {
        case 'financial':
            report.data = generateFinancialReport(filters);
            break;
        case 'attendance':
            report.data = generateAttendanceReport(filters);
            break;
        case 'clients':
            report.data = generateClientReport(filters);
            break;
        case 'payments':
            report.data = generatePaymentReport(filters);
            break;
        default:
            report.data = { error: 'Tipo de reporte no válido' };
    }
    
    systemData.reports.push(report);
    saveData();
    return report;
}

function generateFinancialReport(filters) {
    const { startDate, endDate } = filters;
    const payments = systemData.payments.filter(p => {
        const paymentDate = new Date(p.date);
        return paymentDate >= new Date(startDate) && paymentDate <= new Date(endDate);
    });
    
    const totalIncome = payments.reduce((sum, p) => sum + p.amount, 0);
    
    return {
        totalIncome,
        paymentCount: payments.length,
        averagePayment: totalIncome / payments.length,
        payments
    };
}

function generateAttendanceReport(filters) {
    const { classId, startDate, endDate } = filters;
    
    // This would need actual attendance tracking data
    return {
        totalClasses: systemData.classes.length,
        averageAttendance: 0,
        mostPopularClasses: []
    };
}

function generateClientReport(filters) {
    const { status, membershipType } = filters;
    
    let clients = systemData.clients;
    
    if (status) {
        clients = clients.filter(c => c.status === status);
    }
    
    return {
        totalClients: clients.length,
        activeClients: clients.filter(c => c.status === 'active').length,
        newClientsThisMonth: clients.filter(c => {
            const createdDate = new Date(c.createdAt);
            const monthAgo = new Date();
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            return createdDate >= monthAgo;
        }).length,
        clients
    };
}

function generatePaymentReport(filters) {
    const { status, startDate, endDate } = filters;
    
    let payments = systemData.payments;
    
    if (status) {
        payments = payments.filter(p => p.status === status);
    }
    
    if (startDate && endDate) {
        payments = payments.filter(p => {
            const paymentDate = new Date(p.date);
            return paymentDate >= new Date(startDate) && paymentDate <= new Date(endDate);
        });
    }
    
    return {
        totalPayments: payments.length,
        totalAmount: payments.reduce((sum, p) => sum + p.amount, 0),
        pendingPayments: payments.filter(p => p.status === 'pending').length,
        payments
    };
}

// Export functions for global use
window.ZonaCore = {
    // System functions
    initializeSystem,
    saveData,
    loadStoredData,
    showNotification,
    showLoading,
    
    // Utility functions
    formatCurrency,
    formatDate,
    calculateAge,
    generateId,
    validateEmail,
    validatePhone,
    
    // Client management
    addClient,
    updateClient,
    deleteClient,
    getClient,
    searchClients,
    
    // Payment management
    addPayment,
    getPaymentsByClient,
    getPendingPayments,
    
    // Class management
    addClass,
    bookClass,
    cancelBooking,
    
    // Exercise management
    addExercise,
    searchExercises,
    getExercisesByCategory,
    
    // Report generation
    generateReport,
    generateFinancialReport,
    generateAttendanceReport,
    generateClientReport,
    generatePaymentReport
};

// Make functions globally available
window.showNotification = showNotification;
window.showLoading = showLoading;
window.formatCurrency = formatCurrency;
window.formatDate = formatDate;

console.log('ZONA CORE System initialized successfully!');