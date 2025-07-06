document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todas las tarjetas de proyecto dentro de la cuadrícula
    const projectCards = document.querySelectorAll('.proyectos-grid .card');

    // Añade un evento de clic a cada tarjeta
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            // Redirige a la página de visualización del proyecto
            window.location.href = 'visualizacion-proyecto.html';
        });
    });
});