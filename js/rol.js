// rol.js: Interacciones para la página de rol

document.addEventListener('DOMContentLoaded', function() {
  // --- Sidebar: cambio de color al hacer hover y selección ---
  const sidebarIcons = document.querySelectorAll('.sidebar .icon');
  sidebarIcons.forEach(icon => {
    icon.addEventListener('click', function() {
      sidebarIcons.forEach(i => i.classList.remove('selected'));
      this.classList.add('selected');
    });
  });

  // --- Foto de perfil: subir imagen PNG/JPG ---
  const profilePic = document.getElementById('profilePic');
  const profileInput = document.getElementById('profileInput');
  const profileImg = document.getElementById('profileImg');
  const profileInitials = document.getElementById('profileInitials');

  profilePic.addEventListener('click', () => profileInput.click());
  profileInput.addEventListener('change', function() {
    if (this.files && this.files[0]) {
      const reader = new FileReader();
      reader.onload = function(e) {
        profileImg.src = e.target.result;
        profileImg.style.display = 'block';
        profileInitials.style.display = 'none';
        localStorage.setItem('profileImg', e.target.result);
      };
      reader.readAsDataURL(this.files[0]);
    }
  });
  // Cargar imagen guardada
  const savedImg = localStorage.getItem('profileImg');
  if (savedImg) {
    profileImg.src = savedImg;
    profileImg.style.display = 'block';
    profileInitials.style.display = 'none';
  }

  // --- Campos editables: guardar en localStorage ---
  ['expTag','skillTag','dateTag'].forEach(id => {
    const el = document.getElementById(id);
    const saved = localStorage.getItem(id);
    if (saved) el.textContent = saved;
    el.addEventListener('input', function() {
      localStorage.setItem(id, this.textContent);
    });
  });

  // --- Carrusel de equipo: agregar y eliminar miembros ---
  const teamCarousel = document.getElementById('teamCarousel');
  const addMemberBtn = document.getElementById('addMemberBtn');
  const removeMemberBtn = document.getElementById('removeMemberBtn');

  // Guardar y cargar miembros dinámicos del equipo
  let dynamicMembers = [];
  const savedDynamic = localStorage.getItem('dynamicMembers');
  if (savedDynamic) dynamicMembers = JSON.parse(savedDynamic);

  // Renderizar miembros iniciales (los fijos)
  function renderInitialMembers() {
    // Si ya hay miembros fijos, no volver a agregarlos
    if (teamCarousel.querySelectorAll('.team-member.fixed').length > 0) return;
    // Agrega los miembros fijos (los que aparecen por defecto en el HTML)
    // Si quieres que sean dinámicos, puedes definirlos aquí
  }

  // Renderizar miembros dinámicos
  function renderDynamicMembers() {
    // Elimina todos los miembros dinámicos previos
    teamCarousel.querySelectorAll('.team-member.dynamic').forEach(el => el.remove());
    // Agrega los miembros dinámicos al final
    dynamicMembers.forEach(name => {
      teamCarousel.insertAdjacentHTML('beforeend', `
        <div class="team-member dynamic">
          <div class="team-avatar">
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="19" cy="19" r="18" stroke="#00304D" stroke-width="3" fill="#fff"/>
              <circle cx="19" cy="13" r="5" fill="#00304D"/>
              <path d="M8 30c0-5.5 4.5-10 10-10s10 4.5 10 10" fill="#00304D"/>
            </svg>
          </div>
          <div class="team-name">${name}</div>
        </div>
      `);
    });
  }

  // Renderizar todo el equipo
  function renderTeam() {
    renderInitialMembers();
    renderDynamicMembers();
  }

  addMemberBtn.addEventListener('click', function() {
    const name = prompt('Nombre del nuevo miembro:');
    if (name && name.trim() !== '') {
      dynamicMembers.push(name.trim());
      localStorage.setItem('dynamicMembers', JSON.stringify(dynamicMembers));
      renderDynamicMembers();
      // Scroll al final si hay overflow horizontal
      teamCarousel.scrollLeft = teamCarousel.scrollWidth;
    }
  });

  removeMemberBtn.addEventListener('click', function() {
    if (dynamicMembers.length > 0) {
      dynamicMembers.pop();
      localStorage.setItem('dynamicMembers', JSON.stringify(dynamicMembers));
      renderDynamicMembers();
    }
  });

  // Renderizar miembros al cargar
  renderTeam();

  // --- Menú de tres puntos en otros grupos ---
  document.querySelectorAll('.group-menu').forEach(menuBtn => {
    menuBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      document.querySelectorAll('.group-menu').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.edit-menu').forEach(menu => menu.classList.remove('show'));
      this.classList.toggle('active');
      this.nextElementSibling.classList.toggle('show');
    });
  });
  document.body.addEventListener('click', function() {
    document.querySelectorAll('.group-menu').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.edit-menu').forEach(menu => menu.classList.remove('show'));
  });
  document.querySelectorAll('.edit-menu').forEach(menu => {
    menu.addEventListener('click', function(e) { e.stopPropagation(); });
  });

  // --- Botón + para crear grupo ---
  const addGroupBtn = document.getElementById('addGroupBtn');
  const groupsList = document.getElementById('groupsList');
  if (addGroupBtn && groupsList) {
    addGroupBtn.addEventListener('click', function() {
      const name = prompt('Nombre del nuevo grupo:');
      if (name) {
        const card = document.createElement('div');
        card.className = 'group-card';
        card.style.minWidth = '180px';
        card.style.maxWidth = '200px';
        card.style.margin = '0';
        card.style.paddingLeft = '10px';
        card.style.position = 'relative';
        card.innerHTML = `
          <div class="group-header" style="display: flex; align-items: flex-start; justify-content: space-between; position: relative; width: 100%;">
            <div class="group-avatars">
              <img src="https://randomuser.me/api/portraits/men/34.jpg" alt="">
              <img src="https://randomuser.me/api/portraits/women/46.jpg" alt="">
            </div>
            <button class="group-menu material-icons" title="Opciones" style="background: none; border: none; font-size: 1.6rem; cursor: pointer; color: #00304D;">more_vert</button>
            <div class="edit-menu" style="display: none; position: absolute; top: 28px; right: 0; background: #fff; border: 1px solid #EDEDED; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); z-index: 2;">
              <button class="delete-group-btn" style="color: #d32f2f; background: none; border: none; font-size: 15px; padding: 6px 18px; cursor: pointer;">Eliminar</button>
            </div>
          </div>
          <div class="group-title" style="margin-left: 10px;">${name}</div>
          <div class="group-epic" style="margin-left: 10px;">Épica</div>
          <div class="group-progress">
            <span>65%</span>
            <span>35%</span>
          </div>
        `;
        groupsList.insertBefore(card, addGroupBtn);
        card.querySelector('.group-menu').addEventListener('click', function(e) {
          e.stopPropagation();
          document.querySelectorAll('.group-menu').forEach(btn => btn.classList.remove('active'));
          document.querySelectorAll('.edit-menu').forEach(menu => menu.classList.remove('show'));
          this.classList.toggle('active');
          this.nextElementSibling.style.display = this.classList.contains('active') ? 'block' : 'none';
        });
        card.querySelector('.edit-menu').addEventListener('click', function(e) { e.stopPropagation(); });
        card.querySelector('.delete-group-btn').addEventListener('click', function() {
          card.remove();
        });
      }
    });
  }

});
