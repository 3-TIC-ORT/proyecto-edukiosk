export function mensajePopUp(texto, color) {
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
}