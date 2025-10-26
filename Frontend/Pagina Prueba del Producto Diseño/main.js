import { mensajePopUp } from "../Funciones/popUp.js";

connect2Server(3000);

document.addEventListener("DOMContentLoaded", () => {
  const inputComentario = document.getElementById("nuevoComentario");
  const btnComentar = document.getElementById("btnComentar");
  const listaComentarios = document.getElementById("comentariosLista");

  const titulo = document.getElementById("Titulo").textContent.trim();
  const dueño = document.getElementById("Contacto")?.textContent || "Desconocido";
  const fecha = Date.now();mp
  const idPublicacion = `${dueño}-${titulo}-${fecha}`;

  let usuario = "Anónimo";
  try {
    const userObj = JSON.parse(localStorage.getItem("usuarioSesionObj"));
    if (userObj?.username) usuario = userObj.username;
    else if (userObj?.nombre) usuario = userObj.nombre;
  } catch {
    usuario =
      localStorage.getItem("usuarioSesion") ||
      localStorage.getItem("usuario") ||
      "Anónimo";
  }

  function escapeHtml(unsafe) {
    return String(unsafe)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function renderizarComentarios(comentarios) {
    listaComentarios.innerHTML = "";
    comentarios.forEach((c) => {
      const div = document.createElement("div");
      div.classList.add("comentario");
      div.innerHTML = `
        <p><strong>${escapeHtml(c.autor)}</strong></p>
        <p>${escapeHtml(c.texto)}</p>
      `;
      listaComentarios.appendChild(div);
    });
  }

  postEvent("obtenerComentarios", { idPublicacion }, (respuesta) => {
    if (respuesta?.success && Array.isArray(respuesta.comentarios)) {
      renderizarComentarios(respuesta.comentarios);
    } else {
      mensajePopUp("⚠️ No se pudieron cargar los comentarios", "#e92828ff");
    }
  });

  btnComentar.addEventListener("click", () => {
    const texto = inputComentario.value.trim();

    if (!texto) {
      mensajePopUp("⚠️ Escribe un comentario antes de enviarlo", "#e92828ff");
      return;
    }

    const nuevoComentario = {
      idPublicacion,
      autor: usuario,
      texto,
      fecha: Date.now(),
    };

    console.log("📤 Enviando comentario:", nuevoComentario);

    postEvent("guardarComentario", nuevoComentario, (respuesta) => {
      if (respuesta?.success && Array.isArray(respuesta.comentariosActualizados)) {
        renderizarComentarios(respuesta.comentariosActualizados);
        mensajePopUp("✅ Comentario enviado correctamente", "#28a745");
        inputComentario.value = "";
      } else {
        mensajePopUp("❌ Error al enviar comentario", "#e92828ff");
      }
    });
  });
});