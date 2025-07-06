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

// En js/entrar-proyecto.js, al final añade:
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // Actualizar estado activo de las pestañas
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Mostrar/ocultar contenidos
      document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
      document.getElementById(btn.dataset.tab).classList.remove('hidden');
    });
  });

  function previewImage(input) {
    const img = input.parentElement.querySelector("img");
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => (img.src = e.target.result);
      reader.readAsDataURL(input.files[0]);
    }
  }