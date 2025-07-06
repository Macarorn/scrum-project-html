

// Se ejecuta cuando el contenido del DOM ha sido completamente cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los elementos con la clase 'progress-circle'.
    const progressCircles = document.querySelectorAll('.progress-circle');

    // Itera sobre cada círculo de progreso encontrado.
    progressCircles.forEach(circle => {
        // Obtiene el valor de la variable CSS '--progress' del estilo en línea del elemento.
        const progressValue = parseInt(circle.style.getPropertyValue('--progress'), 10);

        // Asigna un estado textual en el atributo 'data-status' según el valor de progreso.
        // Este atributo puede ser usado por CSS para mostrar el texto (ej. usando ::before o ::after).
        if (progressValue >= 99) {
            circle.dataset.status = 'Completo'; // Si el progreso es 99% o más.
        } else if (progressValue >= 80) {
            circle.dataset.status = 'Casi Completo'; // Si el progreso está entre 80% y 98%.
        } else {
            circle.dataset.status = 'En Progreso'; // Para cualquier otro valor por debajo de 80%.
        }
    });
});