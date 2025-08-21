<<<<<<< HEAD

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
          <option>Arte</option>
          <option>Bases de Datos</option>
          <option>Cultura Judía</option>
          <option>Educación Judía</option>
          <option>Estructura y Funcionamiento de Sistemas Informáticos</option>
          <option>Física</option>
          <option>Formación Ética y Ciudadana</option>
          <option>Geografía</option>
          <option>Historia</option>
          <option>Inglés</option>
          <option>Lengua y Literatura</option>
          <option>Matemática</option>
          <option>Modelado e Interacción 3D</option>
          <option>Taller de Programación</option>
        `;
        break;

      case "Medios":
        opciones += `
          <option>Arte</option>
          <option>Comunicación, Discursos Sociales y Medios</option>
          <option>Cultura Judía</option>
          <option>Diseño y Tecnología</option>
          <option>Educación Judía</option>
          <option>Física</option>
          <option>Formación Ética y Ciudadana</option>
          <option>Geografía</option>
          <option>Historia</option>
          <option>Inglés</option>
          <option>Lengua y Literatura</option>
          <option>Matemática</option>
          <option>Taller Anual de Arte y Diseño</option>
          <option>Tecnologías de la Información</option>
          <option>Teorías de la Comunicación</option>
        `;
        break;

      case "Gestión": 
        opciones += `
          <option>Cultura Judía</option>
          <option>Derecho</option>
          <option>Economía</option>
          <option>Educación Judía</option>
          <option>Física</option>
          <option>Formación Ética y Ciudadana</option>
          <option>Geografía</option>
          <option>Historia</option>
          <option>Inglés</option>
          <option>Lengua y Literatura</option>
          <option>Matemática</option>
          <option>Sistemas Administrativos</option>
          <option>Sistemas de Información Contable</option>
          <option>Tecnologías de la Información</option>
        `;
        break;

      case "Diseño": 
        opciones += `
          <option>Arte</option>
          <option>Cultura Judía</option>
          <option>Educación Judía</option>
          <option>Física</option>
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
=======
>>>>>>> parent of 9acb092 (Mejore las 5 pantallas de los años agregando los menus depegables)
