import {ManagerMap} from "../interfaces";
import {
    Category
} from "./managers/Category";

// inicia managers
let managers: ManagerMap = {
    "category": new Category()
};

export {managers};