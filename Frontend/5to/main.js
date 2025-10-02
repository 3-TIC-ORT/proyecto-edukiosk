const especialidades = {
  TIC: ["Biología", "Cultura Judía", "Economía", "Educación Judía", "Físico Química", "Formación Ética y Ciudadana", "Geografía", "Historia", "Inglés", "Lengua y Literatura", "Matemática", "TIMI", "Hardware", "Software", "Tecnologías de la Información"],
  Medios: ["Biología", "Cultura Judía", "Diseño y Tecnología", "Economía", "Educación Judía", "Físico Química", "Formación Ética y Ciudadana", "Geografía", "Historia", "Inglés", "Introducción al Estudio de la Comunicación", "Lengua y Literatura", "Matemática", "Realización y Producción Sonora", "Tecnologías de la Información"],
  Gestion: ["Biología", "Cultura Judía", "Derecho", "Economía", "Educación Judía", "Físico Química", "Formación Ética y Ciudadana", "Geografía", "Historia", "Inglés", "Introducción a la Contabilidad", "Lengua y Literatura", "Matemática", "Organizaciones", "Tecnologías de la Información"],
  Diseno: ["Biología", "Cultura Judía", "Economía", "Educación Judía", "Físico Química", "Formación Ética y Ciudadana", "Geografía", "Historia", "Inglés", "Lengua y Literatura", "Matemática"]
}

const menuPrincipal = document.getElementById("menu-principal");
const menuSecundario = document.getElementById("menu-secundario");
const labelSecundario = document.querySelector("label[for='menu-secundario']");

menuPrincipal.addEventListener("change", () => {



  const seleccion = menuPrincipal.value;

  if (seleccion && especialidades[seleccion]) {

    menuSecundario.innerHTML = "";
    
    especialidades[seleccion].forEach(opcion => {
      const opt = document.createElement("option");
      opt.value = opcion.toLowerCase();
      opt.textContent = opcion;
      menuSecundario.appendChild(opt);
    });

    menuSecundario.style.display = "block";
    labelSecundario.style.display = "block";
  } else {
    menuSecundario.style.display = "none";
    labelSecundario.style.display = "none";
  }
});

