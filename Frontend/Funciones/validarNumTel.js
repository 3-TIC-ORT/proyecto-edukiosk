/**
 * Valida si la cadena proporcionada es un número de teléfono argentino válido.
 * Utiliza una RegEx para admitir formatos comunes con o sin prefijos (0, +54, 9, 15)
 * y separadores.
 * * @param {string} numTel El valor del input (string) a validar.
 * @returns {boolean} Retorna true si es un número válido, false en caso contrario.
 */
export function validarNumeroTelefono(numTel) {
  if (typeof numTel !== "string" || numTel.trim() === "") {
    return false;
  }

  // 1. Limpiar el string: Eliminar espacios, guiones, paréntesis, y prefijos comunes
  // que no son parte de los dígitos centrales.
  // Se eliminan todos los caracteres no numéricos excepto el '+'
  let cleanedPhone = numTel.replace(/[\s\-\(\)\.]/g, "");

  // 2. RegEx para un número argentino
  // La RegEx busca una secuencia de dígitos que, al limpiarse, se ajuste a los patrones.
  // Patrones admitidos:
  // - (+54)?: Código de país opcional.
  // - (0|9)? : Prefijo de larga distancia (0) o móvil (9) opcional.
  // - \d{2,4}: Código de área (2 a 4 dígitos, ej: 11, 221, 351).
  // - (15)? : Indicador móvil (15) opcional.
  // - \d{6,8}: Número de abonado (6 a 8 dígitos).

  // Una RegEx simple y efectiva sobre la cadena *limpia* de guiones y espacios:
  // Se enfoca en la cantidad de dígitos que deben quedar (8 a 14) y los prefijos.

  // Eliminar prefijos comunes que causan confusión, dejando solo los dígitos y el '+'.
  let digitsOnly = cleanedPhone.replace(/\D/g, "");

  // Si tiene +54 al inicio, lo removemos para enfocarnos en los dígitos locales
  if (digitsOnly.startsWith("54")) {
    digitsOnly = digitsOnly.substring(2);
  }

  // Si tiene un '9' o '15' de móvil inmediatamente después (y no es parte del código de área '11', '21', etc.)
  // Esto es complejo de manejar de forma genérica, así que nos centraremos en la longitud final.

  // Longitud estándar después de eliminar el '54' (País) y el '0' (Larga distancia):
  // 10 dígitos (ej: 11-xxxx-xxxx) o 8 dígitos (número local, sin código de área)

  const minLength = 8; // Mínimo número local (e.g., 4567-8901)
  const maxLength = 11; // Máximo con código de área (e.g., 011 15 xxxx xxxx -> 11 xxxx xxxx)

  // Si el número comienza con '0', lo eliminamos, ya que es el prefijo de larga distancia.
  if (digitsOnly.startsWith("0")) {
    digitsOnly = digitsOnly.substring(1);
  }
  // Si contiene el prefijo móvil '9' o '15', lo removemos si no forma parte de un código de área común (como '11')
  // Nota: Esto es arriesgado. El enfoque más seguro es la longitud mínima/máxima.

  if (digitsOnly.length >= minLength && digitsOnly.length <= maxLength) {
    // Es un número de 8 (local) a 11 (código de área + número largo) dígitos, que cubre la mayoría de casos.
    return true;
  }

  // Si tiene 12 o 13 dígitos, suele ser porque incluye el '9' o '15' que no se logró limpiar
  // o es un número con el prefijo '0' y '15' (ej: 0-11-15-xxxx-xxxx).
  // Es mejor usar una RegEx que capture todos los patrones.

  const fullRegex =
    /^(?:(?:0|\+?54)?\s*)?(?:9\s*)?(?:\d{2,4}\s*)?(?:15\s*)?\d{6,8}$/gm;

  // Intentamos la validación con la RegEx completa sobre el input original (cleanedPhone)
  if (fullRegex.test(cleanedPhone)) {
    return true;
  }

  // Falla la validación si no cumple con la longitud ni la RegEx
  return false;
}

// Ejemplo de uso:
// const input = document.getElementById('telefono');
// const numTel = input.value;
// if (validarNumeroTelefono(numTel)) {
//     console.log("Número válido");
// } else {
//     console.log("Número inválido");
// }
