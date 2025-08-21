
document.addEventListener("DOMContentLoaded", function () {
  const menuPrincipal   = document.getElementById("menu-principal"); 
  const menuSecundario  = document.getElementById("menu-secundario");
  const labelSecundario = document.querySelector("label[for='menu-secundario']");

  menuSecundario.style.display = "none";
  labelSecundario.style.display = "none";

  menuPrincipal.addEventListener("change", function () {
    const seleccion = menuPrincipal.value;
    let opciones = '<option value="">-- Elegir materia --</option>';

    switch (seleccion) {
      case "TIC":
        opciones += `
          <option>Biología</option>
          <option>Cultura Judía</option>
          <option>Economía</option>
          <option>Educación Judía</option>
          <option>Físico Química</option>
          <option>Formación Ética y Ciudadana</option>
          <option>Geografía</option>
          <option>Historia</option>
          <option>Inglés</option>
          <option>Lengua y Literatura</option>
          <option>Matemática</option>
          <option>TIMI</option>
          <option>Hardware</option>
          <option>Software</option>
          <option>Tecnologías de la Información</option>
        `;
        break;

      case "Medios":
        opciones += `
          <option>Biología</option>
          <option>Cultura Judía</option>
          <option>Diseño y Tecnología</option>
          <option>Economía</option>
          <option>Educación Judía</option>
          <option>Físico Química</option>
          <option>Formación Ética y Ciudadana</option>
          <option>Geografía</option>
          <option>Historia</option>
          <option>Inglés</option>
          <option>Introducción al Estudio de la Comunicación</option>
          <option>Lengua y Literatura</option>
          <option>Matemática</option>
          <option>Realización y Producción Sonora</option>
          <option>Tecnologías de la Información</option>
        `;
        break;

      case "Gestión":
        opciones += `
          <option>Biología</option>
          <option>Cultura Judía</option>
          <option>Derecho</option>
          <option>Economía</option>
          <option>Educación Judía</option>
          <option>Físico Química</option>
          <option>Formación Ética y Ciudadana</option>
          <option>Geografía</option>
          <option>Historia</option>
          <option>Inglés</option>
          <option>Introducción a la Contabilidad</option>
          <option>Lengua y Literatura</option>
          <option>Matemática</option>
          <option>Organizaciones</option>
          <option>Tecnologías de la Información</option>
        `;
        break;

      case "Diseño":
        opciones += `
          <option>Biología</option>
          <option>Cultura Judía</option>
          <option>Economía</option>
          <option>Educación Judía</option>
          <option>Físico Química</option>
          <option>Formación Ética y Ciudadana</option>
          <option>Geografía</option>
          <option>Historia</option>
          <option>Inglés</option>
          <option>Lengua y Literatura</option>
          <option>Matemática</option>
        `;
        break;

      default:
        menuSecundario.style.display = "none";
        labelSecundario.style.display = "none";
        menuSecundario.innerHTML = "";
        return;
    }

    menuSecundario.innerHTML = opciones;
    menuSecundario.style.display = "block";
    labelSecundario.style.display = "block";
  });
});
