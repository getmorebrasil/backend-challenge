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
		attachValidation: true,
	},

	{
		method: "GET",
		url: "/categories",
		handler: controllers.Categories.routeCategoriesGetAll,
		schema: {
			querystring: {
				type: "object",
				properties: {
					offset: {
						type: "number",
					},
					limit: { type: "number" },
				},
			},
		},
		attachValidation: true,
	},

	{
		method: "GET",
		url: "/categories/:id",
		handler: controllers.Categories.routeCategoriesGetById,
		schema: {
			params: {
				type: "object",
				id: { type: "number" },
			},
		},
		attachValidation: true,
	},
];

export default routes;
