/**
 * @file aniamcion.js
 * @description Maneja la visualización de tooltips y la navegación desde los botones de acción principales.
 * @version 1.0.0
 * @date 24-06-2025
 */

/**
 * @function showTooltip
 * @description Muestra un tooltip (etiqueta emergente) para un elemento dado y lo oculta después de 1.5 segundos.
 * @param {HTMLElement} el - El elemento contenedor del tooltip.
 */
function showTooltip(el) {
    // Encuentra el elemento del tooltip dentro del contenedor.
    const tip = el.querySelector('.tooltip-text');
    // Hace el tooltip visible y completamente opaco.
    tip.style.visibility = 'visible';
    tip.style.opacity = '1';

    // Establece un temporizador para ocultar el tooltip después de 1500 ms.
    setTimeout(() => {
        tip.style.visibility = ''; // Revierte la visibilidad a su estado CSS original.
        tip.style.opacity = '';   // Revierte la opacidad a su estado CSS original.
    }, 1500); 
}

// --- MANEJADORES DE EVENTOS PARA NAVEGACIÓN ---

// 1. Botón "Crear Proyecto"
const crearBtn = document.getElementById('crear-proyecto');
// Verifica si el botón existe en la página actual antes de añadir el listener.
if (crearBtn) {
    crearBtn.addEventListener('click', function() {
        // Redirige al usuario a la página de selección de tipo de proyecto.
        window.location.href = 'selec.html';
    });
}

// 2. Botón "Entrar a Proyecto"
const entrarBtn = document.getElementById('entrar-proyecto');
// Verifica si el botón existe en la página actual.
if (entrarBtn) {
    entrarBtn.addEventListener('click', function() {
        // Redirige al usuario a la página de búsqueda de proyectos.
        window.location.href = 'buscar.html'; 
    });
}
