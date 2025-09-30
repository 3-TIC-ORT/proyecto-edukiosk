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
  "_",
  "{",
  "}",
  "[",
  "]",
  "^",
  "~",
  "`",
  ";",
  ",",
  ".",
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

  if (
    nombreUsuario.includes(caracteresProhibidos) ||
    nombreUsuario.length >= 15
  ) {
    alert(
      "El nombre de usuario no puede contener espacios ni caracteres especiales o exceder los 15 caracteres."
    );
    nombreUsuario.value = "";
    contraseñaUsuario.value = "";
    mailUsuario.value = "";
  }
  if (!mailUsuario.includes("ort.edu.ar" && "@")) {
    alert("El correo debe ser institucional (terminar en @est.ort.edu.ar/@ort.edu.ar)");
  } else {
    postEvent(
      "info",
      { user: nombreUsuario, password: contraseñaUsuario, email: mailUsuario },
      (data) => {
        if (!data.success) {
          alert("Algo salió mal, o el mail/usuario ya está registrado");
        } else {
          alert("Registro exitoso");
        }
      }
    );
  }
});
