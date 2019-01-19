import {BasicRest} from "./BasicRest";


export class MainRest extends BasicRest{

    constructor(router) {
        super(router);

        this.routes = {
            get: {
                "/categories": this.getCategories.bind(this),
                "/categories/:id": this.getCategoriesById.bind(this),
            },
            post: {
                "/categories": this.createCategory.bind(this),
            }
        };
        this.wiring();
    }

    async createCategory(req: Request, res: any) {
        //todo implementar funcao de ligar Rest ao handler
    }

    async getCategories(req: Request, res: any) {
        //todo implementar funcao de ligar Rest ao handler
    }

    async getCategoriesById(req: Request, res: any) {
        //todo implementar funcao de ligar Rest ao handler
    }


}