// Firebase config
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_DOMINIO.firebaseapp.com",
  projectId: "TU_PROYECTO_ID",
  storageBucket: "TU_PROYECTO_ID.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Google Sign-In
document.getElementById("googleLoginBtn").addEventListener("click", () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      alert(`Bienvenido, ${user.email}`);
      // Aquí podrías redirigir o guardar el login
    })
    .catch(error => {
      console.error(error);
      alert("Error al iniciar sesión con Google");
    });
});

// Mostrar formulario de registro
document.getElementById("showRegister").addEventListener("click", () => {
  window.location.href = "indexsu.html"; // asegúrate de tener esa página
});

// Login normal con correo/contraseña
document.getElementById("loginBtn").addEventListener("click", () => {
  // Para la maquetación, al hacer clic se redirige directamente a la página de creación de proyectos.
  window.location.href = "../html/crear-proyect.html";  

  /* --- CÓDIGO DE AUTENTICACIÓN ORIGINAL (PARA USO FUTURO) ---
    auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        alert("Inicio de sesión exitoso");
        window.location.href = "crear-proyect.html";
      })
      .catch(error => {
        alert("Correo o contraseña incorrectos: " + error.message);
      });
  */
});

document.addEventListener('DOMContentLoaded', function() {
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      // Obtén los valores del formulario
      const email = document.getElementById('reg-email').value;
      const password = document.getElementById('reg-password').value;
      const confirmPassword = document.getElementById('confirm-password').value;

      if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }

      try {
        // Lógica de registro (por ejemplo, con Firebase)
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        // Redirige a la página de registro exitoso
        window.location.href = 'indexsu.html';
      } catch (error) {
        alert('Error en el registro: ' + error.message);
      }
    });
  }
});
