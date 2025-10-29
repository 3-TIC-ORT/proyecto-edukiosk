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

// ==== Reigstrar Usuario ==== \\

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

    const telExists = usuarios.some(
      (useri) => (useri.tel ?? "") === (data.tel ?? "")
    );

    if (usernameExists || emailExists) {
      return {
        success: false,
        info: "Nombre de usuario o correo ya registrado",
        usernameExists,
        emailExists,
      };
    }
    if (telExists) {
      return {
        success: false,
        info: "Número de telefono ya registrado",
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

// ==== Inicio de sesión ==== \\

export function loginUsuario(data) {
  try {
    let usuarioSesion = null;
    let usuarioIndex = null;
    let usuarios = [];

    if (fs.existsSync(directorioJSON)) {
      const jeison = fs.readFileSync(directorioJSON, "utf-8");
      usuarios = JSON.parse(jeison);
      usuarioSesion = usuarios.find(
        (usuario) =>
          data.email === usuario.email && data.password === usuario.password
      );
      usuarioIndex = usuarios.findIndex((user) => data.email === user.email);
    }
    if (usuarioSesion) {
      return {
        success: true,
        usuarioSesion: usuarios[usuarioIndex],
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

// ==== Página de perfil ==== \\

// ==== Restrablecer foto de perfil ==== \\

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

// ==== Subir foto de perfil ==== \\

export function subirFotoPerfil(data) {
  const { email, file } = data;
  try {
    if (!fs.existsSync(directorioJSON) || !fs.existsSync(dirImagenes)) {
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

    const fileName = `${email.replace(/[@.]/g, "_")}.png`;
    const filePath = path.join(dirImagenes, fileName);

    const buffer = Buffer.from(file, "base64");
    fs.writeFileSync(filePath, buffer);

    usuarios[userIndex].pfp = `/Imagenes/fotosPerfil/${fileName}`;

    fs.writeFileSync(directorioJSON, JSON.stringify(usuarios, null, 2));
    return {
      success: true,
      info: "Foto de perfil modificada",
      ruta: `/Imagenes/fotosPerfil/${fileName}`,
    };
  } catch (error) {
    return {
      success: false,
      info: "Ha ocurrido un error en la modificación de la foto de perfil",
    };
  }
}

// Revisar si el nombre de usuario se encuentra en uso (pág perfil) \\

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

// ==== Guardar modificaciones al perfil ==== \\
// (Solo Desc, Nombre y Contra)

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

// Cargar notificaciones

export function obtenerNotificaciones(data) {
  try {
    let usuarios = [];
    let notificaciones = [];

    if (!fs.existsSync(directorioJSON)) {
      fs.writeFileSync(directorioJSON, "[]");
    }

    const jeison = fs.readFileSync(directorioJSON, "utf-8");

    if (jeison !== "") {
      usuarios = JSON.parse(jeison);
    }

    const userIndex = usuarios.findIndex((usuario) => usuario.email === data.email);

    if (userIndex == -1) {
      return { success: false, info: "Usuario no encontrado" };
    }

    notificaciones = usuarios[userIndex].notificaciones;

    return { notificaciones, success: true }
  } catch (error) {}
}
