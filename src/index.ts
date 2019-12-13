import dotenv from "dotenv";

import * as loaders from "./loaders";

// Require env variables
dotenv.config();
// Start Fastify with configs
loaders.start().catch(err => console.log(err));
