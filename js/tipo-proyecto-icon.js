// Diccionario de tipos de proyecto y su icono correspondiente
const tipoProyectoIcons = {
    "software": "bx-code-alt",                // Código
    "marketing": "bx-bullseye",               // Objetivo
    "evento": "bx-calendar-event",            // Calendario
    "educativo": "bx-book",                   // Libro
    "investigacion": "bx-search-alt-2",       // Lupa
    "startup": "bx-rocket",                   // Cohete
    "infraestructura": "bx-building",         // Edificio
    "diseno": "bx-paint",                     // Pincel
    "finanzas": "bx-bar-chart-alt-2",         // Gráfica
    "recursos-humanos": "bx-id-card",         // Credencial
    "logistica": "bx-package",                // Paquete
    "sustentabilidad": "bx-leaf",             // Hoja
    "salud": "bx-first-aid",                  // Botiquín
    "legal": "bx-folder-open",                // Carpeta
    "otro": "bx-briefcase"                    // Portafolio
};

// Elementos del DOM para selección y visualización de icono
const tipoSelect = document.getElementById('tipo-proyecto-select');
const tipoIconContainer = document.getElementById('tipo-proyecto-icon-container');

// Cambia el icono mostrado según el tipo de proyecto seleccionado
tipoSelect.addEventListener('change', function() {
    tipoIconContainer.innerHTML = ""; // Limpia el contenedor
    const value = tipoSelect.value;
    if (tipoProyectoIcons[value]) {
        const icon = document.createElement('i');
        icon.className = `bx ${tipoProyectoIcons[value]} tipo-proyecto-animated-icon`;
        tipoIconContainer.appendChild(icon);
    }
});

// Botón para continuar al siguiente paso
document.getElementById('btn-siguiente').addEventListener('click', function() {
    window.location.href = 'team-scrum.html';
});