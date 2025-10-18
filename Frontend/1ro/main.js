import { mensajePopUp, colores } from "../Funciones/popUp.js";
import { cajaProducto } from "../Funciones/crearCajaPublicacion.js";
import { aplicarFiltros } from "../Funciones/filtrado.js";

const selMateria = document.getElementById("materia");
const selRecurso = document.getElementById("recurso");
const selEspecialidad = document.getElementById('especialidad');
const barraBuscar = document.getElementById("buscar");
const containerProductos = document.getElementById("containerProductos");

connect2Server(3000);

let publicaciones = [];
const grado = "1°";

postEvent("obtenerPublicaciones", grado, (res) => {
  if (res && res.success) {
    publicaciones = res.publicacionesAño;
    console.log(publicaciones);
    cajaProducto(publicaciones);
    localStorage.setItem("publicaciones", JSON.stringify(publicaciones));
  } else {
    mensajePopUp("Error al importar publicaciones", colores.error);
  }
});

selMateria.addEventListener("change", (e) => {
  e.preventDefault();
  aplicarFiltros(
    publicaciones,
    selMateria,
    selRecurso,
    selEspecialidad,
    barraBuscar,
    cajaProducto,
    containerProductos
  );
});

selRecurso.addEventListener("change", (e) => {
  e.preventDefault();
  aplicarFiltros(
    publicaciones,
    selMateria,
    selRecurso,
    selEspecialidad,
    barraBuscar,
    cajaProducto,
    containerProductos
  );
});

barraBuscar.addEventListener("input", (e) => {
  e.preventDefault();
  aplicarFiltros(
    publicaciones,
    selMateria,
    selRecurso,
    selEspecialidad,
    barraBuscar,
    cajaProducto,
    containerProductos
  );
});
