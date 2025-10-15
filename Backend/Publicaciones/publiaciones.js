// ==== Usuarios.js ==== \\

// Modulos y dependencias

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const directorioJSON = path.resolve(__dirname, "usuarios.json");
const dirImagenes = path.join(__dirname, "../../Imagenes/fotosPerfil");

export function guardarPublicacion(data) {
    
}