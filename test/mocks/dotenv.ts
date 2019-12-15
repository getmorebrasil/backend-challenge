import dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(".env.test") });
const env = process.env;

export default env;
