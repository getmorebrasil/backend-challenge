import {Hub} from './Hub';
const v4 = require ("uuidv/v4");
// import uuidv from "uuidv/v4";

export class Source {

    private _id: string;
    private _hub: Hub;

    constructor() {
        this._id = v4();
        this._hub = Hub.getInstance();
    }


    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get hub(): Hub {
        return this._hub;
    }

    set hub(value: Hub) {
        this._hub = value;
    }

}