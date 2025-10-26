import { mensajePopUp } from "../Funciones/popUp.js";

document.addEventListener("DOMContentLoaded", () => {
  const selRecurso = document.getElementById("recurso");
  const precioc = document.getElementById("campoprecios");
  const inputPrecio = document.getElementById("Precios");
  const selGrado = document.getElementById("grado");
  const selEspecialidad = document.getElementById("especialidad");
  const selMateria = document.getElementById("materia");
  const campoEspecialidad = document.getElementById("campoEspecialidad");
  const campoAnioEscolar = document.getElementById("campoAnioEscolar");
  const campoProfesor = document.getElementById("campoProfesor");
  const inputAnioEscolar = document.getElementById("Año-Escolar");
  const inputProfesor = document.getElementById("profesor");
  const form = document.getElementById("formPublicar");
  const tituloInput = document.getElementById("Titulo");
  const descripcionInput = document.getElementById("descripcion");
  const inputImagen = document.getElementById("imagen");
  const rectangulo = document.getElementById("previewRect");

  const materiasPorGradoYEspecialidad = {
    "1°": [
      "Artes", "Biología", "Educación Judía", "Educación Tecnológica",
      "Formación Ética y Ciudadana", "Geografía", "Historia",
      "Lengua y Literatura", "Matemática", "Inglés"
    ],
    "2°": [
      "Artes", "Biología", "Educación Judía", "Educación Tecnológica",
      "Formación Ética y Ciudadana", "Geografía", "Historia",
      "Lengua y Literatura", "Matemática", "Inglés"
    ],
    "3°": {
      "TIC": ["Biología", "Cultura Judía", "Economía", "Educación Judía", "Físico Química",
        "Formación Ética y Ciudadana", "Geografía", "Historia", "Inglés",
        "Lengua y Literatura", "Matemática", "TIMI", "Hardware", "Software", "Tecnologías de la Información"
      ],
      "Medio": ["Biología", "Cultura Judía", "Diseño y Tecnología", "Economía", "Educación Judía",
        "Físico Química", "Formación Ética y Ciudadana", "Geografía", "Historia", "Inglés",
        "Introducción al Estudio de la Comunicación", "Lengua y Literatura", "Matemática",
        "Realización y Producción Sonora", "Tecnologías de la Información"
      ],
      "Gestión": ["Biología", "Cultura Judía", "Derecho", "Economía", "Educación Judía",
        "Físico Química", "Formación Ética y Ciudadana", "Geografía", "Historia",
        "Inglés", "Introducción a la Contabilidad", "Lengua y Literatura",
        "Matemática", "Organizaciones", "Tecnologías de la Información"
      ],
      "Diseño": ["Biología", "Cultura Judía", "Economía", "Educación Judía",
        "Físico Química", "Formación Ética y Ciudadana", "Geografía", "Historia",
        "Inglés", "Lengua y Literatura", "Matemática"]
    },
    "4°": {
      "TIC": ["Arte", "Bases de Datos", "Cultura Judía", "Educación Judía",
        "Estructura y Funcionamiento de Sistemas Informáticos", "Física",
        "Formación Ética y Ciudadana", "Geografía", "Historia", "Inglés",
        "Lengua y Literatura", "Matemática", "Modelado e Interacción 3D", "Taller de Programación"
      ],
      "Medio": ["Arte", "Comunicación, Discursos Sociales y Medios", "Cultura Judía",
        "Diseño y Tecnología", "Educación Judía", "Física",
        "Formación Ética y Ciudadana", "Geografía", "Historia", "Inglés",
        "Lengua y Literatura", "Matemática", "Taller Anual de Arte y Diseño",
        "Tecnologías de la Información", "Teorías de la Comunicación"
      ],
      "Gestión": ["Cultura Judía", "Derecho", "Economía", "Educación Judía", "Física",
        "Formación Ética y Ciudadana", "Geografía", "Historia", "Inglés",
        "Lengua y Literatura", "Matemática", "Sistemas Administrativos",
        "Sistemas de Información Contable", "Tecnologías de la Información"
      ],
      "Diseño": ["Arte", "Cultura Judía", "Educación Judía", "Física",
        "Formación Ética y Ciudadana", "Geografía", "Historia",
        "Inglés", "Lengua y Literatura", "Matemática"]
    },
    "5°": {
      "TIC": ["Cultura Judía", "Desarrollo de Aplicaciones Informáticas", "Desarrollo de Proyectos de Producción",
        "Educación Judía", "Estructura y Funcionamiento de Sistemas Informáticos", "Filosofía",
        "Historia", "Inglés", "Lengua y Literatura", "Matemática", "Química",
        "Seminario de Informática y Telecomunicaciones", "Sistemas de Comunicación de Datos",
        "Sistemas Embebidos", "Tecnología de la Información"
      ],
      "Medio": ["Comunicación, Tecnología y Sociedad", "Cultura Judía", "Educación Judía",
        "Filosofía", "Historia", "Inglés", "Lengua y Literatura", "Matemática",
        "Proyecto de Comunicación", "Química", "Taller Anual de Producción Gráfica",
        "Taller Anual de Producción Multimedial", "Tecnología de la Información"
      ],
      "Gestión": ["Contabilidad Patrimonial y de Gestión", "Cultura Judía", "Derecho",
        "Economía", "Educación Judía", "Filosofía", "Historia", "Inglés",
        "Lengua y Literatura", "Matemática", "Producción", "Proyecto Organizacional",
        "Química", "Tecnología de la Información"
      ],
      "Diseño": ["Cultura Judía", "Educación Judía", "Filosofía", "Inglés",
        "Lengua y Literatura", "Matemática", "Química"]
    },
  };

  function setOptions(select, opciones, placeholder = "") {
    select.innerHTML = "";
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = placeholder;
    opt.disabled = true;
    opt.selected = true;
    select.appendChild(opt);
    opciones.forEach((txt) => {
      const o = document.createElement("option");
      o.value = txt;
      o.textContent = txt;
      select.appendChild(o);
    });
  }

  function actualizarCamposSegunRecurso() {
    const tipo = selRecurso.value;
    precioc.style.display = "none";
    campoAnioEscolar.style.display = "none";
    campoProfesor.style.display = "none";
    if (tipo === "Libro") precioc.style.display = "block";
    else if (tipo === "Resumen") {
      campoAnioEscolar.style.display = "block";
      campoProfesor.style.display = "block";
    }
  }

  function actualizarEspecialidadesSegunGrado() {
    const grado = selGrado.value;
    const debeMostrar = ["3°", "4°", "5°"].includes(grado);
    campoEspecialidad.style.display = debeMostrar ? "block" : "none";
    if (debeMostrar) setOptions(selEspecialidad, ["TIC", "Diseño", "Gestión", "Medio"]);
    else selEspecialidad.value = "";
    actualizarMateriasSegunGradoYEspecialidad();
  }

  function actualizarMateriasSegunGradoYEspecialidad() {
    const grado = selGrado.value;
    const esp = selEspecialidad.value;
    let materias = [];
    if (["3°", "4°", "5°"].includes(grado))
      materias = (materiasPorGradoYEspecialidad[grado] && materiasPorGradoYEspecialidad[grado][esp]) || [];
    else materias = materiasPorGradoYEspecialidad[grado] || [];
    setOptions(selMateria, materias, "");
  }

  selRecurso.addEventListener("change", actualizarCamposSegunRecurso);
  selGrado.addEventListener("change", actualizarEspecialidadesSegunGrado);
  selEspecialidad.addEventListener("change", actualizarMateriasSegunGradoYEspecialidad);

  actualizarCamposSegunRecurso();
  actualizarEspecialidadesSegunGrado();

  let imagenBase64 = "";
  rectangulo.addEventListener("click", () => inputImagen.click());
  inputImagen.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      imagenBase64 = ev.target.result.split(",")[1];
      rectangulo.style.backgroundImage = `url(${ev.target.result})`;
    };
    reader.readAsDataURL(file);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const publicacion = {
      titulo: tituloInput.value.trim(),
      descripcion: descripcionInput.value.trim(),
      recurso: selRecurso.value,
      grado: selGrado.value,
      especialidad: ["3°", "4°", "5°"].includes(selGrado.value) ? selEspecialidad.value : "",
      materia: selMateria.value,
      precio: precioc.style.display !== "none" ? Number(inputPrecio.value) : 0,
      anioEscolar: campoAnioEscolar.style.display !== "none" ? inputAnioEscolar.value.trim() : "",
      profesor: campoProfesor.style.display !== "none" ? inputProfesor.value.trim() : "",
      fecha: Date.now(),
      dueño: localStorage.getItem("usuarioSesion") || "anonimo",
      imagen: imagenBase64,
    };

    console.log(" Enviando publicación:", publicacion);

    postEvent("publicarRecurso", publicacion, (respuesta) => {
      if (respuesta?.success) {
        mensajePopUp("Publicación creada con éxito", "#28a745");
        form.reset();
        rectangulo.style.backgroundImage = "";
      } else {
        mensajePopUp(" Error al crear publicación", "#e92828ff");
      }
    });
  });
});
