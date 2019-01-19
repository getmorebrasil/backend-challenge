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

    wiring() {
        for (let route in this.routes) {
            if (this.routes.hasOwnProperty(route) && this.routes[route])
                this[`wiring${route}`](this.routes[route]);
        }
    }

}