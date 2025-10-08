import { mensajePopUp } from "../Funciones/popUp.js";
import { caracteresProhibidos } from "../Funciones/checkeoSesion.js";

const usuario = document.getElementById("Usuario");
const contraseña = document.getElementById("Contraseña");
const mail = document.getElementById("Correo");
const form = document.getElementById("form");
const tos = document.getElementById("Terminos");

connect2Server(3000);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombreUsuario = usuario.value;
  const contraseñaUsuario = contraseña.value;
  const mailUsuario = mail.value;

  const tieneCaracterProhibido = caracteresProhibidos.some((char) =>
    nombreUsuario.includes(char)
  );

  if (!Terminos.checked) {
    mensajePopUp(
      "Debes aceptar los terminos y condiciones para registrarte.",
      "#e92828ff"
    );
    return;
  }

  if (tieneCaracterProhibido || nombreUsuario.length >= 15) {
    mensajePopUp(
      "El nombre de usuario no puede contener espacios ni caracteres especiales o exceder los 15 caracteres.",
      "#e92828ff"
    );
    usuario.value = "";
    contraseña.value = "";
    mail.value = "";
    return;
  }

  const esMailValido =
    mailUsuario.includes("@") && mailUsuario.includes("ort.edu.ar");

  if (!esMailValido) {
    mensajePopUp(
      "El correo debe ser institucional (@ort.edu.ar/@est.ort.edu.ar)",
      "#e92828ff"
    );

    usuario.value = "";
    contraseña.value = "";
    mail.value = "";
    return;
  } else {
    postEvent(
      "info",
      {
        user: nombreUsuario,
        password: contraseñaUsuario,
        email: mailUsuario,
        pfp: "/Imagenes/fotosPerfil/defaultPerfil.jpg",
        rating: 0,
        descripcion: "",
       },
      (data) => {
        if (!data.success) {
          mensajePopUp(
            "Algo salió mal, o el mail/usuario ya está registrado",
            "#e92828ff"
          );
        } else {
          mensajePopUp("Registro exitoso", "#28e97dff");
          usuario.value = "";
          contraseña.value = "";
          mail.value = "";
          setTimeout(() => {
            window.location.href = "/Frontend/Login/index.html";
          }, 2000);
        }
      }
    );
  }
});
