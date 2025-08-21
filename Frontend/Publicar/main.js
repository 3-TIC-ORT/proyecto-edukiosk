document.addEventListener("DOMContentLoaded", function () {
  const recurso        = document.getElementById("recurso");
  const grado          = document.getElementById("grado");
  const espLabel       = document.querySelector("especialidad");
  const especialidad   = document.getElementById("especialidad");
  const materia        = document.getElementById("materia");
  const campoPrecios   = document.getElementById("campoprecios");

  const materiasPorGradoYEspecialidad = {
    '1°': ["Artes", "Biología", "Educación Judía", "Educación Tecnológica", "Formación Ética y Ciudadana", "Geografía", "Historia", "Lengua y Literatura", "Matemática", "Inglés"],
    '2°': ["Artes", "Biología", "Educación Judía", "Educación Tecnológica", "Formación Ética y Ciudadana", "Geografía", "Historia", "Lengua y Literatura", "Matemática", "Inglés"],

    '3°': {
      'TIC': ["Biología", "Cultura Judía", "Economía", "Educación Judía", "Físico Química", "Formación Ética y Ciudadana", "Geografía", "Historia", "Inglés", "Lengua y Literatura", "Matemática", "TIMI", "Hardware", "Software", "Tecnologías de la Información"],
      'Medios': ["Biología", "Cultura Judía", "Diseño y Tecnología", "Economía", "Educación Judía", "Físico Química", "Formación Ética y Ciudadana", "Geografía", "Historia", "Inglés", "Introducción al Estudio de la Comunicación", "Lengua y Literatura", "Matemática", "Realización y Producción Sonora", "Tecnologías de la Información"],
      'Gestión': ["Biología", "Cultura Judía", "Derecho", "Economía", "Educación Judía", "Físico Química", "Formación Ética y Ciudadana", "Geografía", "Historia", "Inglés", "Introducción a la Contabilidad", "Lengua y Literatura", "Matemática", "Organizaciones", "Tecnologías de la Información"],
      'Diseño': ["Biología", "Cultura Judía", "Economía", "Educación Judía", "Físico Química", "Formación Ética y Ciudadana", "Geografía", "Historia", "Inglés", "Lengua y Literatura", "Matemática"]
    },

    '4°': {
      'TIC': ["Arte", "Bases de Datos", "Cultura Judía", "Educación Judía", "Estructura y Funcionamiento de Sistemas Informáticos", "Física", "Formación Ética y Ciudadana", "Geografía", "Historia", "Inglés", "Lengua y Literatura", "Matemática", "Modelado e Interacción 3D", "Taller de Programación"],
      'Medios': ["Arte", "Comunicación, Discursos Sociales y Medios", "Cultura Judía", "Diseño y Tecnología", "Educación Judía", "Física", "Formación Ética y Ciudadana", "Geografía", "Historia", "Inglés", "Lengua y Literatura", "Matemática", "Taller Anual de Arte y Diseño", "Tecnologías de la Información", "Teorías de la Comunicación"],
      'Gestión': ["Cultura Judía", "Derecho", "Economía", "Educación Judía", "Física", "Formación Ética y Ciudadana", "Geografía", "Historia", "Inglés", "Lengua y Literatura", "Matemática", "Sistemas Administrativos", "Sistemas de Información Contable", "Tecnologías de la Información"],
      'Diseño': ["Arte", "Cultura Judía", "Educación Judía", "Física", "Formación Ética y Ciudadana", "Geografía", "Historia", "Inglés", "Lengua y Literatura", "Matemática"]
    },

    '5°': {
      'TIC': ["Cultura Judía", "Desarrollo de Aplicaciones Informáticas", "Desarrollo de Proyectos de Producción", "Educación Judía", "Estructura y Funcionamiento de Sistemas Informáticos", "Filosofía", "Historia", "Inglés", "Lengua y Literatura", "Matemática", "Química", "Seminario de Informática y Telecomunicaciones", "Sistemas de Comunicación de Datos", "Sistemas Embebidos", "Tecnología de la Información"],
      'Medios': ["Comunicación, Tecnología y Sociedad", "Cultura Judía", "Educación Judía", "Filosofía", "Historia", "Inglés", "Lengua y Literatura", "Matemática", "Proyecto de Comunicación", "Química", "Taller Anual de Producción Gráfica", "Taller Anual de Producción Multimedial", "Tecnología de la Información"],
      'Gestión': ["Contabilidad Patrimonial y de Gestión", "Cultura Judía", "Derecho", "Economía", "Educación Judía", "Filosofía", "Historia", "Inglés", "Lengua y Literatura", "Matemática", "Producción", "Proyecto Organizacional", "Química", "Tecnología de la Información"],
      'Diseño': ["Cultura Judía", "Educación Judía", "Filosofía", "Inglés", "Lengua y Literatura", "Matemática", "Química"]
    }
  };


  recurso.addEventListener("change", function () {
    if (recurso.value === "Libro" || recurso.value === "Clases particulares") {
      campoPrecios.style.display = "block";
    } else {
      campoPrecios.style.display = "none";
    }
  });


  grado.addEventListener("change", function () {
    const g = grado.value;

    materia.innerHTML = '<option value="">Selecciona una opción</option>';
    especialidad.innerHTML = '<option value="">Selecciona una opción</option>';

    if (!g) {
      espLabel.style.display = "none";
      especialidad.style.display = "none";
      return;
    }

    if (typeof materiasPorGradoYEspecialidad[g][0] === "string") {

      espLabel.style.display = "none";
      especialidad.style.display = "none";
      llenarMaterias(materiasPorGradoYEspecialidad[g]);
    } else {
      espLabel.style.display = "block";
      especialidad.style.display = "block";
      for (const esp in materiasPorGradoYEspecialidad[g]) {
        const opt = document.createElement("option");
        opt.value = esp;
        opt.textContent = esp;
        especialidad.appendChild(opt);
      }
    }
  });
-
  especialidad.addEventListener("change", function () {
    const g = grado.value;
    const e = especialidad.value;

    materia.innerHTML = '<option value="">Selecciona una opción</option>';
    if (g && e && materiasPorGradoYEspecialidad[g][e]) {
      llenarMaterias(materiasPorGradoYEspecialidad[g][e]);
    }
  });

  function llenarMaterias(lista) {
    lista.forEach(m => {
      const opt = document.createElement("option");
      opt.value = m;
      opt.textContent = m;
      materia.appendChild(opt);
    });
  }
});
