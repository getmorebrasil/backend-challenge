import { Router } from "express";
import Categories from './app/models/Category';
import CategoryController from "./app/controllers/CategoryController";
import getInstancesMiddleware from './app/controllers/getCategories';

const routes = new Router();

routes.post('/category/masculino', CategoryController.masc);
routes.post('/category/feminino', CategoryController.fem);
routes.post('/category/modamasc', CategoryController.modamasc);
routes.post('/category/modafem', CategoryController.modafem);
routes.post('/category/moda', CategoryController.moda);

routes.get('/category', getInstancesMiddleware);
routes.get('/category/:id', getInstancesMiddleware);

export default routes;