import { FastifyInstance } from "fastify";

export async function start(app: FastifyInstance): Promise<void> {
	return new Promise((resolve, reject) => {
		const env = process.env;

		// Start Listening
		app.listen(
			parseInt(env.SERVICE_PORT) || 3000,
			env.SERVICE_HOST,
			err => {
				if (err) {
					return reject(err);
				}
				return resolve();
			},
		);
	});
}
