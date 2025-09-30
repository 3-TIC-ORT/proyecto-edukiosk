const botonC = document.getElementById("btnComentario");
const comentariosBox = document.getElementById("comentariosBox");
const enviarComentario = document.getElementById("EnviarComentario");
const listaComentarios = document.getElementById("ListaComentarios");
const nuevoComentario = document.getElementById("nuevoComentario");

botonC.addEventListener("click", ()=> {
    comentariosBox.classList.toggle("oculto");
});

enviarComentario.addEventListener("click", ()=> {
    const texto= nuevoComentario.value.trim();
    if (texto !== ""){

}}