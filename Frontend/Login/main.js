const email = document.getElementById("Email");
const password = document.getElementById("Contraseña");
const formLogin = document.getElementById("form-login");

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();

  const body = {
    mail: email.value.trim(),
    contraseña: password.value, // en el backend se compara con hash
  };

  try {
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    }); // convierte el objeto a formato JSON y lo manda al servidor
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert(err.message || "Credenciales inválidas");
      return;
    }
    // el servidor (backend) recibe el JSON con mail y contraseña, valida si coinciden con los datos guardados.
    window.location.href = "/app.html"; // si el login es correcto
  } catch (err) {
    console.error(err);
    alert("Error al iniciar sesión");
  }
}); //si el login no es correcto o si sucede algun error