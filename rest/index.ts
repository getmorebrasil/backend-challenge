import {Source} from "../events/Source";
import {MainRest} from "./MainRest";

const RestsObject = {
    main: MainRest
};

export class InitRest extends Source {
    private _rests: object;

    constructor(router) {
        super();
        this.rests = RestsObject;

        for (let rest in this.rests) {
            if (this.rests.hasOwnProperty(rest))
                new this.rests[rest](router);
        }

        process.nextTick(() => {
            this.hub.send(this, `rest.ready`, {success: null, error: null});
        });
    }

    set rests (value: object) {
        this._rests = value;
    }


    get rests(): object {
        return this._rests;
    }
}