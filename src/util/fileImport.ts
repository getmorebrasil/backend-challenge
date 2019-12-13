import { readFileSync } from "fs";
import { resolve } from "path";
export function importBinaryFile(...paths: string[]): Buffer {
    return readFileSync(resolve(...paths));
}
