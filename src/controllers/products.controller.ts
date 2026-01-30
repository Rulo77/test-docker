import { Request, Response } from "express";
import { actualizarProducto, crearProducto, eliminarProducto, obtenerProductoPorId, obtenerProductos } from "../services/product.service";


export function crearProductoController(req:Request, res: Response) {
    const {nombre, precio, stock} = req.body;
    console.log("creando producto")
    const nuevoProducto = crearProducto(nombre,precio,stock);
    return res.json({
        error: false,
        data: nuevoProducto,
        mensaje: "producto creado correctamente"
    });
}

/**
 * Obtiene todos los productos almacenados.
 */
export function obtenerProductosController(req: Request, res: Response){
    console.log("obteniendo todos los productos")
    return res.json({
        error: false,
        data: obtenerProductos(),
        mensaje: "productos obtenidos correctamente"
    });
}

/**
 * Busca un producto por su ID.
 */
export function obtenerProductoPorIdController(req: Request, res: Response) {
    const id = +req.params.id;
    return res.json({
        error: false,
        data: obtenerProductoPorId(id),
        mensaje: "producto obtenido correctamente"
    });
}

/**
 * Actualiza los datos de un producto existente.
 */
export function actualizarProductoController(req: Request, res: Response){
    const id = +req.params.id;
    const product = actualizarProducto(id, req.body);
    return res.json({
        error: false,
        data: product,
        mensaje: "producto actualizado correctamente"
    });
}

/**
 * Elimina un producto del arreglo por su ID.
 */
export function eliminarProductoController(req: Request, res: Response) {
    const id = +req.params.id;
    console.log(`eliminando productos con el id ${id}`)
    eliminarProducto(id);
    return res.json({
        error: false,
        data: [],
        mensaje: "producto eliminado correctamente"
    });
}