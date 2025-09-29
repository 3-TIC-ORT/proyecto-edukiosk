// Usuarios.js


// Dependencias

import { subscribePOSTEvent, subscribeGETEvent } from "soquetic";
import fs from "fs"

// Registro de usuarios

subscribePOSTEvent("info", (data) => {
    let parsedData = JSON.parse(data)
    fs.appendFileSync("usuarios.json", `${JSON.stringify(parsedData)}\n`);
    
    return parsedData;
});

