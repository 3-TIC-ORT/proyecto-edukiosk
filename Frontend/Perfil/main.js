let modoEdicion = false;
let passwordVisible = false;

const nombreTexto       = document.getElementById("nombreTexto");
const passwordTexto     = document.getElementById("passwordTexto");
const descripcionTexto  = document.getElementById("descripcionTexto");

const nombreInput       = document.getElementById("nombreInput");
const passwordInput     = document.getElementById("passwordInput");
const descripcionInput  = document.getElementById("descripcionInput");

const togglePasswordBtn = document.getElementById("togglePassword");
const toggleEditarBtn   = document.getElementById("toggleEditar");
const guardarBtn        = document.getElementById("guardarBtn");
const editarImagenInput = document.getElementById("editarImagen");
const editarImagenLabel = document.getElementById("editarImagenLabel");
const quitarImagenBtn   = document.getElementById("quitarImagenBtn");
const imagenPerfil      = document.getElementById("imagenPerfil");



// ==== Mostrar / ocultar contraseña ====
togglePasswordBtn.addEventListener("click", () => {
  const real = passwordTexto.dataset.realPassword || "";
  if (passwordVisible) {
    passwordTexto.textContent = "******";
    passwordVisible = false;
  } else {
    passwordTexto.textContent = real;
    passwordVisible = true;
  }
});

// ==== Alternar edición ====
toggleEditarBtn.addEventListener("click", () => {
  modoEdicion = !modoEdicion;

  if (modoEdicion) {
    // rellenar inputs con los datos visibles
    nombreInput.value      = nombreTexto.textContent;
    passwordInput.value    = passwordTexto.dataset.realPassword || "";
    descripcionInput.value = descripcionTexto.textContent;

    nombreTexto.style.display      = "none";
    passwordTexto.style.display    = "none";
    descripcionTexto.style.display = "none";
    togglePasswordBtn.style.display = "none";

    nombreInput.style.display      = "block";
    passwordInput.style.display    = "block";
    descripcionInput.style.display = "block";
    guardarBtn.style.display       = "inline-block";

    editarImagenLabel.style.display = "inline-block";
    quitarImagenBtn.style.display   = "inline-block";

    toggleEditarBtn.innerText = "Cancelar";
  } else {
    nombreTexto.style.display      = "inline";
    passwordTexto.style.display    = "inline";
    descripcionTexto.style.display = "inline";
    togglePasswordBtn.style.display = "inline";

    nombreInput.style.display      = "none";
    passwordInput.style.display    = "none";
    descripcionInput.style.display = "none";
    guardarBtn.style.display       = "none";

    editarImagenLabel.style.display = "none";
    quitarImagenBtn.style.display   = "none";

    toggleEditarBtn.innerText = "Editar";
    passwordTexto.textContent = "******";
    passwordVisible = false;
  }
});

// ==== Guardar cambios ====
guardarBtn.addEventListener("click", () => {
  const userEditado = {
    nombre: nombreInput.value || "Sin nombre",
    password: passwordInput.value || "",
    descripcion: descripcionInput.value || "",
    imagen: imagenPerfil.src
  };

  // Actualizar en pantalla
  nombreTexto.textContent = userEditado.nombre;
  passwordTexto.dataset.realPassword = userEditado.password;
  passwordTexto.textContent = "******";
  descripcionTexto.textContent = userEditado.descripcion;

  // Guardar también en localStorage
  localStorage.setItem("userData", JSON.stringify(userEditado));

  // Mandar al backend
  postEvent("updateUserData", userEditado, (res) => {
    if (res && res.status === "ok") {
      alert("Datos guardados correctamente.");
    } else {
      alert("Error: no se pudieron guardar los datos.");
    }
  });

  toggleEditarBtn.click();
});

// Subir nueva imagen
editarImagenInput.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => { imagenPerfil.src = e.target.result; };
  reader.readAsDataURL(file);
});

// Quitar imagen 
quitarImagenBtn.addEventListener("click", () => {
  imagenPerfil.src = "../../Imagenes/default.png";
  alert("Imagen de perfil restablecida.");
});

// Conexión con backend 
connect2Server();

window.onload = () => {
  // Primero miro si hay datos en localStorage
  const saved = localStorage.getItem("userData");
  if (saved) {
    const data = JSON.parse(saved);
    imagenPerfil.src = data.imagen || "../../Imagenes/default.png";
    nombreTexto.textContent = data.nombre || "Sin nombre";
    passwordTexto.dataset.realPassword = data.password || "";
    passwordTexto.textContent = "******";
    descripcionTexto.textContent = data.descripcion || "Sin descripción";
  } else {
    // Si no hay nada guardado, pido al backend
    postEvent("getUserData", {}, (data) => {
      if (!data) return;
      imagenPerfil.src = data.imagen || "../../Imagenes/default.png";
      nombreTexto.textContent = data.nombre || "Sin nombre";
      passwordTexto.dataset.realPassword = data.password || "";
      passwordTexto.textContent = "******";
      descripcionTexto.textContent = data.descripcion || "Sin descripción";

      // y lo guardo en localStorage también
      localStorage.setItem("userData", JSON.stringify(data));
    });
  }
};
