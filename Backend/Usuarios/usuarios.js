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

    const usernameExists = usuarios.some(
      (useri) => (useri.username ?? "") === (data.user ?? "")
    );
    const emailExists = usuarios.some(
      (useri) => (useri.email ?? "") === (data.email ?? "")
    );

    if (usernameExists || emailExists) {
      return {
        success: false,
        info: "Nombre de usuario o correo ya registrado",
        usernameExists,
        emailExists
      };
    }
    usuarios.push(data);
    fs.writeFileSync(directorioJSON, JSON.stringify(usuarios, null, 2));

    return { success: true, info: "Usuario registrado con éxito" };
  } catch (error) {
    console.error("Algo salió mal:", error);
    return { success: false, info: "Algo salió mal" };
  }
}

export function loginUsuario(data) {
  try {
    let usuarioSesion = null;

    if (fs.existsSync(directorioJSON)) {
      const jeison = fs.readFileSync(directorioJSON, "utf-8");
      const usuarios = JSON.parse(jeison);
      usuarioSesion = usuarios.find(
        (usuario) =>
          data.email === usuario.email && data.password === usuario.password
      );
    }

    if (usuarioSesion) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch {
    return { success: false };
  }
}
