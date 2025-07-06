// --- CONFIGURACIÓN DE ICONOS ---

// Lista de clases de iconos (de BoxIcons) que se usarán en la animación.
const scrumIcons = [
    'bx-group',        // Icono para Equipo
    'bx-task',         // Icono para Tarea
    'bx-check-circle', // Icono para Checklist
    'bx-time',         // Icono para Tiempo
    'bx-repeat',       // Icono para Ciclo o Repetición
    'bx-note',         // Icono para Nota
    'bx-list-ul',      // Icono para Lista
    'bx-user-check',   // Icono para Usuario Asignado
];

const iconElements = []; // Array para almacenar los elementos de los iconos creados.
const iconCount = 200;   // Número total de iconos que se mostrarán en el fondo.

// --- CREACIÓN Y ESTILO DE ICONOS ---

// Bucle para crear cada icono y asignarle propiedades aleatorias para su animación.
for (let i = 0; i < iconCount; i++) {
    const icon = document.createElement('i');
    // Asigna las clases de BoxIcons y una clase personalizada para estilizar.
    icon.className = `bx ${scrumIcons[i % scrumIcons.length]} scrum-icon`;

    // Asigna atributos de datos para definir la trayectoria elíptica de cada icono.
    icon.dataset.centerX = Math.random() * window.innerWidth;
    icon.dataset.centerY = Math.random() * window.innerHeight;
    icon.dataset.radiusX = 120 + Math.random() * (window.innerWidth / 2 - 140); // Radio horizontal
    icon.dataset.radiusY = 80 + Math.random() * (window.innerHeight / 2 - 100);  // Radio vertical
    icon.dataset.phase = Math.random() * Math.PI * 2; // Fase inicial para desincronizar los movimientos
    icon.dataset.speed = (0.12 + Math.random() * 0.25).toFixed(3); // Velocidad de movimiento

    document.body.appendChild(icon);
    iconElements.push(icon);
}

// Inyecta dinámicamente los estilos CSS necesarios para los iconos animados.
const style = document.createElement('style');
style.innerHTML = `
.scrum-icon {
    position: fixed; /* Posición fija para que no se desplacen con el scroll */
    font-size: 2.7rem;
    opacity: 0.22;
    pointer-events: none; /* Los iconos no deben ser interactivos */
    z-index: 0; /* Se sitúan en el fondo */
    color: rgb(12, 143, 21); /* Color verde */
    filter: blur(0.2px);
    will-change: transform; /* Optimización del rendimiento de la animación */
    transition: filter 0.3s;
    left: 0; top: 0;
}
`;
document.head.appendChild(style);

// --- FUNCIÓN DE ANIMACIÓN ---

/**
 * @function animateIcons
 * @description Calcula la nueva posición de cada icono en cada frame de la animación.
 * @param {number} time - El tiempo actual proporcionado por requestAnimationFrame.
 */
function animateIcons(time) {
    iconElements.forEach((icon, idx) => {
        // Obtiene los parámetros de la trayectoria desde los atributos de datos.
        const centerX = parseFloat(icon.dataset.centerX);
        const centerY = parseFloat(icon.dataset.centerY);
        const radiusX = parseFloat(icon.dataset.radiusX);
        const radiusY = parseFloat(icon.dataset.radiusY);
        const phase = parseFloat(icon.dataset.phase);
        const speed = parseFloat(icon.dataset.speed);
        
        // Calcula el ángulo actual para la posición en la elipse.
        const angle = phase + time * 0.00018 * speed + idx;
        const x = centerX + Math.cos(angle) * radiusX;
        const y = centerY + Math.sin(angle) * radiusY;

        // Aplica la nueva posición al icono usando transform para un mejor rendimiento.
        icon.style.transform = `translate(${x}px, ${y}px)`;
    });

    // Solicita el siguiente frame de animación.
    requestAnimationFrame(animateIcons);
}

// --- INICIALIZACIÓN ---

// Inicia el bucle de animación.
animateIcons(0);

