const usuario = document.getElementById("Usuario");
const contraseña = document.getElementById("Contraseña");
const mail = document.getElementById("Email");
const form = document.getElementById("form");

<<<<<<< HEAD

=======
>>>>>>> 4dd45c74982e6ba1f1eae722a8a33bdf8643ea7c
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombreUsuario = usuario.value;
  const contraseñaUsuario = contraseña.value;
  const mailUsuario = mail.value;

<<<<<<< HEAD

=======
>>>>>>> 4dd45c74982e6ba1f1eae722a8a33bdf8643ea7c
  fetch("http://localhost:3000/api/registro", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      usuario: nombreUsuario,
      contraseña: contraseñaUsuario,
      mail: mailUsuario,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert(data.message);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error al registrar el usuario");
    });
});
