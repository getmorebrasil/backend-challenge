import { Router } from "express";
import Categories from './app/models/Category'
import CategoryController from "./app/controllers/CategoryController";






const routes = new Router();

routes.post('/category/masculino', CategoryController.masc)
routes.post('/category/feminino', CategoryController.fem)
routes.post('/category/modamasc', CategoryController.modamasc)
routes.post('/category/modafem', CategoryController.modafem)
routes.post('/category/moda', CategoryController.moda)



export default routes;