const usuario = document.getElementById("Usuario");
const contraseña = document.getElementById("Contraseña");
const mail = document.getElementById("Correo");
const form = document.getElementById("form");
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
    alert(
      "El nombre de usuario no puede contener espacios ni caracteres especiales o exceder los 15 caracteres."
    );
    usuario.value = "";
    contraseña.value = "";
    mail.value = "";
    return;
  }

  const esMailValido =
    mailUsuario.includes("@") && mailUsuario.includes("ort.edu.ar");

  if (!esMailValido) {
    alert(
      "El correo debe ser institucional (terminar en @est.ort.edu.ar/@ort.edu.ar)"
    );

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
          alert("Algo salió mal, o el mail/usuario ya está registrado");
        } else {
          alert("Registro exitoso");
          usuario.value = "";
          contraseña.value = "";
          mail.value = "";
          window.location.href = '/Frontend/Login/index.html';
        }
      }
    );
  }
});
