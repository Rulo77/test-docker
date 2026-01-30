// interface.ts
export interface Producto {
    id: number;
    nombre: string;
    precio: number;
    stock: number;
}


// Almacén en memoria
const productos: Producto[] = [];
let idActual: number = 1;

/**
 * Crea un nuevo producto y lo añade al arreglo.
 */
export function crearProducto(nombre: string, precio: number, stock: number): Producto {
    const nuevoProducto: Producto = {
        id: idActual++,
        nombre,
        precio,
        stock
    };
    productos.push(nuevoProducto);
    return nuevoProducto;
}

/**
 * Obtiene todos los productos almacenados.
 */
export function obtenerProductos(): Producto[] {
    return productos;
}

/**
 * Busca un producto por su ID.
 */
export function obtenerProductoPorId(id: number): Producto | undefined {
    return productos.find(function (p) {
        return p.id === id;
    });
}

/**
 * Actualiza los datos de un producto existente.
 */
export function actualizarProducto(id: number, datos: Partial<Omit<Producto, 'id'>>): Producto | null {
    const indice = productos.findIndex(function (p) {
        return p.id === id;
    });

    if (indice === -1) return null;

    productos[indice] = { ...productos[indice], ...datos };
    return productos[indice];
}

/**
 * Elimina un producto del arreglo por su ID.
 */
export function eliminarProducto(id: number): boolean {
    const indice = productos.findIndex(function (p) {
        return p.id === id;
    });

    if (indice === -1) return false;

    productos.splice(indice, 1);
    return true;
}