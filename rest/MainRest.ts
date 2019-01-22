import {BasicRest} from "./BasicRest";
import {MainHandler} from "../handlers/MainHandler";

const HTTPStatus = require('http-status-codes');


export class MainRest extends BasicRest{

    private _handler: MainHandler;

    constructor(router) {
        super(router);
        this.handler = new MainHandler();

        this.routes = {
            get: {
                "/categories": this.getCategories.bind(this),
                "/categories/:code": this.getCategoriesByCode.bind(this),
            },
            post: {
                "/categories": this.createCategory.bind(this),
            }
        };
        this.wiring();
    }

    set handler(value: MainHandler) {
        this._handler = value;
    }

    get handler() :MainHandler {
        return this._handler;
    }

    async createCategory(req: Request, res: any) {
        let ret = await this.handler.createCategory(req);

        if(ret.error)
            return res.status(HTTPStatus.BAD_REQUEST).send(ret)
        return res.status(HTTPStatus.CREATED).send(ret);
    }

    async getCategories(req: Request, res: any) {
        let ret = await this.handler.getCategories(req);
        if (ret.error)
            return res.status(HTTPStatus.BAD_REQUEST).send(ret);
        return res.status(HTTPStatus.OK).send(ret.data);
    }

    async getCategoriesByCode(req: Request, res: any) {
        let ret = await this.handler.getCategoriesByCode(req);
        if(ret.error)
            return res.status(HTTPStatus.BAD_REQUEST).send(ret);
        else
            return res.status(HTTPStatus.OK).send(ret.data);
    }


}