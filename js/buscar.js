// --- DATOS DE PROYECTOS ---
// Array de objetos que contiene la información de los proyectos a mostrar.
// Cada objeto tiene un `nombre` para mostrar y una clase de `icono` de BoxIcons.
const proyectos = [
    { nombre: "Viajes", icono: "bx-world" },
    { nombre: "Blog personal", icono: "bx-pencil" },
    { nombre: "Portafolio", icono: "bx-briefcase" },
    { nombre: "Inmobiliaria", icono: "bx-home" },
    { nombre: "Música", icono: "bx-music" },
    { nombre: "Noticias", icono: "bx-news" },
    { nombre: "Salud", icono: "bx-heart" },
    { nombre: "Educación", icono: "bx-book" },
    { nombre: "Eventos", icono: "bx-calendar-event" },
    { nombre: "Arte", icono: "bx-palette" }
];

// --- FUNCIÓN PARA MOSTRAR PROYECTOS ---
// Renderiza dinámicamente las tarjetas de proyectos en el DOM.
// Itera sobre el array `proyectos` y crea un elemento HTML para cada uno.
function mostrarProyectos() {
    const grid = document.getElementById("proyectos-grid");
    grid.innerHTML = ""; // Limpia la cuadrícula antes de añadir nuevos elementos.
    proyectos.forEach(p => {
        const card = document.createElement("div");
        card.className = "proyecto-card";
        card.innerHTML = `
            <i class='bx ${p.icono} proyecto-icon'></i>
            <div class="proyecto-nombre">${p.nombre}</div>
        `;
        grid.appendChild(card);
    });
}

// --- INICIALIZACIÓN ---
// Llama a `mostrarProyectos` cuando el script se carga para poblar la página.
mostrarProyectos();

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.proyecto-card');
    const siguienteBtn = document.getElementById('siguiente-btn');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Quitar la clase 'selected' de cualquier otra tarjeta
            cards.forEach(c => c.classList.remove('selected'));

            // Añadir la clase 'selected' a la tarjeta clicada
            card.classList.add('selected');

            // Mostrar el botón de siguiente
            siguienteBtn.classList.add('visible');
        });
    });

    // Redirigir al hacer clic en el botón "Siguiente"
    siguienteBtn.addEventListener('click', () => {
        window.location.href = 'Entrar-proyecto.html';
    });
});