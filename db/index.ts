import {ManagerMap} from "../interfaces/ManagerMap";
import {
    Category
} from "./managers/Category";

// inicia managers
let managers: ManagerMap = {
    "category": new Category()
};

export {managers};