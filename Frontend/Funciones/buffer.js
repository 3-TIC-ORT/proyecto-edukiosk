// Funcion para el buffer

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(",")[1]; // remove "data:image/png;base64,"
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}