import { startServer, subscribeGETEvent, subscribePOSTEvent } from "soquetic";
import { registrarUsuario, loginUsuario, quitarFoto, checkeoUsername, guardarCambiosPerfil, subirFotoPerfil }  from "./Usuarios/usuarios.js";
import path from "path";
import { fileURLToPath } from "url"; 
import { dirname } from "path";     
import fs from "fs";


startServer(3000);


// Registro de usuario
subscribePOSTEvent("info", registrarUsuario);

// Login de usuario
subscribePOSTEvent("login", loginUsuario);

// Sacar foto de perfil
subscribePOSTEvent("resetPFP", quitarFoto)

// Cambiar foto de perfil
subscribePOSTEvent("cambiarFoto", subirFotoPerfil)

// Revisar si el nombre de usuario esta disponible para la edición de perfil
subscribePOSTEvent("check", checkeoUsername)

// Guardar las modificaciones realizadas en la página de perfil
subscribePOSTEvent("guardar", guardarCambiosPerfil)