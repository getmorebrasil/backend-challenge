import * as fastifyApp from "./fastifyApp";
import * as fastifyPlugins from "./fastifyPlugins";
import * as fastifyListen from "./fastifyListen";
import * as fastifyRoutes from "./fastifyRoutes";
import * as mongoApp from "./mongoApp";
import { FastifyInstance } from "fastify";

export async function start(): Promise<FastifyInstance> {
	const app = await fastifyApp.start();

	// Configure MongoDB Connection
	await mongoApp.start();

	// Configure Fastify
	await fastifyPlugins.start(app);

	await fastifyRoutes.start(app);

	await fastifyListen.start(app);

	app.log.info("\nRoutes: \n" + app.printRoutes());

	return app;
}
