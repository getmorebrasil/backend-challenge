import { Router } from "express";
import Masculino from './app/models/Category'
import CategoryController from "./app/controllers/CategoryController";






const routes = new Router();

routes.post('/masculino', CategoryController.masc)


export default routes;