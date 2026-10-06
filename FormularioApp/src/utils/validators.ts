export function validarNombre(nombre: string) {
  return nombre.trim() !== '';
}

export function validarCorreo(correo: string) {
  return correo.includes('@');
}

export function validarEdad(edad: string) {
  const numero = Number(edad);

  return numero >= 18;
}