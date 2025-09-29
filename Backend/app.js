import { startServer, subscribeGETEvent, subscribePOSTEvent } from "soquetic";
import { registrarUsuario }  from "./Usuarios/usuarios.js";
import path from "path";
import { fileURLToPath } from "url"; 
import { dirname } from "path";     

startServer(3000);


subscribePOSTEvent("info", registrarUsuario);