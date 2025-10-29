import { mensajePopUp, colores } from "../Funciones/popUp.js";

connect2Server(3000);

const actividadContainer = document.querySelector(".actividad-container");

//  FUNCIÓN PARA CREAR TARJETAS 
function crearActividadCard(dato) {
  const card = document.createElement("div");
  card.classList.add("actividad-card");

  const p = document.createElement("p");
  p.innerHTML = `
    <strong>Has publicado</strong> en <strong>${dato.categoria}</strong>:
    "<span>${dato.recurso}</span>"
  `;

  card.appendChild(p);
  card.appendChild(eliminar);
  card.appendChild(icono);

  return card;
}

window.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioSesion"));

  if (!usuario) {
    mensajePopUp("Debes iniciar sesión para ver tus publicaciones", "#e92828ff");
    return;
  }

  // Pedir al backend las publicaciones del usuario logueado
  postEvent(
    "obtenerNotificaciones",
    { email: usuario.email, username: usuario.username },
    (respuesta) => {
      if (respuesta?.success && Array.isArray(respuesta.notificaciones)) {
        actividadContainer.innerHTML = "";
        respuesta.notificaciones.forEach((dato) => {
          const card = crearActividadCard(dato);
          actividadContainer.appendChild(card);
        });
      } else {
        mensajePopUp("No se pudieron cargar las publicaciones", "#e92828ff");
      }
    }
  );
});
