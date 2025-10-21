import { mensajePopUp, colores } from "./popUp.js";

// Se encarga de cargar una publicación al entrar a la página de producto
export function cargarPublicacionActualJSON() {
  const raw = localStorage.getItem("publicacionActual");
  if (!raw) {
    mensajePopUp(
      "Error al cargar el recurso seleccionado, volviendo al home",
      colores.error
    );
    setTimeout(() => {
      window.location.href = "../Home/index.html";
    }, 1500);
    return null;
  }

  try {
    const publicacionActual = JSON.parse(raw);
    return publicacionActual;
  } catch (err) {
    console.error("Error parseando publicacionActual:", err);
    mensajePopUp("Datos de la publicación inválidos, volviendo al home", colores.error);
    setTimeout(() => {
      window.location.href = "../Home/index.html";
    }, 1500);
    return null;
  }
}