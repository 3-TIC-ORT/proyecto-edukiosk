import fs from "fs";
import path from "path"; 
import { fileURLToPath } from "url"; 
import { dirname } from "path"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const directorioJSON = path.resolve(__dirname, "usuarios.json");

export function registrarUsuario(data) {
  let usuarios = [];

  try {
    if (!fs.existsSync(directorioJSON)) {
      fs.writeFileSync(directorioJSON, "[]");
    }

    const jeison = fs.readFileSync(directorioJSON, "utf-8");

    if (jeison !== "") {
      usuarios = JSON.parse(jeison);
    }

    usuarios.push(data);
    fs.writeFileSync(directorioJSON, JSON.stringify(usuarios, null, 2));
    console.log("Usuario registrado con éxito");

    return { success: true };
  } catch (error) {
    console.error("Algo salió mal:", error);
    return { success: false };
  }
}
