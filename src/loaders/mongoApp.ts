/* eslint-disable indent */
import mongoose from "mongoose";

export async function start(): Promise<void> {
	// Get env
	const env = process.env;
	// Connect to MongoDB
	const uri = `mongodb://${env.MONGODB_SERVER_IP}:${env.MONGODB_SERVER_PORT}`;

	// Mount Login Info
	let authLogin = null;
	if (env.MONGODB_ROOT_PSWD && env.MONGODB_ROOT_USER) {
		authLogin = {
			user: env.MONGODB_ROOT_USER,
			password: env.MONGODB_ROOT_PSWD,
		};
	}

	await mongoose.connect(uri, {
		// Login Config
		auth: authLogin,
		dbName: env.MONGODB_INIT_DB,
		// DB Specific Config
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: true,
		useCreateIndex: true,
		family: 4,
	});
}
