// Comentarios.js

export function cargarComentarios(comentarios) {
  const container = document.getElementById("campoComentarios");
  if (!container) return;
  container.innerHTML = "";
  comentarios.forEach((comentario) => {
    const timestamp = comentario.fecha;
    const dateObject = new Date(timestamp);
    const spanishFormat = dateObject.toLocaleString("es-AR", {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "America/Argentina/Buenos_Aires",
    });
    const comentarioUnico = document.createElement("div");
    comentarioUnico.style.flex;
    comentarioUnico.innerHTML += `
        <div class="comentarios" id="comentario1">
            <h2 class="usuario">${comentario.usuarioPublicador}</h2>
            <h2 class="tiempo">${spanishFormat}</h2>
            <img class="imagen" src="${comentario.fotoUsuarioPublicador}" />
            <h2 class="descripcion">${comentario.comentarioData}</h2>
      </div>
        `;
    container.appendChild(comentarioUnico);
  });
  console.log("Comentarios cargados", comentarios);
}
