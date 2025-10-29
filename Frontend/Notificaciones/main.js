import { mensajePopUp, colores } from "../Funciones/popUp.js";

connect2Server(3000);

const actividadContainer = document.querySelector(".actividad-container");

//  FUNCIÓN PARA CREAR TARJETAS
function crearActividadCard(dato, usuario) {
  const card = document.createElement("div");
  card.classList.add("actividad-card");

  const p = document.createElement("p");
  p.textContent = dato;
  const eliminar = document.createElement("button");
  eliminar.addEventListener("click", (e) => {
    e.stopPropagation();
    postEvent("descartarNotificacion", { dato, usuario }, (res) => {
      if (res && res.success) {
        card.remove();
      }
      else {
        mensajePopUp('Error al descartar', colores.error)
      }
    });
  });
  const imagen = document.createElement("img");
  imagen.src = "/Imagenes/IconoBasura.png";
  imagen.classList.add("icono-eliminar");

  card.appendChild(p);
  card.appendChild(eliminar);
  eliminar.appendChild(imagen);

  return card;
}

window.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioSesion"));

  // Pedir al backend las publicaciones del usuario logueado
  postEvent(
    "obtenerNotificaciones",
    { email: usuario.email, username: usuario.username },
    (respuesta) => {
      if (respuesta?.success && Array.isArray(respuesta.notificaciones)) {
        actividadContainer.innerHTML = "";
        respuesta.notificaciones.forEach((dato) => {
          const card = crearActividadCard(dato, usuario);
          actividadContainer.appendChild(card);
        });
      } else {
        mensajePopUp("No se pudieron cargar las publicaciones", colores.error);
      }
    }
  );
});
