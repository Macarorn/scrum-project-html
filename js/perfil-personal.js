// perfil-personal.js: Interacciones para la página de perfil personal

document.addEventListener('DOMContentLoaded', function() {
  // --- Foto de perfil: subir imagen PNG/JPG (idéntico a rol.js) ---
  const profilePic = document.getElementById('profilePic');
  const profileInput = document.getElementById('profileInput');
  const profileImg = document.getElementById('profileImg');
  const profileInitials = document.getElementById('profileInitials');

  if (profilePic && profileInput && profileImg && profileInitials) {
    profilePic.addEventListener('click', () => profileInput.click());
    profileInput.addEventListener('change', function() {
      if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
          profileImg.src = e.target.result;
          profileImg.style.display = 'block';
          profileInitials.style.display = 'none';
          localStorage.setItem('profileImgPersonal', e.target.result);
        };
        reader.readAsDataURL(this.files[0]);
      }
    });
    // Cargar imagen guardada
    const savedImg = localStorage.getItem('profileImgPersonal');
    if (savedImg) {
      profileImg.src = savedImg;
      profileImg.style.display = 'block';
      profileInitials.style.display = 'none';
    }
  }

  // --- Edición de campos del perfil ---
  const editBtn = document.querySelector('.profile-user-edit-btn');
  const saveBtn = document.querySelector('.save-btn');
  const inputs = document.querySelectorAll('.profile-user-info-row input');

  // Cargar datos guardados al iniciar
  const profileFields = [
    'Nombre', 'Apellidos', 'Correo electronico', 'Numero de celular',
    'dirección de residencia', 'País de residencia', 'Ciudad', 'Departamento'
  ];
  inputs.forEach((input, i) => {
    const key = 'perfil_' + profileFields[i];
    const saved = localStorage.getItem(key);
    if (saved) input.value = saved;
  });

  editBtn.addEventListener('click', function() {
    inputs.forEach(input => input.disabled = false);
    saveBtn.style.display = 'inline-block';
    editBtn.style.display = 'none';
  });

  saveBtn.addEventListener('click', function() {
    inputs.forEach((input, i) => {
      input.disabled = true;
      localStorage.setItem('perfil_' + profileFields[i], input.value);
    });
    saveBtn.style.display = 'none';
    editBtn.style.display = 'inline-flex';
  });

  // Inicialmente ocultar el botón de guardar
  saveBtn.style.display = 'none';

  // --- Privacidad: alternar colores entre privada/pública ---
  const privateOption = document.querySelector('.privacy-option');
  const publicOption = document.querySelector('.privacy-option.privacy-public');
  const privateSwitch = privateOption.querySelector('input[type="checkbox"]');
  const publicSwitch = publicOption.querySelector('input[type="checkbox"]');
  const privateLabel = privateOption.querySelector('span');
  const publicLabel = publicOption.querySelector('span');
  const privateDesc = privateOption.querySelectorAll('span')[1];
  const publicDesc = publicOption.querySelectorAll('span')[1];

  function setPrivacy(isPrivate) {
    if (isPrivate) {
      privateLabel.style.color = '#39A900';
      privateLabel.style.fontWeight = '700';
      privateDesc.style.color = '#39A900';
      publicLabel.style.color = '#888';
      publicLabel.style.fontWeight = '700';
      publicDesc.style.color = '#888';
      privateSwitch.checked = true;
      publicSwitch.checked = false;
    } else {
      privateLabel.style.color = '#888';
      privateLabel.style.fontWeight = '700';
      privateDesc.style.color = '#888';
      publicLabel.style.color = '#39A900';
      publicLabel.style.fontWeight = '700';
      publicDesc.style.color = '#39A900';
      privateSwitch.checked = false;
      publicSwitch.checked = true;
    }
  }

  // Inicializar estado
  setPrivacy(privateSwitch.checked);

  privateSwitch.addEventListener('change', function() {
    setPrivacy(true);
  });
  publicSwitch.addEventListener('change', function() {
    setPrivacy(false);
  });
});
