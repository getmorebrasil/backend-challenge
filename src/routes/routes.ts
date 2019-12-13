import controllers from "../controllers";
import { RouteOptions } from "fastify";

// Routes
const routes: RouteOptions[] = [
    {
        method: "POST",
        url: "/categories",
        handler: controllers.Categories.routeCategoriesPost,
        schema: {
            body: {
                type: "object",
                required: ["id", "name", "childrenIds"],
                properties: {
                    id: { type: "number" },
                    name: { type: "string" },
                    childrenIds: {
                        type: "array",
                        uniqueItems: true,
                        items: { type: "number" },
                    },
                },
            },
        },
    },
];

export default routes;
