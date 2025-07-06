
// MANEJO DEL ESTADO ACTIVO
// =================================

// Selecciona todos los elementos con la clase 'menu-item' dentro de '.sidebar-menu'.
const menuItems = document.querySelectorAll('.sidebar-menu .menu-item');

// Itera sobre cada ítem del menú para agregarle un event listener.
menuItems.forEach(item => {
    // Agrega un listener para el evento 'click'.
    item.addEventListener('click', function() {
        // Cuando se hace clic en un ítem:

        // 1. Se remueve la clase 'active' de todos los ítems del menú.
        //    Esto asegura que solo un ítem esté activo a la vez.
        menuItems.forEach(i => i.classList.remove('active'));
        
        // 2. Se añade la clase 'active' al ítem que fue clickeado ('this').
        //    Esto resalta visualmente el ítem seleccionado.
        this.classList.add('active');
    });
});