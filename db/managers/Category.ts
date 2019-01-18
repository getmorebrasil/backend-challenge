import {BasicManager} from "./BasicManager";
import {Model} from "../model/Category";

export class Category extends BasicManager {

    wireCustomListeners () {
    }

    get model(): {Model} {
        return Model;
    }

    get eventName(): string {
        return 'category';
    }

}

