import { mensajePopUp, colores } from "../Funciones/popUp.js";
import { caracteresProhibidos } from "../Funciones/checkeoSesion.js";
import { fileToBase64 } from "../Funciones/buffer.js";
import { cajaProducto } from "../Funciones/crearCajaPublicacion.js";
import { validarNumeroTelefono } from "../Funciones/validarNumTel.js"
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

const containerProductos = document.getElementById("containerProductos");

const real = localStorage.getItem("usuarioSesion");
const perfilReal = JSON.parse(real);
let userEditado;
let publicaciones = [];

postEvent("obtenerPublicacionesPerfil", perfilReal, (res) => {
  if (res && res.success) {
    cajaProducto(res.publicacionesPropias);
    publicaciones = res.publicacionesPropias;
    botonesBorrar();
  } else {
    mensajePopUp("Error al importar productos", colores.error);
  }
});
function botonesBorrar() {
  const cajasDePublicacion = document.querySelectorAll(".claseCajaPublicacion");
  cajasDePublicacion.forEach((caja, i) => {
    const pub = publicaciones[i];
    const but = document.createElement("button");

    caja.style.position = "relative";
    // 2. Ensure the parent acts like a predictable container (Block element)
    //    This is crucial if the external CSS sets 'display: contents' or 'flex'.
    caja.style.display = "block";
    // --- FIX END ---

    but.textContent = "X";
    but.style.backgroundColor = colores.error;
    but.style.color = "#FFFFFF";
    but.classList.add("botonBorrar");
    caja.appendChild(but);

    // Styling the button itself (retaining absolute position logic)
    but.style.position = "absolute";
    but.style.top = "5px";
    but.style.left = "5px";
    but.style.zIndex = "10";
    but.style.width = "50px";
    but.style.height = "50px";
    but.style.padding = "0";
    but.style.borderRadius = "10px";

    // FIX 2: Set the positioning context for the button's parent
    // NOTE: This style should ideally be in CSS, but included here for completeness
    // If you prefer to keep your main CSS clean, you can put this style in the CSS file:
    // .claseCajaPublicacion { position: relative; }
    caja.style.position = "relative";
    caja.appendChild(but);

    but.addEventListener("click", () => {
      postEvent("borrarPublicacion", pub.fecha, (res) => {
        if (res && res.success) {
          publicaciones[i] = "";
          mensajePopUp("¡Publicación borrada con exito!", colores.exito);
          caja.remove();
        } else {
          mensajePopUp(
            "Ocurrio un error al borrar la publicación.",
            colores.error
          );
        }
      });
    });
  });
}

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
  const sessionJSON = localStorage.getItem("usuarioSesion");
  if (!sessionJSON) {
    mensajePopUp("Error: Sesión no encontrada.", "#e92828ff");
    return;
  }
  const perfilReal = JSON.parse(sessionJSON);
  console.log(perfilReal.username);
  postEvent(
    "resetPFP",
    {
      email: perfilReal.email,
      pfp: "/Imagenes/fotosPerfil/defaultPerfil.jpg",
    },
    (data) => {
      if (data && data.success) {
        perfilReal.pfp = "/Imagenes/fotosPerfil/defaultPerfil.jpg";
        localStorage.setItem("usuarioSesion", JSON.stringify(perfilReal));

        imagenPerfil.src = "../../Imagenes/fotosPerfil/defaultPerfil.jpg";
        mensajePopUp("Imagen de perfil restablecida.", "#28e97dff");
      } else {
        mensajePopUp("Error al restablecer la imagen de perfil.", "#e92828ff");
      }
    }
  );
});

// Cerrar sesión

logout.addEventListener("click", (e) => {
  localStorage.clear("usuarioSesion");
  mensajePopUp("Sesion Cerrada", "#e92828ff");
  setTimeout(() => {
    window.location.reload();
  }, 1000);
});
