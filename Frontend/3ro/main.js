import { mensajePopUp, colores } from "../Funciones/popUp.js";
import { cajaProducto } from "../Funciones/crearCajaPublicacion.js";
import {
    aplicarFiltros,
    materiasPorGradoYEspecialidad,
} from "../Funciones/filtrado.js";

const selMateria = document.getElementById("materia");
const selRecurso = document.getElementById("recurso");
const selEspecialidad = document.getElementById("especialidad");
const containerProductos = document.getElementById("containerProductos");

connect2Server(3000);
let publicaciones = [];
const grado = "3°"; 

function popularFiltros() {
    const dataGrado = materiasPorGradoYEspecialidad[grado];

    selMateria.innerHTML = '<option value="">Selecciona una opción</option>';

    if (!selEspecialidad || !dataGrado) return;

    if (typeof dataGrado === "object" && !Array.isArray(dataGrado)) {
        
        selEspecialidad.innerHTML = '<option value="">Especialidad</option>';
        selEspecialidad.disabled = false;

        let materiasUnicas = new Set();

        for (const especialidadKey in dataGrado) {
            if (dataGrado.hasOwnProperty(especialidadKey)) {
                
                const opEspec = document.createElement('option');
                opEspec.textContent = especialidadKey;
                opEspec.value = especialidadKey;
                selEspecialidad.appendChild(opEspec);

                dataGrado[especialidadKey].forEach(materia => materiasUnicas.add(materia));
            }
        }

        Array.from(materiasUnicas).sort().forEach(materia => {
            const op = document.createElement("option");
            op.textContent = materia;
            op.value = materia;
            selMateria.appendChild(op);
        });

        selMateria.style.display = "none";
        selMateria.classList.add("sr-only");
    }
}

function filtrarMateriasPorEspecialidad() {
    if (!selMateria || !selEspecialidad) return;
    
    const especialidadSeleccionada = selEspecialidad.value;
    const dataGrado = materiasPorGradoYEspecialidad[grado];

    selMateria.innerHTML = '<option value="">Materias</option>';

    if (!especialidadSeleccionada) {
        popularFiltros(); 
        return;
    }
    
    selMateria.style.display = "inline-block";
    selMateria.classList.remove("sr-only");

    const materiasDeEspecialidad = dataGrado[especialidadSeleccionada];

    if (materiasDeEspecialidad && Array.isArray(materiasDeEspecialidad)) {
        materiasDeEspecialidad.sort().forEach(materia => {
            const op = document.createElement("option");
            op.textContent = materia;
            op.value = materia;
            selMateria.appendChild(op);
        });
    }
}

postEvent("obtenerPublicaciones", grado, (res) => {
    if (res && res.success) {
        publicaciones = res.publicacionesAño;
        console.log(publicaciones);
        
        popularFiltros(); 
        
        cajaProducto(publicaciones, containerProductos); 
    } else {
        mensajePopUp("Error al importar publicaciones", colores.error);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    
    const runFiltros = (e) => {
        if (e) e.preventDefault();
        
        aplicarFiltros(
            publicaciones,
            selMateria,
            selRecurso,
            selEspecialidad,
            cajaProducto,
            containerProductos
        );
    };

    if (selMateria) selMateria.addEventListener("change", runFiltros);
    if (selRecurso) selRecurso.addEventListener("change", runFiltros);

    if (selEspecialidad) selEspecialidad.addEventListener("change", (e) => {
        e.preventDefault();
        
        filtrarMateriasPorEspecialidad(); 
        
        runFiltros();
    });
});