import env from "./dotenv";
import mongoose from "mongoose";

import { MongoMemoryServer } from "mongodb-memory-server";

class MongooseMock {
	mongoServer: MongoMemoryServer;

	async mock(mockMongoose = true): Promise<void> {
		// Check if already mocked
		if (this.mongoServer) {
			return;
		}
		// Create Server
		this.mongoServer = new MongoMemoryServer({
			instance: {
				ip: env.MONGODB_SERVER_IP,
				port: parseInt(env.MONGODB_SERVER_PORT),
			},
		});
		// Mock Mongoose
		if (mockMongoose) await this.mockMongoose();
	}

	private async mockMongoose(): Promise<void> {
		const uri = await this.mongoServer.getUri(env.MONGODB_INIT_DB);
		// Connect to Mongo (on memory)
		await mongoose.connect(uri, {
			useCreateIndex: true,
			useFindAndModify: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	}
}

export default new MongooseMock();
