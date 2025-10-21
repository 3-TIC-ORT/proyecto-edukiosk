import { mensajePopUp, colores } from "../Funciones/popUp.js";
import { fileToBase64 } from "../Funciones/buffer.js";
import { materiasPorGradoYEspecialidad } from "../Funciones/filtrado.js"

connect2Server(3000);

document.addEventListener("DOMContentLoaded", () => {
  const selRecurso = document.getElementById("recurso");
  const precioc = document.getElementById("campoprecios");
  const inputPrecio = document.getElementById("Precios");

  const selGrado = document.getElementById("grado");
  const selEspecialidad = document.getElementById("especialidad");
  const selMateria = document.getElementById("materia");
  const selImagen = document.getElementById("imagen");

  const form = document.getElementById("formPublicar");
  const tituloInput = document.getElementById("Titulo");
  const descripcionInput = document.getElementById("descripcion");


  function setOptions(select, opciones, placeholder = "Selecciona una opción") {
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

  function actualizarPrecioSegunTipo() {
    const tipo = selRecurso.value;
    const debeMostrar = tipo === "Libro" || tipo === "Clases particulares";
    if (debeMostrar) {
      precioc.style.display = "";
      inputPrecio.required = true;
    } else {
      precioc.style.display = "none";
      inputPrecio.required = false;
      inputPrecio.value = "";
    }
  }

  function actualizarEspecialidadesSegunGrado() {
    const grado = selGrado.value;
    const labelEspecialidad = selEspecialidad.previousElementSibling;
    if (grado === "3°" || grado === "4°" || grado === "5°") {
      selEspecialidad.style.display = "";
      labelEspecialidad.style.display = "";
      selEspecialidad.required = true;
      setOptions(selEspecialidad, ["TIC", "Diseño", "Gestión", "Medios"]);
    } else {
      selEspecialidad.style.display = "none";
      labelEspecialidad.style.display = "none";
      selEspecialidad.required = false;
      selEspecialidad.value = "";
    }
    actualizarMateriasSegunGradoYEspecialidad();
  }

  function actualizarMateriasSegunGradoYEspecialidad() {
    const grado = selGrado.value;
    const esp = selEspecialidad.value;

    let materias = [];
    if (grado === "3°" || grado === "4°" || grado === "5°") {
      materias =
        (materiasPorGradoYEspecialidad[grado] &&
          materiasPorGradoYEspecialidad[grado][esp]) ||
        [];
    } else {
      materias = materiasPorGradoYEspecialidad[grado] || [];
    }
    setOptions(selMateria, materias, "Selecciona la materia");
  }

  selRecurso.addEventListener("change", actualizarPrecioSegunTipo);
  selGrado.addEventListener("change", actualizarEspecialidadesSegunGrado);
  selEspecialidad.addEventListener(
    "change",
    actualizarMateriasSegunGradoYEspecialidad
  );

  // Inicializa todo
  actualizarPrecioSegunTipo();
  actualizarEspecialidadesSegunGrado();

  // 2. Armado del objeto al enviar - CON ASYNC/AWAIT
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const file = selImagen.files[0];
    if (!file) {
      mensajePopUp("Por favor selecciona una imagen,", colores.error);
      return;
    }

    // 3. AWAIT the asynchronous conversion inside the submit handler
    const base64Image = file ? await fileToBase64(file) : "";
    const dueño = JSON.parse(localStorage.getItem("usuarioSesion"));
    const publicacion = {
      titulo: tituloInput.value.trim(),
      descripcion: descripcionInput.value.trim(),
      recurso: selRecurso.value,
      imagen: base64Image, // Use the awaited result here
      grado: selGrado.value,
      especialidad:
        selGrado.value === "3°" ||
        selGrado.value === "4°" ||
        selGrado.value === "5°"
          ? selEspecialidad.value
          : "",
      materia: selMateria.value,
      precio: inputPrecio.required ? Number(inputPrecio.value) : 0,
      fecha: Date.now(),
      dueño: dueño.username,
      mail: dueño.email,
      reseñas: 0,
      comentarios: []
    };
    console.log(publicacion);
    postEvent("publicar", publicacion, (data) => {
      if (data && data.success) {
        mensajePopUp("Recurso publicado con éxito", colores.exito);
        form.reset();
      } else {
        mensajePopUp("Error al publicar recurso.", colores.error);
      }
    });
  });
});
