import { FastifyInstance } from "fastify";
import fastifyHelmet from "fastify-helmet";

export async function start(app: FastifyInstance): Promise<void> {
	// Import Plugins

	app.register(fastifyHelmet);
}
