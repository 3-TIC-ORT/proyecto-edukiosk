const usuario = document.getElementById("Usuario");
const contraseña = document.getElementById("Contraseña");
const mail = document.getElementById("Correo");
const form = document.getElementById("form");

function mensajePopUp(texto, color) {
    const popUp = document.createElement("dialog");
    
    popUp.style.backgroundColor = color;
    popUp.innerText = texto;
    popUp.classList.add("popUp"); 

    document.body.appendChild(popUp);
    popUp.showModal(); 

    setTimeout(() => {
        popUp.classList.add("fading-out"); 

        setTimeout(() => {
            popUp.close();
            popUp.remove();
        }, 500); 

    }, 1500);
};

const caracteresProhibidos = [
  " ",
  "!",
  "#",
  "$",
  "%",
  "&",
  "/",
  "(",
  ")",
  "=",
  "?",
  "¡",
  "¿",
  "*",
  "+",
  "-",
  "{",
  "}",
  "[",
  "]",
  "^",
  "~",
  "`",
  ";",
  ",",
  "<",
  ">",
  ":",
  '"',
  "'",
  "\\",
];

connect2Server(3000);


form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombreUsuario = usuario.value;
  const contraseñaUsuario = contraseña.value;
  const mailUsuario = mail.value;

  const tieneCaracterProhibido = caracteresProhibidos.some((char) =>
    nombreUsuario.includes(char)
  );

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
    mensajePopUp("El correo debe ser institucional (@ort.edu.ar/@est.ort.edu.ar)", "#e92828ff");

    usuario.value = "";
    contraseña.value = "";
    mail.value = "";
    return;
  } else {
    postEvent(
      "info",
      { user: nombreUsuario, password: contraseñaUsuario, email: mailUsuario },
      (data) => {
        if (!data.success) {
          mensajePopUp("Algo salió mal, o el mail/usuario ya está registrado", "#e92828ff");
        } else {
          mensajePopUp("Registro exitoso", "#28e97dff");
          usuario.value = "";
          contraseña.value = "";
          mail.value = "";
          setTimeout(() => {
            window.location.href = '/Frontend/Login/index.html';
          }, 2000)
          
        }
      }
    );
  }
});
