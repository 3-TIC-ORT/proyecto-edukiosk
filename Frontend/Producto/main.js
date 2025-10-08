const mostrarBtn = document.getElementById("mostrarComentarios");
const seccionComentarios = document.getElementById("seccionComentarios");
const listaComentarios = document.getElementById("listaComentarios");
const inputComentario = document.getElementById("inputComentario");
const enviarComentario = document.getElementById("enviarComentario");
const eliminarComentariosBtn = document.getElementById("eliminarComentarios");
const verMasBtn = document.getElementById("verMasComentarios");
const verMenosBtn = document.getElementById("verMenosComentarios");
const favoritoBtn = document.getElementById("favoritoBtn");

// Mostrar / ocultar sección de comentarios
mostrarBtn.addEventListener("click", () => {
  const visible = seccionComentarios.style.display === "block";
  seccionComentarios.style.display = visible ? "none" : "block";
  mostrarBtn.textContent = visible ? "💬 Ver comentarios" : "✖️ Ocultar comentarios";
});
// Agregar comentario
enviarComentario.addEventListener("click", () => {
  const texto = inputComentario.value.trim();
  if (texto === "") return;

  const nuevoComentario = document.createElement("div");
  nuevoComentario.classList.add("comentario");
  nuevoComentario.textContent = texto;

  listaComentarios.prepend(nuevoComentario);
  inputComentario.value = "";

  guardarComentario(texto);
  actualizarVistaComentarios();
});

// Guardar comentario en localStorage
function guardarComentario(texto) {
  const comentarios = JSON.parse(localStorage.getItem("comentariosLibroLengua")) || [];
  comentarios.push(texto);
  localStorage.setItem("comentariosLibroLengua", JSON.stringify(comentarios));
}

// Cargar comentarios al inicio
function cargarComentarios() {
  const comentarios = JSON.parse(localStorage.getItem("comentariosLibroLengua")) || [];
  listaComentarios.innerHTML = "";
  comentarios.forEach((texto) => {
    const comentario = document.createElement("div");
    comentario.classList.add("comentario");
    comentario.textContent = texto;
    listaComentarios.prepend(comentario);
  });
  actualizarVistaComentarios();
}

// Mostrar solo 2 comentarios a la vez
function actualizarVistaComentarios() {
  const todos = listaComentarios.querySelectorAll(".comentario");
  todos.forEach((c, i) => {
    c.style.display = i < 2 ? "block" : "none";
  });
  if (todos.length > 2) {
    verMasBtn.style.display = "block";
  } else {
    verMasBtn.style.display = "none";
  }
  verMenosBtn.style.display = "none";
}

// Botón ver más
verMasBtn.addEventListener("click", () => {
  const todos = listaComentarios.querySelectorAll(".comentario");
  todos.forEach((c) => (c.style.display = "block"));
  verMasBtn.style.display = "none";
  verMenosBtn.style.display = "block";
});

// Botón ver menos
verMenosBtn.addEventListener("click", actualizarVistaComentarios);

// Eliminar todos los comentarios
eliminarComentariosBtn.addEventListener("click", () => {
  if (confirm("¿Seguro que querés eliminar todos los comentarios?")) {
    localStorage.removeItem("comentariosLibroLengua");
    listaComentarios.innerHTML = "";
    actualizarVistaComentarios();
  }
});

// Cargar al iniciar
window.addEventListener("DOMContentLoaded", cargarComentarios);
