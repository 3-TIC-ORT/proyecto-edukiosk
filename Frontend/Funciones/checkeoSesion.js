export function checkeoSesion() {
    const usuarioSesion = localStorage.getItem("usuarioSesion");
    if (!usuarioSesion) {
        window.location.href = "/Frontend/Login/index.html";
    }
    else {
        try {
        const perfil = JSON.parse(usuarioSesion);
        console.log(perfil)
        }
        catch {
            console.error("Error al acceder a procesar la sesión del usuario, por favor vuelve a iniciar sesión.");
            localStorage.removeItem("usuarioSesion");
            window.location.href = "/Frontend/Login/index.html"
        }
    }
}