// Comentarios.js

export function cargarComentarios(comentarios) {
  const container = document.getElementById("campoComentarios");
  if (!container) return;
  comentarios.forEach((comentario) => {
    const timestamp = comentario.fecha;
    const dateObject = new Date(timestamp);
    const spanishFormat = dateObject.toLocaleString("es-AR", {
      month: "short", // 'oct' (short for octubre)
      day: "2-digit", // '28'
      hour: "2-digit", // '19'
      minute: "2-digit", // '40'
      hour12: false, // Force 24-hour format
      timeZone: "America/Argentina/Buenos_Aires", // Keep the original time zone
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
