import { Router } from "express";
import { actualizarProductoController, crearProductoController, eliminarProductoController, obtenerProductoPorIdController, obtenerProductosController } from "../controllers/products.controller";


const routes = Router();

routes.get('/', obtenerProductosController);
routes.post('/', crearProductoController);
routes.get('/:id', obtenerProductoPorIdController);
routes.put('/:id', actualizarProductoController);
routes.delete('/:id', eliminarProductoController);

export default routes;