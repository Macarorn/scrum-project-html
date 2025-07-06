document.querySelectorAll('.toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.toggle').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      const showEpicas = btn.textContent.trim() === 'Épicas';
      document.querySelector('.epica-grid').classList.toggle('hidden', !showEpicas);
      document.querySelector('.documento-grid').classList.toggle('hidden', showEpicas);
    });
  });
  