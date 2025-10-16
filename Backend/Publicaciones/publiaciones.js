// ==== Usuarios.js ==== \\

// Modulos y dependencias

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const directorioJSON = path.resolve(__dirname, "publicaciones.json");
const dirImagenes = path.join(__dirname, "../../Imagenes/fotosPublicacion");

export function guardarPublicacion(data) {
  let { titulo, dueño, imagen } = data;
  let publicaciones = [];

  try {
    if (!fs.existsSync(directorioJSON)) {
      fs.writeFileSync(directorioJSON, "[]");
    }

    const jeison = fs.readFileSync(directorioJSON, "utf-8");

    if (jeison !== "") {
      publicaciones = JSON.parse(jeison);
    }

    const uniqueID = Math.floor(Math.random() * 1000000);

    const safeTitulo = titulo.replace(/[^a-z0-9]/gi, "_").toLowerCase();

    const fileName = `${dueño}-${safeTitulo}-${uniqueID}.png`;
    const filePath = path.join(dirImagenes, fileName);

    const buffer = Buffer.from(imagen, "base64");
    fs.writeFileSync(filePath, buffer);

    data.imagen = `/Imagenes/fotosPublicacion/${fileName}`;

    publicaciones.push(data);

    fs.writeFileSync(directorioJSON, JSON.stringify(publicaciones, null, 2));

    return { success: true, info: "Publicacion Creada" };
  } catch {
    return { success: false, info: "Error al crear publicacion" };
  }
}

export function obtenerPublicacionesPerfil(data) {
  let { dueño } = data;
  let publicaciones = [];
  let publicacionesPropias = [];

  try {
    if (!fs.existsSync(directorioJSON)) {
      fs.writeFileSync(directorioJSON, "[]");
    }

    const jeison = fs.readFileSync(directorioJSON, "utf-8");

    if (jeison !== "") {
      publicaciones = JSON.parse(jeison);
    }

    for(let i = 0; i < publicaciones.length; i++){
        if(publicaciones[i].dueño === data.dueño) {
            publicacionesPropias.push(publicaciones[i])
            continue;
        }
        else{
            continue;
        }
    }
    return { success: true, publicacionesPropias, info: "Publicaciones importadas con exito" }
  } catch {
    return { success: false, info: "Error al importar publicacion" }
  }
}
