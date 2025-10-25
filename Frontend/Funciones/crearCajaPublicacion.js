export function cajaProducto(publicaciones) {
  const container = document.getElementById("containerProductos");
  if (!container) return;
  publicaciones.forEach((publicacion) => {
    console.log(publicacion);
    const caja = document.createElement("div");
    caja.innerHTML += `
      <div class="producto1-contenedor">
        <h2 class="Principal-producto1">${publicacion.titulo}</h2>    
        <div class="img-wrapper">
          <img src="${publicacion.imagen}" alt="FOTO DE PERFIL" class="foto-de-producto1"></img>
        </div>
        <h2 class="Precio-producto1">$${publicacion.precio}</h2>
      </div>
    `;
    caja.classList.add("claseCajaPublicacion");
    container.appendChild(caja);
    caja.addEventListener("click", (e) => {
      const publicacionActual = localStorage.getItem("publicacionActual");
      if (publicacionActual) {
        localStorage.removeItem("publicacionActual");
      }
      localStorage.setItem("publicacionActual", JSON.stringify(publicacion));
      window.location.href = "/Frontend/Producto/index.html";
    });
  });
}
