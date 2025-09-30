const email = document.getElementById("Email");
const password = document.getElementById("Contraseña");
const formLogin = document.getElementById("form-login");

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
        alert("Credenciales inválidas o error en el login");
      } else {
        alert("Login exitoso");
        window.location.href = '/Frontend/Home/index.html';
      }
    }
  );
});
