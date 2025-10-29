import { mensajePopUp, colores } from "../Funciones/popUp.js";

connect2Server(3000);

const actividadContainer = document.querySelector(".actividad-container");

//  FUNCIÓN PARA CREAR TARJETAS 
function crearActividadCard(dato) {
  if (dato == "") {
    const card = document.createElement("div");
    card.innerText = "No hay notificaciones por el momento. :(";
  }
  const card = document.createElement("div");
  card.classList.add("actividad-card");

  const p = document.createElement("p");
  p.innerHTML = `
  ${dato}
  `;

  card.appendChild(p);
  return card;
}

//CARGAR PUBLICACIONES DEL USUARIO
window.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioSesion"));

  if (!usuario) {
    mensajePopUp("Debes iniciar sesión para ver tus publicaciones", colores.error);
    return;
  }

  // Pedir al backend las publicaciones del usuario logueado
  postEvent(
    "obtenerNotificaciones",
    usuario,
    (res) => {
      if (res.success && Array.isArray(res.notificaciones)) {
        actividadContainer.innerHTML = "";
        res.notificaciones.forEach((notificacion) => {
          const card = crearActividadCard(notificacion);
          actividadContainer.appendChild(card);
        });
      } else {
        mensajePopUp("No se pudieron cargar las publicaciones", colores.error);
      }
    }
  );
});
localStorage.getItem("usuarioSesion");