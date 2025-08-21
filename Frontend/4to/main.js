<<<<<<< HEAD

const especialidades = {
    TIC: ["Arte", "Bases de Datos", "Cultura Judía", "Educación Judía", "Estructura y Funcionamiento de Sistemas Informáticos", "Física", "Formación Ética y Ciudadana", "Geografía", "Historia", "Inglés", "Lengua y Literatura", "Matemática", "Modelado e Interacción 3D", "Taller de Programación"],
    Medios: ["Arte", "Comunicación, Discursos Sociales y Medios", "Cultura Judía", "Diseño y Tecnología", "Educación Judía", "Física", "Formación Ética y Ciudadana", "Geografía", "Historia", "Inglés", "Lengua y Literatura", "Matemática", "Taller Anual de Arte y Diseño", "Tecnologías de la Información", "Teorías de la Comunicación"],
    Gestión: ["Cultura Judía", "Derecho", "Economía", "Educación Judía", "Física", "Formación Ética y Ciudadana", "Geografía", "Historia", "Inglés", "Lengua y Literatura", "Matemática", "Sistemas Administrativos", "Sistemas de Información Contable", "Tecnologías de la Información"],
    Diseño: ["Arte", "Cultura Judía", "Educación Judía", "Física", "Formación Ética y Ciudadana", "Geografía", "Historia", "Inglés", "Lengua y Literatura", "Matemática"]
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
<<<<<<< HEAD

    menuSecundario.innerHTML = opciones;
    menuSecundario.style.display = "block";
    labelSecundario.style.display = "block";
  });
});
=======
>>>>>>> parent of 9acb092 (Mejore las 5 pantallas de los años agregando los menus depegables)
=======
  });
>>>>>>> parent of ec337b8 (Mejorando cosas)
