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

// ============================================
// SISTEMA DE TRADUCCIONES
// ============================================

let currentLanguage = localStorage.getItem('language') || 'en';

const translations = {
    es: {
        'invitation-line': 'Te invitamos a celebrar',
        'hero-title': 'Cumpleaños de Ana',
        'date-time': '19 de Diciembre, 2025',
        'celebration-text': 'Celebrando al estilo navideño ✨',
        'next-btn': 'Siguiente →',
        'prev-btn': '← Anterior',
        'greeting': '¡Hola! 🎄',
        'main-message': 'Me encantaría invitarte a una celebración muy navideña 🎉, del <span class="highlight">cumpleaños número 25</span> de <span class="highlight">Ana</span> ✨.',
        'description': 'Será un plan chévere, tranqui, con comidita 🍰, haciendo honor en esta época tan especial del año ❄️.',
        'closing-message': '<span class="highlight">¡Tu presencia hará esta celebración aún más especial! 🎁</span>',
        'form-title': 'Confirma tu asistencia',
        'label-nombre': 'Nombre completo *',
        'label-telefono': 'Teléfono',
        'label-asistencia': '¿Asistirás a la reunión? *',
        'label-lleva-invitados': '¿Llevarás invitados? *',
        'label-cantidad-invitados': '¿Cuántos invitados? *',
        'label-mensaje': 'Mensaje especial',
        'placeholder-nombre': 'Ingresa tu nombre completo',
        'placeholder-telefono': 'Opcional',
        'placeholder-mensaje': 'Déjanos un mensaje especial para Ana María...',
        'option-select': 'Selecciona una opción',
        'option-select-invitados': 'Selecciona una opción',
        'option-select-cantidad': 'Selecciona cantidad',
        'option-si': 'Sí, asistiré',
        'option-no': 'No, no podré asistir',
        'option-invitados-si': 'Sí, llevaré invitados',
        'option-invitados-no': 'No, no llevaré invitados',
        'option-cantidad-1': '1 invitado',
        'option-cantidad-2': '2 invitados',
        'option-cantidad-3': '3 invitados',
        'submit-btn': 'Enviar respuesta 🎉',
        'response-sent': 'Se ha enviado tu respuesta.',
        'footer': 'Con mucho amor y sabor navideño ❄️🎄✨'
    },
    en: {
        'invitation-line': 'We invite you to celebrate',
        'hero-title': "Ana's Birthday",
        'date-time': 'December 19, 2025',
        'celebration-text': 'Celebrating in Christmas style ✨',
        'next-btn': 'Next →',
        'prev-btn': '← Previous',
        'greeting': 'Hello! 🎄',
        'main-message': 'I would love to invite you to a very Christmas celebration 🎉, for <span class="highlight">Ana\'s 25th birthday</span> ✨.',
        'description': 'It will be a nice, chill plan, with food 🍰, honoring this special time of the year ❄️.',
        'closing-message': '<span class="highlight">Your presence will make this celebration even more special! 🎁</span>',
        'form-title': 'Confirm your attendance',
        'label-nombre': 'Full name *',
        'label-telefono': 'Phone',
        'label-asistencia': 'Will you attend? *',
        'label-lleva-invitados': 'Will you bring guests? *',
        'label-cantidad-invitados': 'How many guests? *',
        'label-mensaje': 'Special message',
        'placeholder-nombre': 'Enter your full name',
        'placeholder-telefono': 'Optional',
        'placeholder-mensaje': 'Leave us a special message for Ana María...',
        'option-select': 'Select an option',
        'option-select-invitados': 'Select an option',
        'option-select-cantidad': 'Select quantity',
        'option-si': 'Yes, I will attend',
        'option-no': 'No, I won\'t be able to attend',
        'option-invitados-si': 'Yes, I will bring guests',
        'option-invitados-no': 'No, I won\'t bring guests',
        'option-cantidad-1': '1 guest',
        'option-cantidad-2': '2 guests',
        'option-cantidad-3': '3 guests',
        'submit-btn': 'Send response 🎉',
        'response-sent': 'Your response has been sent.',
        'footer': 'With much love and Christmas spirit ❄️🎄✨'
    }
};

/**
 * Cambia el idioma de la página
 * @param {string} lang - Código del idioma ('es' o 'en')
 */
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Actualizar botón de idioma
    document.getElementById('current-lang').textContent = lang === 'es' ? '🇪🇸' : '🇺🇸';
    
    // Cerrar menú
    document.getElementById('lang-menu').classList.remove('active');
    
    // Aplicar traducciones
    applyTranslations();
}

/**
 * Aplica las traducciones a todos los elementos
 */
function applyTranslations() {
    // Traducir elementos con data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLanguage][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                // Para inputs y textareas, actualizar placeholder
                const placeholderKey = element.getAttribute('data-i18n-placeholder');
                if (placeholderKey && translations[currentLanguage][placeholderKey]) {
                    element.placeholder = translations[currentLanguage][placeholderKey];
                }
            } else {
                element.innerHTML = translations[currentLanguage][key];
            }
        }
    });
    
    // Traducir placeholders de elementos que solo tienen data-i18n-placeholder
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(element => {
        const placeholderKey = element.getAttribute('data-i18n-placeholder');
        if (translations[currentLanguage][placeholderKey]) {
            element.placeholder = translations[currentLanguage][placeholderKey];
        }
    });
    
    // Traducir opciones de todos los selects
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        const options = select.querySelectorAll('option[data-i18n]');
        options.forEach(option => {
            const key = option.getAttribute('data-i18n');
            if (translations[currentLanguage] && translations[currentLanguage][key]) {
                option.textContent = translations[currentLanguage][key];
            }
        });
    });
    
    // Actualizar atributo lang del HTML
    document.documentElement.lang = currentLanguage;
}

/**
 * Toggle del menú de idioma
 */
function toggleLanguageMenu() {
    const menu = document.getElementById('lang-menu');
    menu.classList.toggle('active');
}

// Cerrar menú al hacer clic fuera
document.addEventListener('click', function(event) {
    const langSelector = document.querySelector('.language-selector');
    const langMenu = document.getElementById('lang-menu');
    
    if (langSelector && !langSelector.contains(event.target) && langMenu.classList.contains('active')) {
        langMenu.classList.remove('active');
    }
});

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    showPage(0);
    updateProgressIndicator();
    
    // Aplicar idioma guardado
    applyTranslations();
    document.getElementById('current-lang').textContent = currentLanguage === 'es' ? '🇪🇸' : '🇺🇸';
    
        // Esperar un momento para asegurar que Supabase esté inicializado
        setTimeout(function() {
            // Manejar envío del formulario
            const form = document.getElementById('invitation-form');
            if (form) {
                form.addEventListener('submit', handleFormSubmit);
            }
            
            // Manejar cambio en el select de asistencia
            const asistenciaSelect = document.getElementById('asistencia');
            if (asistenciaSelect) {
                asistenciaSelect.addEventListener('change', handleAsistenciaChange);
            }
            
            // Manejar cambio en el select de lleva_invitados
            const llevaInvitadosSelect = document.getElementById('lleva_invitados');
            if (llevaInvitadosSelect) {
                llevaInvitadosSelect.addEventListener('change', handleLlevaInvitadosChange);
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
    if (e && e.preventDefault) {
        e.preventDefault();
    }
    
    const form = e && e.target ? e.target : document.getElementById('invitation-form');
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn ? submitBtn.textContent : '';
    
    // Deshabilitar botón y mostrar estado de carga (si existe)
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = '...';
    }
    
    try {
        // Obtener datos del formulario
        const asistencia = document.getElementById('asistencia').value;
        const llevaInvitadosSelect = document.getElementById('lleva_invitados');
        const cantidadInvitadosSelect = document.getElementById('cantidad_invitados');
        
        const formData = {
            nombre: document.getElementById('nombre').value.trim(),
            telefono: document.getElementById('telefono').value.trim() || null,
            asistencia: asistencia,
            mensaje: document.getElementById('mensaje').value.trim() || null,
            lleva_invitados: false, // Por defecto false (si no asiste, no lleva invitados)
            cantidad_invitados: null
        };
        
        // Si asiste, procesar información de invitados
        if (asistencia === 'si') {
            const llevaInvitados = llevaInvitadosSelect ? llevaInvitadosSelect.value : '';
            
            if (!llevaInvitados) {
                throw new Error('Por favor indica si llevarás invitados');
            }
            
            formData.lleva_invitados = llevaInvitados === 'si';
            
            // Si lleva invitados, obtener cantidad
            if (formData.lleva_invitados) {
                const cantidadInvitados = cantidadInvitadosSelect ? cantidadInvitadosSelect.value : '';
                
                if (!cantidadInvitados) {
                    throw new Error('Por favor indica cuántos invitados llevarás');
                }
                
                formData.cantidad_invitados = parseInt(cantidadInvitados);
            }
        }
        
        // Validar datos requeridos básicos
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
        
        // Éxito
        // Si asistirá, redirigir a código de vestimenta
        if (formData.asistencia === 'si') {
            form.reset();
            window.location.href = 'confirmacion.html';
        } else {
            // Si no asistirá, solo mostrar mensaje de confirmación (no resetear formulario)
            showResponseSent();
        }
        
    } catch (error) {
        console.error('Error al enviar formulario:', error);
        showErrorMessage(error.message || 'Hubo un error al enviar tu confirmación. Por favor intenta de nuevo.');
    } finally {
        // Restaurar botón (si existe)
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
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

/**
 * Maneja el cambio en el select de asistencia
 */
function handleAsistenciaChange() {
    const select = document.getElementById('asistencia');
    const responseMessage = document.getElementById('response-message');
    const invitadosGroup = document.getElementById('invitados-group');
    const cantidadInvitadosGroup = document.getElementById('cantidad-invitados-group');
    const llevaInvitadosSelect = document.getElementById('lleva_invitados');
    const cantidadInvitadosSelect = document.getElementById('cantidad_invitados');
    
    // Ocultar mensaje de respuesta si cambia la selección
    if (responseMessage) {
        responseMessage.style.display = 'none';
    }
    
    // Mostrar/ocultar campos de invitados según si asiste o no
    if (select.value === 'si') {
        // Si asiste, mostrar campo de invitados
        if (invitadosGroup) {
            invitadosGroup.style.display = 'block';
        }
        // Hacer obligatorio el campo de lleva_invitados
        if (llevaInvitadosSelect) {
            llevaInvitadosSelect.required = true;
        }
    } else {
        // Si no asiste, ocultar campos de invitados
        if (invitadosGroup) {
            invitadosGroup.style.display = 'none';
        }
        if (cantidadInvitadosGroup) {
            cantidadInvitadosGroup.style.display = 'none';
        }
        // Limpiar valores y hacer no obligatorio
        if (llevaInvitadosSelect) {
            llevaInvitadosSelect.value = '';
            llevaInvitadosSelect.required = false;
        }
        if (cantidadInvitadosSelect) {
            cantidadInvitadosSelect.value = '';
            cantidadInvitadosSelect.required = false;
        }
    }
}

/**
 * Maneja el cambio en el select de lleva_invitados
 */
function handleLlevaInvitadosChange() {
    const select = document.getElementById('lleva_invitados');
    const cantidadInvitadosGroup = document.getElementById('cantidad-invitados-group');
    const cantidadInvitadosSelect = document.getElementById('cantidad_invitados');
    
    if (select.value === 'si') {
        // Si lleva invitados, mostrar campo de cantidad
        if (cantidadInvitadosGroup) {
            cantidadInvitadosGroup.style.display = 'block';
        }
        // Hacer obligatorio el campo de cantidad
        if (cantidadInvitadosSelect) {
            cantidadInvitadosSelect.required = true;
        }
    } else {
        // Si no lleva invitados, ocultar campo de cantidad
        if (cantidadInvitadosGroup) {
            cantidadInvitadosGroup.style.display = 'none';
        }
        // Limpiar valor y hacer no obligatorio
        if (cantidadInvitadosSelect) {
            cantidadInvitadosSelect.value = '';
            cantidadInvitadosSelect.required = false;
        }
    }
}

/**
 * Muestra el mensaje de respuesta enviada
 */
function showResponseSent() {
    const submitBtn = document.getElementById('submit-btn');
    const responseMessage = document.getElementById('response-message');
    const form = document.getElementById('invitation-form');
    
    // Ocultar botón y mostrar mensaje
    if (submitBtn) {
        submitBtn.style.display = 'none';
    }
    if (responseMessage) {
        responseMessage.style.display = 'block';
    }
    
    // Deshabilitar todos los campos del formulario
    if (form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.disabled = true;
        });
    }
}

