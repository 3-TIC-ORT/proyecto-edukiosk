document.addEventListener('DOMContentLoaded', () => {
  const selRecurso = document.getElementById('recurso');
  const precioc = document.getElementById('campoprecios');
  const inputPrecio = document.getElementById('Precios');
  const selGrado = document.getElementById('grado');
  const selEspecialidad = document.getElementById('especialidad');
  const selMateria = document.getElementById('materia');

  const materiasPorGradoYEspecialidad = {
    '1°': [''],
    '2°': [''],
    '3°': {
      'TIC': [''],
      'Medio': [''],
      'Gestión': [''],
      'TIMI': ['']
    },
    '4°': {
      'TIC': [''],
      'Medio': [''],
      'Gestión': [''],
      'TIMI': ['']
    },
    '5°': {
      'TIC': [''],
      'Medio': [''],
      'Gestión': [''],
      'TIMI': ['']
    }
  };

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

    if (gradoSeleccionado === '3°' || gradoSeleccionado === '4°' || gradoSeleccionado === '5°') {
      selEspecialidad.style.display = '';
      selEspecialidad.previousElementSibling.style.display = ''; // Mostrar etiqueta
    } else {
      selEspecialidad.style.display = 'none';
      selEspecialidad.previousElementSibling.style.display = 'none'; // Ocultar etiqueta
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