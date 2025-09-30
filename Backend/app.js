import { startServer, subscribeGETEvent, subscribePOSTEvent } from "soquetic";
import { registrarUsuario, loginUsuario }  from "./Usuarios/usuarios.js";
import path from "path";
import { fileURLToPath } from "url"; 
import { dirname } from "path";     

startServer(3000);


// Registro de usuario
subscribePOSTEvent("info", registrarUsuario);

// Login de usuario
subscribePOSTEvent("login", loginUsuario);

