

// --- MAPA DE ICONOS DE ROLES ---
// Asocia un valor de rol con una clase de icono (en este caso, de BoxIcons).
const rolIcons = {
    "scrum": "bx-crown", // Icono para el rol de Scrum Master
    // Añadir más roles e iconos aquí si es necesario
};

/**
 * @function updateRolIcons
 * @description Actualiza los iconos mostrados en el contenedor basándose en los roles seleccionados.
 * Limpia el contenedor y vuelve a añadir los iconos correspondientes a los checkboxes marcados.
 */
function updateRolIcons() {
    // Obtiene los elementos del DOM necesarios.
    const iconContainer = document.getElementById('rol-icon-container');
    const checkboxes = document.querySelectorAll('.select-dropdown input[name="rol"]:checked');
    const otroInput = document.querySelector('.otro-input'); // Campo para roles personalizados

    // Limpia el contenedor de iconos antes de actualizar.
    iconContainer.innerHTML = "";

    // Itera sobre los checkboxes seleccionados para mostrar los iconos.
    checkboxes.forEach(cb => {
        if (rolIcons[cb.value]) {
            // Lógica especial para el campo "otro".
            if (cb.value === "otro") {
                if (otroInput && otroInput.value.trim() !== "") {
                    const icon = document.createElement('i');
                    icon.className = `bx ${rolIcons[cb.value]} rol-animated-icon`;
                    iconContainer.appendChild(icon);
                }
            } else {
                // Crea y añade el icono para roles estándar.
                const icon = document.createElement('i');
                icon.className = `bx ${rolIcons[cb.value]} rol-animated-icon`;
                iconContainer.appendChild(icon);
            }
        }
    });
}

// --- LÓGICA DEL SELECT PERSONALIZADO ---
// Se ejecuta cuando el contenido del DOM ha sido completamente cargado.
document.addEventListener('DOMContentLoaded', function() {
    const selectBox = document.getElementById('custom-select-box');
    const placeholder = document.getElementById('select-placeholder');

    // 1. Maneja la apertura y cierre del desplegable.
    placeholder.addEventListener('click', function() {
        selectBox.classList.toggle('open');
        placeholder.classList.toggle('active');
    });

    // 2. Cierra el desplegable si se hace clic fuera de él.
    document.addEventListener('click', function(e) {
        if (selectBox && !selectBox.contains(e.target)) {
            selectBox.classList.remove('open');
            if (placeholder) {
                placeholder.classList.remove('active');
            }
        }
    });

    // 3. Añade listeners a los checkboxes para actualizar los iconos cuando cambian.
    document.querySelectorAll('.select-dropdown input[name="rol"]').forEach(cb => {
        cb.addEventListener('change', updateRolIcons);
    });

    // 4. Si existe un campo de texto para "otro" rol, actualiza los iconos al escribir.
    const otroInput = document.querySelector('.otro-input');
    if (otroInput) {
        otroInput.addEventListener('input', updateRolIcons);
    }

    // 5. Llama a la función una vez al cargar para mostrar los iconos de roles preseleccionados.
    updateRolIcons();
});

// --- NAVEGACIÓN ---
// Maneja el evento de clic en el botón para continuar.
const startButton = document.getElementById('star-b');
if (startButton) {
    startButton.addEventListener('click', function() {
        // Redirige al usuario a la página de búsqueda de proyectos.
        window.location.href = 'buscar.html'; 
    });
}