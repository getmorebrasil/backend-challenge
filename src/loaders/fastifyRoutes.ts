import { FastifyInstance } from "fastify";
import routes from "../routes";

export async function start(app: FastifyInstance): Promise<void> {
    routes.forEach(route => {
        app.route({
            url: route.url,
            method: route.method,
            handler: route.handler,
            attachValidation: true,
        });
    });
}
