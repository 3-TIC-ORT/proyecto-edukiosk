<<<<<<< HEAD
const selMateria = document.getElementById('materia');
=======
document.addEventListener('DOMContentLoaded', () => {
  const selRecurso = document.getElementById('recurso');
  const precioc = document.getElementById('campoprecios');
  const inputPrecio = document.getElementById('Precios');
  const selGrado = document.getElementById('grado');
  const selEspecialidad = document.getElementById('especialidad');
  const selMateria = document.getElementById('materia');
>>>>>>> parent of ec337b8 (Mejorando cosas)

  const materiasPorGradoYEspecialidad = {
    '1°': ["Artes", "Biología", "Educación Judía", "Educación Tecnológica", "Formación Ética y Ciudadana", "Geografía", "Historia", "Lengua y Literatura", "Matemática", "Inglés"],
    '2°': ["Artes", "Biología", "Educación Judía", "Educación Tecnológica", "Formación Ética y Ciudadana", "Geografía", "Historia", "Lengua y Literatura", "Matemática", "Inglés"],

<<<<<<< HEAD
    '3°': {     
       'TIC': ["Biología", "Cultura Judía", "Economía", "Educación Judía", "Físico Química", "Formación Ética y Ciudadana", "Geografía", "Historia", "Inglés", "Lengua y Literatura", "Matemática", "TIMI", "Hardware", "Software", "Tecnologías de la Información"],
=======
    '3°': {
      'TIC': ["Biología", "Cultura Judía", "Economía", "Educación Judía", "Físico Química", "Formación Ética y Ciudadana", "Geografía", "Historia", "Inglés", "Lengua y Literatura", "Matemática", "TIMI", "Hardware", "Software", "Tecnologías de la Información"],
>>>>>>> parent of ec337b8 (Mejorando cosas)
      'Medio': ["Biología", "Cultura Judía", "Diseño y Tecnología", "Economía", "Educación Judía", "Físico Química", "Formación Ética y Ciudadana", "Geografía", "Historia", "Inglés", "Introducción al Estudio de la Comunicación", "Lengua y Literatura", "Matemática", "Realización y Producción Sonora", "Tecnologías de la Información"],
      'Gestión': ["Biología", "Cultura Judía", "Derecho", "Economía", "Educación Judía", "Físico Química", "Formación Ética y Ciudadana", "Geografía", "Historia", "Inglés", "Introducción a la Contabilidad", "Lengua y Literatura", "Matemática", "Organizaciones", "Tecnologías de la Información"],
      'Diseño': ["Biología", "Cultura Judía", "Economía", "Educación Judía", "Físico Química", "Formación Ética y Ciudadana", "Geografía", "Historia", "Inglés", "Lengua y Literatura", "Matemática"]
    },

    '4°': {
      'TIC': ["Arte", "Bases de Datos", "Cultura Judía", "Educación Judía", "Estructura y Funcionamiento de Sistemas Informáticos", "Física", "Formación Ética y Ciudadana", "Geografía", "Historia", "Inglés", "Lengua y Literatura", "Matemática", "Modelado e Interacción 3D", "Taller de Programación"],
      'Medio': ["Arte", "Comunicación, Discursos Sociales y Medios", "Cultura Judía", "Diseño y Tecnología", "Educación Judía", "Física", "Formación Ética y Ciudadana", "Geografía", "Historia", "Inglés", "Lengua y Literatura", "Matemática", "Taller Anual de Arte y Diseño", "Tecnologías de la Información", "Teorías de la Comunicación"],
      'Gestión': ["Cultura Judía", "Derecho", "Economía", "Educación Judía", "Física", "Formación Ética y Ciudadana", "Geografía", "Historia", "Inglés", "Lengua y Literatura", "Matemática", "Sistemas Administrativos", "Sistemas de Información Contable", "Tecnologías de la Información"],
      'Diseño': ["Arte", "Cultura Judía", "Educación Judía", "Física", "Formación Ética y Ciudadana", "Geografía", "Historia", "Inglés", "Lengua y Literatura", "Matemática"]
    },
    '5°': {
      'TIC': ["Cultura Judía", "Desarrollo de Aplicaciones Informáticas", "Desarrollo de Proyectos de Producción", "Educación Judía", "Estructura y Funcionamiento de Sistemas Informáticos", "Filosofía", "Historia", "Inglés", "Lengua y Literatura", "Matemática", "Química", "Seminario de Informática y Telecomunicaciones", "Sistemas de Comunicación de Datos", "Sistemas Embebidos", "Tecnología de la Información"],
      'Medio': ["Comunicación, Tecnología y Sociedad", "Cultura Judía", "Educación Judía", "Filosofía", "Historia", "Inglés", "Lengua y Literatura", "Matemática", "Proyecto de Comunicación", "Química", "Taller Anual de Producción Gráfica", "Taller Anual de Producción Multimedial", "Tecnología de la Información"],
      'Gestión': ["Contabilidad Patrimonial y de Gestión", "Cultura Judía", "Derecho", "Economía", "Educación Judía", "Filosofía", "Historia", "Inglés", "Lengua y Literatura", "Matemática", "Producción", "Proyecto Organizacional", "Química", "Tecnología de la Información"],
      'Diseño': ["Cultura Judía", "Educación Judía", "Filosofía", "Inglés", "Lengua y Literatura", "Matemática", "Química"]
    }
  };

<<<<<<< HEAD
  function actualizarEspecialidadesSegunGrado() {
    const gradoSeleccionado = selGrado.value;
    const especialidades = ["TIC", "Diseño", "Gestión", "Medio"];

    selEspecialidad.innerHTML = "";
    const labelEspecialidad = selEspecialidad.previousElementSibling;


    if (gradoSeleccionado === '3°' || gradoSeleccionado === '4°' || gradoSeleccionado === '5°') {
      selEspecialidad.style.display = '';
      labelEspecialidad.style.display = '';

      especialidades.forEach(especialidad => {
        const option = document.createElement('option');
        option.value = especialidad;
        option.textContent = especialidad;
        selEspecialidad.appendChild(option);
      });
    } else {
      selEspecialidad.style.display = 'none';
      
      labelEspecialidad.style.display = 'none';
      selEspecialidad.value = '';
    }
    selGrado.addEventListener('change', actualizarEspecialidadesSegunGrado);
    selEspecialidad.addEventListener('change', actualizarMateriasSegunGradoYEspecialidad);

  actualizarPrecioSegunTipo();
  actualizarEspecialidadesSegunGrado();
};
=======
  function actualizarPrecioSegunTipo() {
    const tipo = selRecurso.value;
    const debeMostrar = tipo === 'Libro' || tipo === 'Clases particulares';

    if (debeMostrar) {
      precioc.style.display = '';
      inputPrecio.required = true;
    } else {
      precioc.style.display = 'none';
      inputPrecio.required = false;
      inputPrecio.value = '';
    }
  }

  function actualizarEspecialidadesSegunGrado() {
    const gradoSeleccionado = selGrado.value;
    const especialidades = ["TIC", "Diseño", "Gestión", "Medio"];

    selEspecialidad.innerHTML = "";
    const labelEspecialidad = selEspecialidad.previousElementSibling;

    if (gradoSeleccionado === '3°' || gradoSeleccionado === '4°' || gradoSeleccionado === '5°') {
      selEspecialidad.style.display = '';
      labelEspecialidad.style.display = '';

      especialidades.forEach(especialidad => {
        const option = document.createElement('option');
        option.value = especialidad;
        option.textContent = especialidad;
        selEspecialidad.appendChild(option);
      });
    } else {
      selEspecialidad.style.display = 'none';
      labelEspecialidad.style.display = 'none';
      selEspecialidad.value = '';
    }

    actualizarMateriasSegunGradoYEspecialidad();
  }

  function actualizarMateriasSegunGradoYEspecialidad() {
    const gradoSeleccionado = selGrado.value;
    const especialidadSeleccionada = selEspecialidad.value;

    let materias = [];

    if (gradoSeleccionado === '3°' || gradoSeleccionado === '4°' || gradoSeleccionado === '5°') {
      materias = materiasPorGradoYEspecialidad[gradoSeleccionado][especialidadSeleccionada] || [];
    } else {
      materias = materiasPorGradoYEspecialidad[gradoSeleccionado] || [];
    }

    selMateria.innerHTML = '';

    materias.forEach(materia => {
      const option = document.createElement('option');
      option.value = materia;
      option.textContent = materia;
      selMateria.appendChild(option);
    });
  }

  selRecurso.addEventListener('change', actualizarPrecioSegunTipo);
  selGrado.addEventListener('change', actualizarEspecialidadesSegunGrado);
  selEspecialidad.addEventListener('change', actualizarMateriasSegunGradoYEspecialidad);


  actualizarPrecioSegunTipo();
  actualizarEspecialidadesSegunGrado();
});
>>>>>>> parent of ec337b8 (Mejorando cosas)
