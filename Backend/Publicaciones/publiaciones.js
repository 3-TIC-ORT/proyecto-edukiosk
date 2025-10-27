// ==== Publicaciones.js ==== \\

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
  let { titulo, dueño, imagen, mail } = data;
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

    const fileName = `${mail.replace(
      /[@.]/g,
      "_"
    )}-${safeTitulo}-${uniqueID}.png`;
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
  let { dueño, mail } = data;
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

    for (let i = 0; i < publicaciones.length; i++) {
      if (publicaciones[i].mail === data.email) {
        publicacionesPropias.push(publicaciones[i]);
        continue;
      } else {
        continue;
      }
    }
    return {
      success: true,
      publicacionesPropias,
      info: "Publicaciones importadas con exito",
    };
  } catch {
    return { success: false, info: "Error al importar publicacion" };
  }
}

export function obtenerPublicaciones(data) {
  let publicaciones = [];
  let publicacionesAño = [];

  try {
    if (!fs.existsSync(directorioJSON)) {
      fs.writeFileSync(directorioJSON, "[]");
    }

    const jeison = fs.readFileSync(directorioJSON, "utf-8");

    if (jeison !== "") {
      publicaciones = JSON.parse(jeison);
    }

    publicacionesAño = publicaciones.filter(
      (publicacion) => publicacion.grado === data
    );

    return {
      success: true,
      publicacionesAño,
      info: "Publicaciones importadas exitosamente",
    };
  } catch {
    return { success: false, info: "Error al importar publicaciones" };
  }
}

export function borrarPublicacion(data) {
  const { mail, fecha } = data;
  let publicaciones = [];

  try {
    if (fs.existsSync(directorioJSON) && fs.statSync(directorioJSON).size > 0) {
      const jeison = fs.readFileSync(directorioJSON, "utf-8");
      if (jeison.trim().length > 0) {
        publicaciones = JSON.parse(jeison);
      }
    } else {
      return {
        success: false,
        info: "No se encontro el archivo de publicaciones",
      };
    }
    const fechaBuscada =
      typeof data === "object" && data !== null ? data.fecha : data;

    const indexToDelete = publicaciones.findIndex(
      (publicacion) => publicacion.fecha === fechaBuscada
    );
    if (indexToDelete !== -1) {
      const imagenWeb = publicaciones[indexToDelete].imagen || "";
      const imagenPath = imagenWeb.startsWith("/")
        ? path.resolve(__dirname, "..", "..", imagenWeb.slice(1))
        : path.resolve(__dirname, "..", "..", imagenWeb);

      if (imagenWeb && fs.existsSync(imagenPath)) {
        try {
          fs.unlinkSync(imagenPath);
        } catch (err) {
          return {
            success: false,
            info: err,
          };
        }
      } else {
        return {
          success: false,
          info: "Error al encontrar imagen",
        };
      }
      publicaciones.splice(indexToDelete, 1);
      fs.writeFileSync(directorioJSON, JSON.stringify(publicaciones, null, 2));
      return {
        success: true,
        info: "Se borro la publicacion de manera exitosa",
      };
    } else {
      return {
        success: false,
        info: "La publicación a borrar no fue encontrada (índice -1).",
      };
    }
  } catch (error) {
    return {
      success: false,
      info: "Ocurrió un error al borrar la publicación",
    };
  }
}

export function solicitarRecurso(data) {
  const dirUsuarios = path.resolve(__dirname, "../Usuarios/usuarios.json");
  const { fecha, solicitante } = data;
  let publicaciones = [];
  let usuarios = [];
  try {
    if (!fs.existsSync(directorioJSON)) {
      fs.writeFileSync(directorioJSON, "[]");
    }
    if (!fs.existsSync(dirUsuarios)) {
      fs.writeFileSync(dirUsuarios, "[]");
    }
    const jeisonPublicaciones = fs.readFileSync(directorioJSON, "utf-8");
    const jeisonUsuarios = fs.readFileSync(dirUsuarios, "utf-8");

    if (jeisonPublicaciones !== "" && jeisonUsuarios !== "") {
      publicaciones = JSON.parse(jeisonPublicaciones);
      usuarios = JSON.parse(jeisonUsuarios);
    }
    const indicePublicacion = publicaciones.findIndex(
      (publicacion) => fecha === publicacion.fecha
    );

    const indiceUsuario = usuarios.findIndex(
      (usuario) => solicitante.email === usuario.email
    );

    if (indicePublicacion == -1 || indiceUsuario == -1) {
      return {
        success: false,
        info: "No se encontro la publicacion",
        indicePublicacion,
        indiceUsuario,
        solicitante,
      };
    }

    const publicacionATrabajar = publicaciones[indicePublicacion];
    const usuarioATrabajar = usuarios[indiceUsuario];

    publicacionATrabajar.solicitudes.push(solicitante.user);
    usuarioATrabajar.solicitudes.push(publicacionATrabajar.fecha);
    usuarioATrabajar.notificaciones.push(
      `${solicitante.user} ha solicitado tu ${publicacionATrabajar.recurso}, "${publicacionATrabajar.titulo}"`
    );
    fs.writeFileSync(directorioJSON, JSON.stringify(publicaciones, null, 2));
    fs.writeFileSync(dirUsuarios, JSON.stringify(usuarios, null, 2));

    return { success: true, info: "Solicitud agregada con exito", publicacionATrabajar: JSON.stringify(publicacionATrabajar), usuarioATrabajar: JSON.stringify(usuarioATrabajar) };
  } catch (error) {
    return {
      success: false,
      info: "Ocurrió un error (runtime crash)",
      errorDetail: error.message || "Not Found",
      solicitante: solicitante || "Not Found",
      fecha: fecha || "Not found", 
      indicePublicacion: indicePublicacion || "Not Found",
      indiceUsuario: indiceUsuario || "Not Found",
    };
  }
}

// Comentarios logica

export function crearComentario(data) {
  
}