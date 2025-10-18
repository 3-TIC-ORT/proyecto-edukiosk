export const colores = {
  error: "#e92828ff",
  exito: "#28e97dff"
}

export function mensajePopUp(texto, color) {
  const popUp = document.createElement("dialog");
  popUp.style.position = "fixed";
  popUp.style.top = "50px";
  popUp.style.left = "50%";
  popUp.style.transform = "translateX(-50%)";
  popUp.style.margin = "0";
  popUp.style.fontFamily = "inherit";
  popUp.style.maxWidth = "300px";
  popUp.style.width = "fit-content";
  popUp.style.minWidth = "200px";
  popUp.style.padding = "20px 30px";
  popUp.style.border = "none";
  popUp.style.borderRadius = "15px";
  popUp.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.3)";
  popUp.style.textAlign = "center";
  popUp.style.opacity = "0";
  popUp.style.transition = "opacity 0.3s ease-in-out, background-color 0.3s ease-in-out";
  popUp.style.backgroundColor = color;
  popUp.style.color = "white";
  popUp.style.fontFamily = "Inter, sans-serif"
  popUp.innerText = texto;
  document.body.appendChild(popUp);
  popUp.showModal();

  setTimeout(() => {
    popUp.style.opacity = "1";
  }, 10);

  setTimeout(() => {
    popUp.style.opacity = "0";
    popUp.style.transition = "opacity 0.5s ease-in-out";

    setTimeout(() => {
      popUp.close();
      popUp.remove();
    }, 500);
  }, 1500);
}