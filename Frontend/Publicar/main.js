
  import { mensajePopUp } from "../Funciones/popUp.js";

  document.addEventListener('DOMContentLoaded', () => {

    const selRecurso = document.getElementById('recurso');
    const precioc = document.getElementById('campoprecios');
    const inputPrecio = document.getElementById('Precios');

    const selGrado = document.getElementById('grado');
    const selEspecialidad = document.getElementById('especialidad');
    const selMateria = document.getElementById('materia');
    const campoEspecialidad = document.getElementById('campoEspecialidad');

    const form = document.getElementById('formPublicar');
    const tituloInput = document.getElementById('Titulo');
    const descripcionInput = document.getElementById('descripcion');
    const profesor = Document.getElementById('profesor')
    const añoEscolar =Document.getElementById('Año-Escolar')

    const materiasPorGradoYEspecialidad = {
      '1°': [
        "Artes", "Biología", "Educación Judía", "Educación Tecnológica",
        "Formación Ética y Ciudadana", "Geografía", "Historia",
        "Lengua y Literatura", "Matemática", "Inglés"
      ],
      '2°': [
        "Artes", "Biología", "Educación Judía", "Educación Tecnológica",
        "Formación Ética y Ciudadana", "Geografía", "Historia",
        "Lengua y Literatura", "Matemática", "Inglés"
      ],

      '3°': {
        'TIC': ["Biología", "Cultura Judía", "Economía", "Educación Judía", "Físico Química",
          "Formación Ética y Ciudadana", "Geografía", "Historia", "Inglés",
          "Lengua y Literatura", "Matemática", "TIMI", "Hardware", "Software", "Tecnologías de la Información"
        ],
        'Medio': ["Biología", "Cultura Judía", "Diseño y Tecnología", "Economía", "Educación Judía",
          "Físico Química", "Formación Ética y Ciudadana", "Geografía", "Historia", "Inglés",
          "Introducción al Estudio de la Comunicación", "Lengua y Literatura", "Matemática",
          "Realización y Producción Sonora", "Tecnologías de la Información"
        ],
        'Gestión': ["Biología", "Cultura Judía", "Derecho", "Economía", "Educación Judía",
          "Físico Química", "Formación Ética y Ciudadana", "Geografía", "Historia",
          "Inglés", "Introducción a la Contabilidad", "Lengua y Literatura",
          "Matemática", "Organizaciones", "Tecnologías de la Información"
        ],
        'Diseño': ["Biología", "Cultura Judía", "Economía", "Educación Judía",
          "Físico Química", "Formación Ética y Ciudadana", "Geografía", "Historia",
          "Inglés", "Lengua y Literatura", "Matemática"
        ]
      },

      '4°': {
        'TIC': ["Arte", "Bases de Datos", "Cultura Judía", "Educación Judía",
          "Estructura y Funcionamiento de Sistemas Informáticos", "Física",
          "Formación Ética y Ciudadana", "Geografía", "Historia", "Inglés",
          "Lengua y Literatura", "Matemática", "Modelado e Interacción 3D", "Taller de Programación"
        ],
        'Medio': ["Arte", "Comunicación, Discursos Sociales y Medios", "Cultura Judía",
          "Diseño y Tecnología", "Educación Judía", "Física",
          "Formación Ética y Ciudadana", "Geografía", "Historia", "Inglés",
          "Lengua y Literatura", "Matemática", "Taller Anual de Arte y Diseño",
          "Tecnologías de la Información", "Teorías de la Comunicación"
        ],
        'Gestión': ["Cultura Judía", "Derecho", "Economía", "Educación Judía", "Física",
          "Formación Ética y Ciudadana", "Geografía", "Historia", "Inglés",
          "Lengua y Literatura", "Matemática", "Sistemas Administrativos",
          "Sistemas de Información Contable", "Tecnologías de la Información"
        ],
        'Diseño': ["Arte", "Cultura Judía", "Educación Judía", "Física",
          "Formación Ética y Ciudadana", "Geografía", "Historia",
          "Inglés", "Lengua y Literatura", "Matemática"
        ]
      },

      '5°': {
        'TIC': ["Cultura Judía", "Desarrollo de Aplicaciones Informáticas", "Desarrollo de Proyectos de Producción",
          "Educación Judía", "Estructura y Funcionamiento de Sistemas Informáticos", "Filosofía",
          "Historia", "Inglés", "Lengua y Literatura", "Matemática", "Química",
          "Seminario de Informática y Telecomunicaciones", "Sistemas de Comunicación de Datos",
          "Sistemas Embebidos", "Tecnología de la Información"
        ],
        'Medio': ["Comunicación, Tecnología y Sociedad", "Cultura Judía", "Educación Judía",
          "Filosofía", "Historia", "Inglés", "Lengua y Literatura", "Matemática",
          "Proyecto de Comunicación", "Química", "Taller Anual de Producción Gráfica",
          "Taller Anual de Producción Multimedial", "Tecnología de la Información"
        ],
        'Gestión': ["Contabilidad Patrimonial y de Gestión", "Cultura Judía", "Derecho",
          "Economía", "Educación Judía", "Filosofía", "Historia", "Inglés",
          "Lengua y Literatura", "Matemática", "Producción", "Proyecto Organizacional",
          "Química", "Tecnología de la Información"
        ],
        'Diseño': ["Cultura Judía", "Educación Judía", "Filosofía", "Inglés",
          "Lengua y Literatura", "Matemática", "Química"
        ]
      },
    };

    function setOptions(select, opciones, placeholder = "") {
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
      precioc.style.display = debeMostrar ? 'block' : 'none';
      inputPrecio.required = debeMostrar;
      if (!debeMostrar) inputPrecio.value = '';
    }

    function actualizarEspecialidadesSegunGrado() {
      const grado = selGrado.value;
      const debeMostrar = (grado === '3°' || grado === '4°' || grado === '5°');

      campoEspecialidad.style.display = debeMostrar ? 'block' : 'none';
      selEspecialidad.required = debeMostrar;

      if (debeMostrar) {
        setOptions(selEspecialidad, ["TIC", "Diseño", "Gestión", "Medio"]);
      } else {
        selEspecialidad.value = '';
      }

      actualizarMateriasSegunGradoYEspecialidad();
    }

    function actualizarMateriasSegunGradoYEspecialidad() {
      const grado = selGrado.value;
      const esp = selEspecialidad.value;
      let materias = [];

      if (['3°', '4°', '5°'].includes(grado)) {
        materias = (materiasPorGradoYEspecialidad[grado] && materiasPorGradoYEspecialidad[grado][esp]) || [];
      } else {
        materias = materiasPorGradoYEspecialidad[grado] || [];
      }

      setOptions(selMateria, materias, "");
    }

    selRecurso.addEventListener('change', actualizarPrecioSegunTipo);
    selGrado.addEventListener('change', actualizarEspecialidadesSegunGrado);
    selEspecialidad.addEventListener('change', actualizarMateriasSegunGradoYEspecialidad);

    actualizarPrecioSegunTipo();
    actualizarEspecialidadesSegunGrado();

    const inputImagen = document.getElementById('imagen');
    const rectangulo = document.getElementById('previewRect');

    rectangulo.addEventListener('click', () => inputImagen.click());
    inputImagen.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        rectangulo.style.backgroundImage = `url(${ev.target.result})`;
      };
      reader.readAsDataURL(file);
    });
    const caracteresProhibidos = [
      '!', '@', '#', '$', '%', '^', '&', '*', '(', ')',
      '+', '=', '{', '}', '[', ']', '|', '\\', ':', ';',
      '"', "'", '<', '>', ',', '?', '/', '`', '~'
    ];
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const titulo = tituloInput.value.trim();
      const descripcion = descripcionInput.value.trim();

      const contieneCaracteresProhibidos = (texto) => {
        return caracteresProhibidos.some((char) => texto.includes(char));
      };

      if (contieneCaracteresProhibidos(titulo) || contieneCaracteresProhibidos(descripcion)) {
        mensajePopUp(
          "El título o la descripción no pueden contener caracteres especiales.",
          "#e92828ff"
        );
        return; 
      }

      const publicacion = {
        titulo: titulo,
        descripcion: descripcion,
        recurso: selRecurso.value,
        grado: selGrado.value,
        especialidad: ['3°', '4°', '5°'].includes(selGrado.value) ? selEspecialidad.value : "",
        profesor: profesor,
        añoEscolar: añoEscolar,
        materia: selMateria.value,
        precio: inputPrecio.required ? Number(inputPrecio.value) : 0,
        fecha: Date.now()
      };

      console.log('Publicación lista para enviar/guardar:', publicacion);
      form.reset();
      actualizarPrecioSegunTipo();
      actualizarEspecialidadesSegunGrado();
    })});