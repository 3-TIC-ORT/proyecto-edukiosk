// Importaciones y dependencias
import { mensajePopUp, colores } from "../Funciones/popUp.js";
import { fileToBase64 } from "../Funciones/buffer.js";
// Assuming this is imported from a module, NOT defined locally
import { materiasPorGradoYEspecialidad } from "../Funciones/filtrado.js"; 

// Servidor
connect2Server(3000);

document.addEventListener('DOMContentLoaded', () => {

    // ==== 1. Selección de Elementos del DOM ====
    const selRecurso = document.getElementById('recurso');
    const precioc = document.getElementById('campoprecios');
    const inputPrecio = document.getElementById('Precios');

    const selGrado = document.getElementById('grado');
    const selEspecialidad = document.getElementById('especialidad');
    const selMateria = document.getElementById('materia');
    const campoEspecialidad = document.getElementById('campoEspecialidad');
    // FIX: Using the correct input ID for the file input
    const inputImagen = document.getElementById('imagen'); 
    const rectangulo = document.getElementById('previewRect'); // Preview element

    const form = document.getElementById('formPublicar');
    const tituloInput = document.getElementById('Titulo');
    const descripcionInput = document.getElementById('descripcion');
    // FIX: Variables for elements present in HTML but not used in the previous JS
    const profesorInput = document.getElementById('profesor'); 
    const añoEscolarInput = document.getElementById('Año-Escolar');

    // ==== 2. Lógica de UI y Filtros ====

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
        const debeMostrar = tipo === 'Libro';
        precioc.style.display = debeMostrar ? 'block' : 'none';
        inputPrecio.required = debeMostrar;
        if (!debeMostrar) inputPrecio.value = '';
    }

    function actualizarEspecialidadesSegunGrado() {
        const grado = selGrado.value;
        const labelEspecialidad = campoEspecialidad.querySelector('.text-wrapper'); // Select the label div inside the container
        const debeMostrar = (grado === '3°' || grado === '4°' || grado === '5°');

        campoEspecialidad.style.display = debeMostrar ? 'block' : 'none';
        labelEspecialidad.style.display = debeMostrar ? 'block' : 'none'; // Show/hide the label
        selEspecialidad.style.display = debeMostrar ? 'block' : 'none'; // Show/hide the select
        selEspecialidad.required = debeMostrar;

        if (debeMostrar) {
            setOptions(selEspecialidad, ["TIC", "Diseño", "Gestión", "Medios"], "Selecciona la especialidad");
        } else {
            // Reset and hide if not applicable
            setOptions(selEspecialidad, [], "Selecciona la especialidad");
        }

        actualizarMateriasSegunGradoYEspecialidad();
    }

    function actualizarMateriasSegunGradoYEspecialidad() {
        const grado = selGrado.value;
        const esp = selEspecialidad.value;
        let materias = [];
        let placeholder = "Selecciona la materia";

        if (['3°', '4°', '5°'].includes(grado)) {
            materias = (materiasPorGradoYEspecialidad[grado] && materiasPorGradoYEspecialidad[grado][esp]) || [];
        } else {
            materias = materiasPorGradoYEspecialidad[grado] || [];
        }

        setOptions(selMateria, materias, placeholder);
    }

    // ==== 3. Event Listeners y Inicialización ====

    selRecurso.addEventListener('change', actualizarPrecioSegunTipo);
    selGrado.addEventListener('change', actualizarEspecialidadesSegunGrado);
    selEspecialidad.addEventListener('change', actualizarMateriasSegunGradoYEspecialidad);

    // Image Preview Handlers
    rectangulo.addEventListener('click', () => inputImagen.click());
    inputImagen.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            rectangulo.style.backgroundImage = `url(${ev.target.result})`;
            rectangulo.style.backgroundSize = 'cover';
            rectangulo.style.backgroundPosition = 'center';
        };
        reader.readAsDataURL(file);
    });

    // Inicializa la UI
    actualizarPrecioSegunTipo();
    actualizarEspecialidadesSegunGrado();

    // Caracteres prohibidos para la validación
    const caracteresProhibidos = [
        '!', '@', '#', '$', '%', '^', '&', '*', '(', ')',
        '+', '=', '{', '}', '[', ']', '|', '\\', ':', ';',
        '"', "'", '<', '>', ',', '?', '/', '`', '~'
    ];

    // ==== 4. Form Submission Logic ====

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const titulo = tituloInput.value.trim();
        const descripcion = descripcionInput.value.trim();
        const file = inputImagen.files[0];

        // Validation: Image
        if (!file) {
            mensajePopUp("Debe seleccionar una imagen", colores.error);
            return;
        }

        // Validation: Prohibited Characters
        const contieneCaracteresProhibidos = (texto) => {
            return caracteresProhibidos.some((char) => texto.includes(char));
        };

        if (contieneCaracteresProhibidos(titulo) || contieneCaracteresProhibidos(descripcion)) {
            mensajePopUp(
                "El título o la descripción no pueden contener caracteres especiales.",
                colores.error
            );
            return;
        }

        try {
            // Get user data from localStorage
            const dueñoDataString = localStorage.getItem("usuarioSesion");
            if (!dueñoDataString) {
                mensajePopUp("Debe iniciar sesión para publicar.", colores.error);
                return;
            }
            const dueño = JSON.parse(dueñoDataString);
            
            // Convert image to base64
            const imagen = await fileToBase64(file);

            // Construct the publication object
            const publicacion = {
                titulo: titulo,
                descripcion: descripcion,
                recurso: selRecurso.value,
                grado: selGrado.value,
                especialidad: ['3°', '4°', '5°'].includes(selGrado.value) ? selEspecialidad.value : "",
                profesor: profesorInput.value || "", 
                añoEscolar: añoEscolarInput.value || "", 
                materia: selMateria.value,
                precio: inputPrecio.required ? Number(inputPrecio.value) : 0,
                fecha: Date.now(),
                imagen: imagen, // Base64 string for server processing
                // FIX: Add owner and contact data for server processing
                dueño: dueño.username, 
                mail: dueño.email, // mail is used for saving the image and filtering publications
                contacto: {
                    mail: dueño.email,
                    tel: dueño.tel || "N/A", 
                },
                comentarios: [],
                solicitudes: []
            };

            // Post event to server
            postEvent('publicar', publicacion, (res) => {
                if (res && res.success) {
                    mensajePopUp('Publicacion creada con exito.', colores.exito);
                    form.reset();
                    rectangulo.style.backgroundImage = ''; // Clear image preview
                    actualizarPrecioSegunTipo();
                    actualizarEspecialidadesSegunGrado();
                } else {
                    mensajePopUp(`Error al crear la publicación: ${res.info || ''}`, colores.error);
                }
            });

        } catch (err) {
            mensajePopUp('Error al procesar la imagen o obtener datos de sesión', colores.error);
            console.error('Error:', err);
        }
    });
});