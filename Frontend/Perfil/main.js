// Importaciones

import { mensajePopUp } from "../Funciones/popUp.js";
import { caracteresProhibidos } from "../Funciones/checkeoSesion.js";
import { fileToBase64 } from "../Funciones/buffer.js"

// Conexión con backend
connect2Server();

let modoEdicion = false;
let passwordVisible = false;

const nombreTexto = document.getElementById("nombreTexto");
const passwordTexto = document.getElementById("passwordTexto");
const descripcionTexto = document.getElementById("descripcionTexto");

const nombreInput = document.getElementById("nombreInput");
const passwordInput = document.getElementById("passwordInput");
const descripcionInput = document.getElementById("descripcionInput");

const togglePasswordBtn = document.getElementById("togglePassword");
const toggleEditarBtn = document.getElementById("toggleEditar");
const guardarBtn = document.getElementById("guardarBtn");
const editarImagenInput = document.getElementById("editarImagen");
const editarImagenLabel = document.getElementById("editarImagenLabel");
const quitarImagenBtn = document.getElementById("quitarImagenBtn");
const imagenPerfil = document.getElementById("imagenPerfil");
const logout = document.getElementById("btnCerrarSesion");

const real = localStorage.getItem("usuarioSesion");
const perfilReal = JSON.parse(real);
let userEditado;

// ==== Rellenar datos iniciales ====

nombreTexto.textContent = perfilReal.username;
descripcionTexto.textContent = perfilReal.description;
imagenPerfil.src = perfilReal.pfp;
passwordTexto.textContent = "******";

// ==== Mostrar / ocultar contraseña ====
togglePasswordBtn.addEventListener("click", () => {
  if (passwordVisible) {
    passwordTexto.textContent = "******";
    passwordVisible = false;
  } else {
    passwordTexto.textContent = perfilReal.contraseña;
    passwordVisible = true;
  }
});

// ==== Alternar edición ====
toggleEditarBtn.addEventListener("click", () => {
  modoEdicion = !modoEdicion;

  if (modoEdicion) {
    // rellenar inputs con los datos visibles
    nombreInput.value = nombreTexto.textContent;
    passwordInput.value = perfilReal.contraseña;
    descripcionInput.value = descripcionTexto.textContent;

    nombreInput.style.display = "block";
    passwordInput.style.display = "block";
    descripcionInput.style.display = "block";
    guardarBtn.style.display = "inline-block";

    toggleEditarBtn.innerText = "Cancelar";
  } else {
    nombreTexto.style.display = "inline";
    passwordTexto.style.display = "inline";
    descripcionTexto.style.display = "inline";
    togglePasswordBtn.style.display = "inline";

    nombreInput.style.display = "none";
    passwordInput.style.display = "none";
    descripcionInput.style.display = "none";
    guardarBtn.style.display = "none";

    toggleEditarBtn.innerText = "Editar";
    passwordTexto.textContent = "******";
    passwordVisible = false;
  }
});

// ==== Guardar cambios ====
guardarBtn.addEventListener("click", () => {
  const tieneCaracterProhibido = caracteresProhibidos.some((char) =>
    nombreInput.value.includes(char)
  );
  const nuevoUsername = nombreInput.value.trim();

  if (nuevoUsername.length >= 15 || tieneCaracterProhibido) {
    mensajePopUp(
      "El nombre de usuario no puede tener más de 15 caracteres ni caracteres especiales.",
      "#e92828ff"
    );
    return;
  }

  postEvent("check", { user: nuevoUsername }, (data) => {
    if (data.success || nuevoUsername === perfilReal.username) {
      const userEditado = {
        email: perfilReal.email,
        username: nuevoUsername,
        contraseña: passwordInput.value,
        pfp: perfilReal.pfp,
        description: descripcionInput.value,
        rating: perfilReal.rating,
      };

      postEvent(
        "guardar",
        {
          user: userEditado.username,
          password: userEditado.contraseña,
          email: userEditado.email,
          pfp: userEditado.pfp,
          rating: userEditado.rating,
          descripcion: userEditado.description,
        },
        (data) => {
          console.log(userEditado);
          if (data && data.success) {
            localStorage.setItem("usuarioSesion", JSON.stringify(userEditado));

            mensajePopUp("Información actualizada con exito", "#28e97dff");
            toggleEditarBtn.click();
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            mensajePopUp("Error al actualizar la información", "#e92828ff");
          }
        }
      );
    } else {
      mensajePopUp(
        "El nombre de usuario que intentó ingresar se encuentra en uso",
        "#e92828ff"
      );
      return;
    }
  });
});

// Subir nueva imagen

editarImagenInput.addEventListener("change", (e) => {
  const file = e.target.files;
  fileToBase64(file[0]).then((base64) => {
    postEvent(
      "cambiarFoto",
      {
        email: perfilReal.email,
        file: base64,
      },
      (data) => {
        if (data && data.success) {
          imagenPerfil.src = data.ruta;
          perfilReal.pfp = data.ruta;
          localStorage.setItem("usuarioSesion", JSON.stringify(perfilReal));

          mensajePopUp("Foto de perfil modifcada", "#28e97dff");
        } else {
          mensajePopUp("Error al subir imagen", "#e92828ff");
        }
      }
    );
  });
});

// Quitar imagen

quitarImagenBtn.addEventListener("click", () => {
  imagenPerfil.src = "../../Imagenes/default.png";
  alert("Imagen de perfil restablecida.");
});
