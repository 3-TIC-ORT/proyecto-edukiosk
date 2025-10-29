import { mensajePopUp } from "../Funciones/popUp.js";

connect2Server(3000);

const actividadContainer = document.querySelector(".actividad-container");

function crearNotificacionCard(texto) {
  const card = document.createElement("div");
  card.classList.add("actividad-card");

  const p = document.createElement("p");
  p.textContent = texto;

  const eliminar = document.createElement("div");
  eliminar.classList.add("accion");
  eliminar.textContent = "Eliminar notificación";

  const icono = document.createElement("img");
  icono.src = "../../Imagenes/IconoBasura.png";
  icono.alt = "Eliminar";
  icono.classList.add("icono-eliminar");

  eliminar.addEventListener("click", () => {
    card.remove();
  });

  card.appendChild(p);
  card.appendChild(eliminar);
  card.appendChild(icono);

  return card;
}

window.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioSesion"));

  if (!usuario) {
    mensajePopUp("Debes iniciar sesión para ver tus notificaciones", "#e92828ff");
    return;
  }

  actividadContainer.innerHTML = "";

  //Datos simulados como si vinieran del backend
  const notificaciones = [
    `${usuario.user || "rocco"} ha solicitado tu Resumen, "auuuuuuu"`,
    `${usuario.user || "rocco"} ha solicitado tu Resumen, "lobo"`,
    `Matías ha comentado en tu publicación "Resumen Historia Judía de 3° Año": “Muy completo, gracias!”`
  ];

  const solicitudes = [
    1761568508749,
    1761652086265
  ];

  notificaciones.forEach((texto) => {
    const card = crearNotificacionCard(texto);
    actividadContainer.appendChild(card);
  });

  solicitudes.forEach((id) => {
    const card = crearNotificacionCard(`Has recibido una nueva solicitud (ID: ${id})`);
    actividadContainer.appendChild(card);
  });

  if (notificaciones.length === 0 && solicitudes.length === 0) {
    actividadContainer.innerHTML = `<p style="font-size:22px; color:#444;">No tienes notificaciones nuevas.</p>`;
  }
});
