document.addEventListener('DOMContentLoaded', () => {
  const selRecurso = document.getElementById('recurso');
  const precioc = document.getElementById('campoprecios');
  const inputPrecio = document.getElementById('Precios');

  const selGrado = document.getElementById('grado');
  const selEspecialidad = document.getElementById('especialidad');
  const selMateria = document.getElementById('materia');

  const form = document.getElementById('formPublicar');
  const tituloInput = document.getElementById('Titulo');
  const descripcionInput = document.getElementById('descripcion');

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

  function setOptions(select, opciones, placeholder = "Selecciona una opción") {
    select.innerHTML = "";
    const opt = document.createElement('option');
    opt.value = "";
    opt.textContent = placeholder;
    opt.disabled = true;
    opt.selected = true;
    select.appendChild(opt);

    opciones.forEach(txt => {
      const o = document.createElement('option');
      o.value = txt;
      o.textContent = txt;
      select.appendChild(o);
    });
  }

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
    const grado = selGrado.value;
    const labelEspecialidad = selEspecialidad.previousElementSibling;
    if (grado === '3°' || grado === '4°' || grado === '5°') {
      selEspecialidad.style.display = '';
      labelEspecialidad.style.display = '';
      selEspecialidad.required = true;
      setOptions(selEspecialidad, ["TIC", "Diseño", "Gestión", "Medio"]);
    } else {
      selEspecialidad.style.display = 'none';
      labelEspecialidad.style.display = 'none';
      selEspecialidad.required = false;
      selEspecialidad.value = '';
    }
    actualizarMateriasSegunGradoYEspecialidad();
  }

  function actualizarMateriasSegunGradoYEspecialidad() {
    const grado = selGrado.value;
    const esp = selEspecialidad.value;

    let materias = [];
    if (grado === '3°' || grado === '4°' || grado === '5°') {
      materias = (materiasPorGradoYEspecialidad[grado] && materiasPorGradoYEspecialidad[grado][esp]) || [];
    } else {
      materias = materiasPorGradoYEspecialidad[grado] || [];
    }
    setOptions(selMateria, materias, "Selecciona la materia");
  }

  selRecurso.addEventListener('change', actualizarPrecioSegunTipo);
  selGrado.addEventListener('change', actualizarEspecialidadesSegunGrado);
  selEspecialidad.addEventListener('change', actualizarMateriasSegunGradoYEspecialidad);

  // Inicializa todo
  actualizarPrecioSegunTipo();
  actualizarEspecialidadesSegunGrado();

  // Armado del objeto al enviar
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const publicacion = {
      titulo: tituloInput.value.trim(),
      descripcion: descripcionInput.value.trim(),
      recurso: selRecurso.value,
      grado: selGrado.value,
      especialidad: (selGrado.value === '3°' || selGrado.value === '4°' || selGrado.value === '5°') ? selEspecialidad.value : "",
      materia: selMateria.value,
      precio: inputPrecio.required ? Number(inputPrecio.value) : 0,
      fecha: Date.now()
    };

    console.log('Publicación lista para enviar/guardar:', publicacion);
    // acá podemos guardar el form en el localStorage
    form.reset();
    actualizarPrecioSegunTipo();
    actualizarEspecialidadesSegunGrado();
    alert('¡Publicación creada!');
  });
});
