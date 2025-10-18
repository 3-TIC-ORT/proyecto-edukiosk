export function aplicarFiltros(
  publicaciones,
  selMateria,
  selRecurso,
  selEspecialidad,
  barraBuscar,
  cajaProducto,
  contenedor
) {
  let filtradas = publicaciones.slice();

  const filtroMateria = selMateria ? selMateria.value : "";
  const filtroRecurso = selRecurso ? selRecurso.value : "";
  const filtroEspecialidad = selEspecialidad ? selEspecialidad.value : "";
  const filtroBusqueda = barraBuscar
    ? barraBuscar.value.trim().toLowerCase()
    : "";

  filtradas = filtradas.filter((p) => {
    const pasaMateria = !filtroMateria || (p.materia || "") === filtroMateria;
    const pasaRecurso = !filtroRecurso || (p.recurso || "") === filtroRecurso;
    const pasaEspecialidad =
      !filtroEspecialidad || (p.especialidad || "") === filtroEspecialidad;

    const pasaBusqueda =
      !filtroBusqueda ||
      (p.titulo || "").toLowerCase().includes(filtroBusqueda) ||
      (p.descripcion || "").toLowerCase().includes(filtroBusqueda) ||
      (p.dueño || "").toLowerCase().includes(filtroBusqueda);

    return pasaMateria && pasaRecurso && pasaBusqueda && pasaEspecialidad;
  });

  contenedor.innerHTML = "";
  cajaProducto(filtradas);
}

export const materiasPorGradoYEspecialidad = {
  "1°": [
    "Artes",
    "Biología",
    "Educación Judía",
    "Educación Tecnológica",
    "Formación Ética y Ciudadana",
    "Geografía",
    "Historia",
    "Lengua y Literatura",
    "Matemática",
    "Inglés",
  ],
  "2°": [
    "Artes",
    "Biología",
    "Educación Judía",
    "Educación Tecnológica",
    "Formación Ética y Ciudadana",
    "Geografía",
    "Historia",
    "Lengua y Literatura",
    "Matemática",
    "Inglés",
  ],

  "3°": {
    TIC: [
      "Biología",
      "Cultura Judía",
      "Economía",
      "Educación Judía",
      "Físico Química",
      "Formación Ética y Ciudadana",
      "Geografía",
      "Historia",
      "Inglés",
      "Lengua y Literatura",
      "Matemática",
      "TIMI",
      "Hardware",
      "Software",
      "Tecnologías de la Información",
    ],
    Medios: [
      "Biología",
      "Cultura Judía",
      "Diseño y Tecnología",
      "Economía",
      "Educación Judía",
      "Físico Química",
      "Formación Ética y Ciudadana",
      "Geografía",
      "Historia",
      "Inglés",
      "Introducción al Estudio de la Comunicación",
      "Lengua y Literatura",
      "Matemática",
      "Realización y Producción Sonora",
      "Tecnologías de la Información",
    ],
    Gestión: [
      "Biología",
      "Cultura Judía",
      "Derecho",
      "Economía",
      "Educación Judía",
      "Físico Química",
      "Formación Ética y Ciudadana",
      "Geografía",
      "Historia",
      "Inglés",
      "Introducción a la Contabilidad",
      "Lengua y Literatura",
      "Matemática",
      "Organizaciones",
      "Tecnologías de la Información",
    ],
    Diseño: [
      "Biología",
      "Cultura Judía",
      "Economía",
      "Educación Judía",
      "Físico Química",
      "Formación Ética y Ciudadana",
      "Geografía",
      "Historia",
      "Inglés",
      "Lengua y Literatura",
      "Matemática",
    ],
  },

  "4°": {
    TIC: [
      "Arte",
      "Bases de Datos",
      "Cultura Judía",
      "Educación Judía",
      "Estructura y Funcionamiento de Sistemas Informáticos",
      "Física",
      "Formación Ética y Ciudadana",
      "Geografía",
      "Historia",
      "Inglés",
      "Lengua y Literatura",
      "Matemática",
      "Modelado e Interacción 3D",
      "Taller de Programación",
    ],
    Medios: [
      "Arte",
      "Comunicación, Discursos Sociales y Medios",
      "Cultura Judía",
      "Diseño y Tecnología",
      "Educación Judía",
      "Física",
      "Formación Ética y Ciudadana",
      "Geografía",
      "Historia",
      "Inglés",
      "Lengua y Literatura",
      "Matemática",
      "Taller Anual de Arte y Diseño",
      "Tecnologías de la Información",
      "Teorías de la Comunicación",
    ],
    Gestión: [
      "Cultura Judía",
      "Derecho",
      "Economía",
      "Educación Judía",
      "Física",
      "Formación Ética y Ciudadana",
      "Geografía",
      "Historia",
      "Inglés",
      "Lengua y Literatura",
      "Matemática",
      "Sistemas Administrativos",
      "Sistemas de Información Contable",
      "Tecnologías de la Información",
    ],
    Diseño: [
      "Arte",
      "Cultura Judía",
      "Educación Judía",
      "Física",
      "Formación Ética y Ciudadana",
      "Geografía",
      "Historia",
      "Inglés",
      "Lengua y Literatura",
      "Matemática",
    ],
  },

  "5°": {
    TIC: [
      "Cultura Judía",
      "Desarrollo de Aplicaciones Informáticas",
      "Desarrollo de Proyectos de Producción",
      "Educación Judía",
      "Estructura y Funcionamiento de Sistemas Informáticos",
      "Filosofía",
      "Historia",
      "Inglés",
      "Lengua y Literatura",
      "Matemática",
      "Química",
      "Seminario de Informática y Telecomunicaciones",
      "Sistemas de Comunicación de Datos",
      "Sistemas Embebidos",
      "Tecnología de la Información",
    ],
    Medios: [
      "Comunicación, Tecnología y Sociedad",
      "Cultura Judía",
      "Educación Judía",
      "Filosofía",
      "Historia",
      "Inglés",
      "Lengua y Literatura",
      "Matemática",
      "Proyecto de Comunicación",
      "Química",
      "Taller Anual de Producción Gráfica",
      "Taller Anual de Producción Multimedial",
      "Tecnología de la Información",
    ],
    Gestión: [
      "Contabilidad Patrimonial y de Gestión",
      "Cultura Judía",
      "Derecho",
      "Economía",
      "Educación Judía",
      "Filosofía",
      "Historia",
      "Inglés",
      "Lengua y Literatura",
      "Matemática",
      "Producción",
      "Proyecto Organizacional",
      "Química",
      "Tecnología de la Información",
    ],
    Diseño: [
      "Cultura Judía",
      "Educación Judía",
      "Filosofía",
      "Inglés",
      "Lengua y Literatura",
      "Matemática",
      "Química",
    ],
  },
};
