export function cajaProducto(publicaciones){
  const container = document.getElementById('containerProductos')
  publicaciones.forEach(publicacion => {    
    const caja = document.createElement('div')
    caja.innerHTML += `
    <a href="/Frontend/Producto/index.html" style="text-decoration: none">
      <h1 class="tituloCaja">${publicacion.titulo}</h1>
      <img class="imagenCaja" src="${publicacion.imagen}" alt="FOTO_PUBLICACION">
      <div class="descripcionCaja">
        <h2>${publicacion.dueño}</h2>
        <h2>${publicacion.materia}</h2>
      </div>
    </a>
    `
    caja.classList.add('claseCajaPublicacion')
    container.appendChild(caja)
  });
}