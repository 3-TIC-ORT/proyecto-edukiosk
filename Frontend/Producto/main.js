// Importaciones y Declaraciones


import { cargarPublicacionActualJSON } from "../Funciones/cargarPublicacionActual.js";
import { mensajePopUp, colores } from "../Funciones/popUp.js";

const publicacionActual = cargarPublicacionActualJSON();

connect2Server(3000);

const botonC = document.getElementById("btnComentario");
const comentariosInput = document.getElementById("comentariosInput");
const titulo = document.getElementById("titulo");
const descripcion = document.getElementById("descripcion");
const btnSolicitar = document.getElementById("btnSolicitar");
const infoContacto = document.getElementById("infoContacto");
const especialidad = document.getElementById("especialidad");
const materiaOGrado = document.getElementById("materiaOGrado");
const gradoOProfesor = document.getElementById("gradoOProfesor");
const campoComentarios = document.getElementById("campoComentarios");
const imagenPublicacion = document.getElementById("imagenPublicacion");
const añoOPrecio = document.getElementById('añoOPrecio')

// Funcion chota para las taradeces de kufa

function loboFeroz(campo, summary, book) {
  if (publicacionActual.recurso == 'Libro') {
    campo.textContent = book;
  }
  if (publicacionActual.recurso == 'Resumen') {
    campo.textContent = summary;
  }
}

// Renderizado de información

loboFeroz(titulo, publicacionActual.titulo, publicacionActual.titulo);
loboFeroz(descripcion, publicacionActual.descripcion, publicacionActual.descripcion);
loboFeroz(especialidad, publicacionActual.especialidad || "N/A", publicacionActual.especialidad || "N/A");
loboFeroz(materiaOGrado, publicacionActual.materia, publicacionActual.grado);
loboFeroz(gradoOProfesor, publicacionActual.grado, publicacionActual.profesor);
loboFeroz(añoOPrecio, publicacionActual.año, publicacionActual.precio);
loboFeroz(infoContacto, publicacionActual.contacto, publicacionActual.contacto)
imagenPublicacion.src = publicacionActual.imagen;