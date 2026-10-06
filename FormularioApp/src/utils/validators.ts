export function validarNombreProducto(nombre: string): boolean {
  return nombre.trim().length >= 3;
}

export function validarCategoria(categoria: string): boolean {
  return categoria.trim().length >= 2;
}

export function validarPrecio(precio: string): boolean {
  const valor = Number(precio.replace(',', '.'));
  return precio.trim() !== '' && Number.isFinite(valor) && valor > 0;
}

export function validarStock(stock: string): boolean {
  return /^\d+$/.test(stock.trim());
}
