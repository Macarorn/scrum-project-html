// MANEJO DEL ESTADO ACTIVO
// =================================
const menuItems = document.querySelectorAll('.sidebar-menu .menu-item');

// Itera sobre cada ítem del menú para agregarle un event listener.
menuItems.forEach(item => {
    item.addEventListener('click', function() {
        menuItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});