import { importBinaryFile } from "../util/fileImport";
import fastify, { FastifyInstance } from "fastify";

export async function start(): Promise<FastifyInstance> {
    // Startup Script
    const fastifyOptions: fastify.ServerOptionsAsSecureHttp = {
        https: {
            key: importBinaryFile(__dirname, "../../ssl", "server.key"),
            cert: importBinaryFile(__dirname, "../../ssl", "server.cert"),
        },
        logger: {
            prettyPrint: true,
        },
    };

    return fastify(fastifyOptions);
}
