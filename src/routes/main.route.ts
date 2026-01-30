import { Router } from "express";
import { main } from "../controllers/main.controller";

const routes = Router();

routes.get('/', main)

export default routes;