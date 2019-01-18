import {BasicRest} from "./BasicRest";


export class MainRest extends BasicRest{

    constructor(router) {
        super(router);

        this.routes = {
            get: {
                "/rota": this.function.bind(this),
            },
            post: {
                "/rota": this.function.bind(this),
            }
        };
        this.wiring();
    }


}