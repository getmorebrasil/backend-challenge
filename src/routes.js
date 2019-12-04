import { Router } from "express";
import Categories from "./app/controllers/Categories";

const routes = new Router();

routes.post("/categories/masculino", Categories.masculino);
routes.post("/categories/feminino", Categories.feminino);
routes.post("/categories/modamasc", Categories.modaMasculina);
routes.post("/categories/modafem", Categories.modaFeminina);
routes.post("/categories", Categories.moda);

routes.get("/categories", Categories.getCategories)

export default routes;