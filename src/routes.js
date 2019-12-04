import { Router } from "express";
import Categories from "./app/controllers/Categories";


const routes = new Router();


routes.post("/categories/moda/masc", Categories.masculino);
routes.post("/categories/moda/fem", Categories.feminino);
routes.post("/categories/moda", Categories.moda);
routes.post("/categories", Categories.category);

export default routes;
