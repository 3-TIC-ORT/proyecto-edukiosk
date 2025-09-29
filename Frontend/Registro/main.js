import soquetic from "soquetic";

const usuario = document.getElementById("Usuario");
const contraseña = document.getElementById("Contraseña");
const mail = document.getElementById("Email");
const form = document.getElementById("form");

connect2Server(3000);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombreUsuario = usuario.value;
  const contraseñaUsuario = contraseña.value;
  const mailUsuario = mail.value;
  
  postEvent("info", { user: nombreUsuario, password: contraseñaUsuario, email: mailUsuario }, (data) => {
    
  })

});