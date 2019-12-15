import { Router } from "express";
import Categories from "./app/controllers/Categories";

const routes = new Router();

routes.post("/categories", Categories.postCategory);


export default routes;