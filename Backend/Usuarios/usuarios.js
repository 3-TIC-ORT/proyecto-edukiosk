// Usuarios.js


// Dependencias

import { subscribePOSTEvent, subscribeGETEvent } from "soquetic";
import fs from "fs"

// Registro de usuarios

subscribePOSTEvent("info", (data) => {
    try{
        fs.appendFileSync("usuarios.json", `${JSON.stringify(data)}\n`);
        
        return {success: true};
    }
    catch{
        console.log("Algo salió mal");
        return {success: false};
    }
});

