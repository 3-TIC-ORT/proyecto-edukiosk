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
        emailExists,
      };
    }
    usuarios.push(data);
    fs.writeFileSync(directorioJSON, JSON.stringify(usuarios, null, 2));

    return {
      success: true,
      info: "Usuario registrado con éxito",
    };
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
      return {
        success: true,
        user: {
          email: usuarioSesion.email,
          username: usuarioSesion.user,
          contraseña: usuarioSesion.password,
          pfp: usuarioSesion.pfp || "/Imagenes/fotosPerfil/defaultPerfil.jpg",
          rating: usuarioSesion.rating || 0,
          description: usuarioSesion.description || "",
        },
      };
    } else {
      return {
        success: false,
        info: "Correo o contraseña incorrectos",
      };
    }
  } catch {
    return {
      success: false,
      info: "Algo salió mal",
    };
  }
}

export function quitarFoto(data) {
  const { email, pfp } = data;

  try {
    if (!fs.existsSync(directorioJSON)) {
      return { success: false, info: "No se encontró el archivo de usuarios" };
    }
    const jeison = fs.readFileSync(directorioJSON, "utf-8");
    let usuarios = JSON.parse(jeison);
    const userIndex = usuarios.findIndex(
      (usuario) => usuario.email === data.email
    );
    if (userIndex === -1) {
      return { success: false, info: "Usuario no encontrado." };
    }
    usuarios[userIndex].pfp = pfp;
    fs.writeFileSync(directorioJSON, JSON.stringify(usuarios, null, 2));
    return { success: true, info: "Foto de perfil restablecida" };
  } catch (error) {
    console.error("Error al restablecer la foto de perfil:", error);
    return {
      success: false,
      info: "Ha ocurrido un error en el restablecimiento de la foto de perfil",
    };
  }
}

export function subirFotoPerfil(data) {
  const { email, pfp } = data;

  try {
    if (!fs.existsSync(directorioJSON)) {
      return { success: false, info: "No se encontró el archivo de usuarios" };
    }
    const jeison = fs.readFileSync(directorioJSON, "utf-8");
    let usuarios = JSON.parse(jeison);
    const userIndex = usuarios.findIndex(
      (usuario) => usuario.email === data.email
    );
    if (userIndex === -1) {
      return { success: false, info: "Usuario no encontrado." };
    }
    fs.writeFileSync(directorioJSON, JSON.stringify(usuarios, null, 2));
    return { success: true, info: "Foto de perfil modificada" };
  } catch (error) {
    console.error("Error al modificar la foto de perfil:", error);
    return {
      success: false,
      info: "Ha ocurrido un error en la modificación de la foto de perfil",
    };
  }
}

export function checkeoUsername(data) {
  let usuarios = [];
  const jeison = fs.readFileSync(directorioJSON, "utf-8");

  if (jeison !== "") {
    usuarios = JSON.parse(jeison);
  }

  const usernameExists = usuarios.some(
    (useri) => (useri.user ?? "") === (data.user ?? "")
  );

  if (usernameExists) {
    return { success: false, info: "El nombre de usuario ya está en uso" };
  } else {
    return { success: true, info: "El nombre de usuario está disponible" };
  }
}

export function guardarCambiosPerfil(data) {
  let usuarios = [];

  // ✅ FIX 1: Desestructurar con las claves que realmente envía el frontend
  const { user, password, email, pfp, rating, descripcion } = data;

  try {
    if (!fs.existsSync(directorioJSON)) {
      fs.writeFileSync(directorioJSON, "[]");
    }

    const jeison = fs.readFileSync(directorioJSON, "utf-8");

    if (jeison !== "") {
      usuarios = JSON.parse(jeison);
    }

    // 2. Usar 'email' de la desestructuración
    const userIndex = usuarios.findIndex((usuario) => usuario.email === email);

    if (userIndex == -1) {
      return { success: false, info: "Usuario no encontrado" };
    }

    // 3. FIX 2: Sobrescribir el objeto asegurando que las claves del JSON usen las variables limpias
    usuarios[userIndex] = {
      user: user, // Clave 'user' con valor de la variable 'user'
      password: password, // Clave 'password' con valor de la variable 'password'
      email: email,
      pfp: pfp,
      rating: rating,
      descripcion: descripcion, // Clave 'descripcion' con valor de la variable 'descripcion'
    };

    // El resto del código de guardado ya es correcto
    fs.writeFileSync(directorioJSON, JSON.stringify(usuarios, null, 2));

    return { success: true, info: "Se actualizó la información con exito" };
  } catch (error) {
    console.error("Error al guardar cambios de perfil:", error);
    return { success: false, info: "Ocurrio un error interno en el servidor" };
  }
}
