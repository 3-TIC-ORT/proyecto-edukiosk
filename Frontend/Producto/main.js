// Importaciones y Declaraciones


import { cargarPublicacionActualJSON } from "../Funciones/cargarPublicacionActual.js";
import { mensajePopUp, colores } from "../Funciones/popUp.js";
import { materiasPorGradoYEspecialidad } from "../Funciones/filtrado.js";

const publicacionActual = cargarPublicacionActualJSON();
const usuarioSesion = localStorage.getItem('usuarioSesion')

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

const contacto = publicacionActual.contacto
const contactoDetalle = `Mail: ${contacto.mail || 'N/A'} | Tel: ${contacto.tel || 'N/A'}`;

loboFeroz(titulo, publicacionActual.titulo, publicacionActual.titulo);
loboFeroz(descripcion, publicacionActual.descripcion, publicacionActual.descripcion);
loboFeroz(especialidad, publicacionActual.especialidad || "N/A", publicacionActual.especialidad || "N/A");
loboFeroz(materiaOGrado, publicacionActual.materia, publicacionActual.grado);
loboFeroz(gradoOProfesor, publicacionActual.grado, publicacionActual.profesor);
loboFeroz(añoOPrecio, publicacionActual.año, publicacionActual.precio);
loboFeroz(infoContacto, contactoDetalle, contactoDetalle)
imagenPublicacion.src = publicacionActual.imagen;

// Crear Solicitud

btnSolicitar.addEventListener("click", () => {
    postEvent('solicitarRecurso', {
        
    }, (res) => {
        if (res && res.success) {
            mensajePopUp('Producto solicitado con exito', colores.exito);
        }
        else {
            mensajePopUp('Ocurrio un error', colores.error);
        }
    })
})