export abstract class BasicRest {

    private _router: any;
    private _routes: any;

    constructor(router){
        this.router = router;
    }

    set router(router) {
        if (!router) throw new Error("Tem que ter um router!");
        this._router = router;
    }

    get router() {
        return this._router;
    }

    get routes() {
        return this._routes;
    }

    set routes(value) {
        this._routes = value;
    }

    wiringget(routes) {
        for(let route in routes) {
            if (routes.hasOwnProperty(route))
                this.router.route(route).get(routes[route]);
        }
    }

    wiringpost(routes) {
        for (let route in routes) {
            if(routes.hasOwnProperty(route))
                this.router.route(route).post(routes[route]);
        }
    }

    wiring() {
        for (let route in this.routes) {
            if (this.routes.hasOwnProperty(route) && this.routes[route]) {
                let method = 'wiring' + route;
                this[method](this.routes[route]);
            }
        }
    }

}