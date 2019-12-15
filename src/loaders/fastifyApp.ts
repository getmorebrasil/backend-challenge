import { importBinaryFile } from "../util/fileImport";
import fastify, { FastifyInstance } from "fastify";

export async function start(): Promise<FastifyInstance> {
	const env = process.env;
	// Configure Log Options
	let loggerOptions = {
		prettyPrint: true,
	};
	if (env.DISABLE_LOGS === "true") loggerOptions = null;
	// Startup Script
	const fastifyOptions: fastify.ServerOptionsAsSecureHttp = {
		https: {
			key: importBinaryFile(__dirname, "../../ssl", "server.key"),
			cert: importBinaryFile(__dirname, "../../ssl", "server.cert"),
		},
		logger: loggerOptions,
	};

	return fastify(fastifyOptions);
}
