const email = document.getElementById("Email");
const password = document.getElementById("Contraseña");
const formLogin = document.getElementById("form-login");

import { mensajePopUp, colores } from "../Funciones/popUp.js";

connect2Server(3000);

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();

  const mailUsuario = email.value.trim();
  const contraseñaUsuario = password.value;

  if (!mailUsuario || !contraseñaUsuario) {
    alert("Debes completar todos los campos");
    return;
  }

  postEvent(
    "login",
    { email: mailUsuario, password: contraseñaUsuario },
    (data) => {
      if (!data.success) {
        mensajePopUp("Credenciales inválidas o error en el login", colores.error);
      } else {
        mensajePopUp("Login exitoso", colores.exito);
        localStorage.setItem("usuarioSesion", JSON.stringify(data.usuarioSesion));
        setTimeout(() => {
          window.location.href = "/Frontend/Home/index.html";
        }, 1500);
      }
    }
  );
});
