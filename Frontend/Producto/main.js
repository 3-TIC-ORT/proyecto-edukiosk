// Importaciones y Declaraciones

import { cargarPublicacionActualJSON } from "../Funciones/cargarPublicacionActual.js";
import { mensajePopUp, colores } from "../Funciones/popUp.js";
import { materiasPorGradoYEspecialidad } from "../Funciones/filtrado.js";
import { cargarComentarios } from "../Funciones/comentarios.js"

const publicacionActual = cargarPublicacionActualJSON();
const usuarioSesion = JSON.parse(localStorage.getItem("usuarioSesion"));
let comentarios = []

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
const añoOPrecio = document.getElementById("añoOPrecio");

// Cargar al localStorage los comentarios

postEvent('fetchComentarios', publicacionActual, (res) => {
  if (res && res.success) {
    localStorage.setItem('comentarios', JSON.stringify(res.comentariosPublicacion, null, 2));
    comentarios = JSON.parse(localStorage.getItem('comentarios'));
    console.log(comentarios)
    cargarComentarios(comentarios);
  }
  else {
    mensajePopUp('Error al cargar comentarios', colores.error)
  }
})


// Funcion chota para las taradeces de kufa

function loboFeroz(campo, summary, book) {
  if (publicacionActual.recurso == "Libro") {
    campo.textContent = book;
  }
  if (publicacionActual.recurso == "Resumen") {
    campo.textContent = summary;
  }
}

// Renderizado de información

const contacto = publicacionActual.contacto;
const contactoDetalle = `Mail: ${contacto.mail || "N/A"} | Tel: ${
  contacto.tel || "N/A"
}`;

loboFeroz(titulo, publicacionActual.titulo, publicacionActual.titulo);
loboFeroz(
  descripcion,
  publicacionActual.descripcion,
  publicacionActual.descripcion
);
loboFeroz(
  especialidad,
  publicacionActual.especialidad || "N/A",
  publicacionActual.especialidad || "N/A"
);
loboFeroz(materiaOGrado, publicacionActual.materia, publicacionActual.grado);
loboFeroz(gradoOProfesor, publicacionActual.grado, publicacionActual.profesor);
loboFeroz(añoOPrecio, publicacionActual.año, publicacionActual.precio);
loboFeroz(infoContacto, contactoDetalle, contactoDetalle);
imagenPublicacion.src = publicacionActual.imagen;

// Checkeo de ya haber solicitado
const separador = document.getElementById("separador");
if (publicacionActual.recurso === "Resumen" && separador) {
  separador.style.display = "none";
} else if (separador) {
  separador.style.display = "block";
}

if (usuarioSesion.solicitudes.includes(publicacionActual.fecha)) {
  btnSolicitar.disabled = true;
  btnSolicitar.textContent = "Recurso ya solicitado";
}

// Crear Solicitud

btnSolicitar.addEventListener("click", () => {
  postEvent(
    "solicitarRecurso",
    {
      solicitante: usuarioSesion,
      fecha: publicacionActual.fecha,
    },
    (res) => {
      if (res && res.success) {
        mensajePopUp("Producto solicitado con exito", colores.exito);
        localStorage.setItem("publicacionActual", res.publicacionATrabajar);
        localStorage.setItem("usuarioSesion", res.usuarioATrabajar);
        btnSolicitar.disabled = true;
        btnSolicitar.textContent = "Recurso ya solicitado";
      } else {
        mensajePopUp("Ocurrio un error", colores.error);
      }
    }
  );
});


// Enviar comentario

function revisarComentario(comentario) {
  if (comentario == "" ) {
    return false;
  }
  else {
    return true;
  }
}
botonC.addEventListener("click", () => {
  const comentarioData = comentariosInput.value;
  console.log("Detecta")
  console.log(comentarioData);
  if (revisarComentario(comentarioData) == true) {
    postEvent('agregarComentario', { 
      comentarioData: comentarioData,
      publicacionActual: publicacionActual,
      usuarioSesion: usuarioSesion
    }, (res) => {
      if (res && res.success) {
        mensajePopUp('Comentario agregado con exito', colores.exito)
        comentarios = JSON.parse(localStorage.getItem('comentarios'))
        comentarios.push(res.comentarios)
        cargarComentarios(comentarios)
      }
      else {
        mensajePopUp('Ocurrio un error al publicar el comentario', colores.error);
      }
    })
  }
});
