const selMateria = document.getElementById('materia');

  const materiasPorGradoYEspecialidad = {
    '1°': ["Artes", "Biología", "Educación Judía", "Educación Tecnológica", "Formación Ética y Ciudadana", "Geografía", "Historia", "Lengua y Literatura", "Matemática", "Inglés"],
    '2°': ["Artes", "Biología", "Educación Judía", "Educación Tecnológica", "Formación Ética y Ciudadana", "Geografía", "Historia", "Lengua y Literatura", "Matemática", "Inglés"],

    '3°': {     
       'TIC': ["Biología", "Cultura Judía", "Economía", "Educación Judía", "Físico Química", "Formación Ética y Ciudadana", "Geografía", "Historia", "Inglés", "Lengua y Literatura", "Matemática", "TIMI", "Hardware", "Software", "Tecnologías de la Información"],
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