import { Router, Request, Response } from "express";
import routesCategory from "./routes-category";

const routes = Router();

routes.use("/categories", routesCategory);

export default routes;
