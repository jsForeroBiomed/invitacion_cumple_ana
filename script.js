// ============================================
// CONFIGURACIÓN DE SUPABASE
// ============================================

// Inicializar cliente de Supabase
let supabaseClient = null;

// Función para inicializar Supabase
function initializeSupabase() {
    if (typeof supabase !== 'undefined' && typeof SUPABASE_CONFIG !== 'undefined') {
        supabaseClient = supabase.createClient(
            SUPABASE_CONFIG.url,
            SUPABASE_CONFIG.anonKey
        );
        console.log('✅ Supabase conectado correctamente');
        return true;
    } else {
        console.warn('⚠️ Supabase no está configurado. Verifica que config.js esté cargado.');
        return false;
    }
}

// Intentar inicializar inmediatamente (si los scripts ya están cargados)
if (document.readyState === 'loading') {
    // Si el DOM aún se está cargando, esperar
    document.addEventListener('DOMContentLoaded', initializeSupabase);
} else {
    // Si el DOM ya está cargado, inicializar inmediatamente
    initializeSupabase();
}

// ============================================
// NAVEGACIÓN ENTRE PÁGINAS
// ============================================

let currentPage = 0;
const totalPages = 3;

/**
 * Avanza a la siguiente página
 */
function nextPage() {
    if (currentPage < totalPages - 1) {
        currentPage++;
        showPage(currentPage);
        updateProgressIndicator();
        // Scroll automático hacia arriba
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

/**
 * Retrocede a la página anterior
 */
function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        showPage(currentPage);
        updateProgressIndicator();
        // Scroll automático hacia arriba
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

/**
 * Muestra la página especificada y oculta las demás
 * @param {number} pageIndex - Índice de la página a mostrar (0, 1, 2)
 */
function showPage(pageIndex) {
    const pages = document.querySelectorAll('.page');
    
    pages.forEach((page, index) => {
        if (index === pageIndex) {
            page.classList.add('active');
        } else {
            page.classList.remove('active');
        }
    });
    
    // Scroll automático hacia arriba al cambiar de página
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Actualiza el indicador de progreso
 */
function updateProgressIndicator() {
    const dots = document.querySelectorAll('.progress-dot');
    
    dots.forEach((dot, index) => {
        if (index <= currentPage) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    showPage(0);
    updateProgressIndicator();
    
    // Esperar un momento para asegurar que Supabase esté inicializado
    setTimeout(function() {
        // Manejar envío del formulario
        const form = document.getElementById('invitation-form');
        if (form) {
            form.addEventListener('submit', handleFormSubmit);
        }
    }, 100);
});

// ============================================
// MANEJO DEL FORMULARIO
// ============================================

/**
 * Maneja el envío del formulario
 * @param {Event} e - Evento del formulario
 */
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // Deshabilitar botón y mostrar estado de carga
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    
    try {
        // Obtener datos del formulario
        const formData = {
            nombre: document.getElementById('nombre').value.trim(),
            telefono: document.getElementById('telefono').value.trim() || null,
            asistencia: document.getElementById('asistencia').value,
            mensaje: document.getElementById('mensaje').value.trim() || null
        };
        
        // Validar datos requeridos
        if (!formData.nombre || !formData.asistencia) {
            throw new Error('Por favor completa todos los campos requeridos');
        }
        
        // Intentar inicializar Supabase si aún no está inicializado
        if (!supabaseClient) {
            const initialized = initializeSupabase();
            if (!initialized) {
                throw new Error('Supabase no está configurado. Por favor verifica config.js');
            }
        }
        
        // Enviar a Supabase
        const { data, error } = await supabaseClient
            .from('confirmaciones')
            .insert([formData])
            .select();
        
        if (error) {
            throw error;
        }
        
        // Éxito - redirigir directamente a la página de código de vestimenta
        form.reset();
        window.location.href = 'codigo-vestimenta.html';
        
    } catch (error) {
        console.error('Error al enviar formulario:', error);
        showErrorMessage(error.message || 'Hubo un error al enviar tu confirmación. Por favor intenta de nuevo.');
    } finally {
        // Restaurar botón
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

/**
 * Muestra mensaje de éxito
 */
function showSuccessMessage() {
    const message = '¡Gracias por confirmar tu asistencia! 🎉\n\nTu respuesta ha sido registrada correctamente.';
    alert(message);
}

/**
 * Muestra mensaje de error
 * @param {string} message - Mensaje de error
 */
function showErrorMessage(message) {
    alert('Error: ' + message);
}

