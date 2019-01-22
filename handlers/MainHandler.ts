import {BasicHandler} from "./util/BasicHandler";
import {QueryObject} from "./util/QueryObject";

export class MainHandler extends BasicHandler{

    async getCategoriesByCode (req) {
        let queryObj = new QueryObject(req.params, 'treeHeight');
        let treeHeight = await this.emitToServer('db.category.read', queryObj);
        if (treeHeight.data.success.length < 1)
            return this.handlReturn('category', 'nonexistent', MainHandler.ERROR(treeHeight.data));
        treeHeight = treeHeight.data.success[0].treeHeight;

        let populate = this.setNestedPopulate(treeHeight);
        queryObj = new QueryObject(req.params, 'code name childrendIds childrenCodes', populate);
        let ret = await this.emitToServer('db.category.read', queryObj);
        return this.handlReturn('category', 'errorReturn', ret.data);
    }

    async getCategories() {
        let queryObj = new QueryObject({root: true}, 'childrenCodes childrenIds code name treeHeight');
        queryObj.populate = this.setNestedPopulate(3);
        let ret = await this.emitToServer('db.category.read', queryObj);

        return this.handlReturn('category', 'errorReturn', ret.data);
    }

    private setNestedPopulate(treeHeight: number) {
        let populate:{path: string, select: string, populate: any} =
            {path: 'childrenIds', select: 'childrenCodes code childrenIds name', populate: ''};
        for(let i = 0; i < treeHeight; i++) {
            let pop = {path: 'childrenIds', select: 'childrenCodes code childrenIds name',
                populate: {path: 'childrenIds', select: 'childrenCodes code childrenIds name', populate: ''}};
            populate['populate'] = pop;
        }
        return populate;
    }

    async createCategory(req) {
        if (req.body.hasOwnProperty('childrenCodes')) {
            let children = await this.checkChildrenCodes(req.body);
            if (!children.exists)
                return this.handlReturn('category', 'nonexistentChildren', MainHandler.ERROR(req.body));
            req.body.treeHeight = children.treeHeight + 1;
        }
        let ret = await this.emitToServer('db.category.create', req.body);
        return this.handlReturn('category', 'errorReturn', ret.data);
    }

    private async checkChildrenCodes(category: any) {
        let promises = [];
        for (let code in category.childrenCodes) {
            promises.push(await this.emitToServer('db.category.read',
                new QueryObject({code: category.childrenCodes[code]}, 'name code treeHeight')));
        }
        await Promise.all(promises);

        let children = {exists: true, treeHeight: 1};
        let prom = 0;
        while (children.exists && prom < promises.length) {
            children.exists = promises[prom++].data.success.length == 0 ? false : true;
        }

        children.treeHeight = promises[--prom].data.success.length == 0 ? 1
            : promises[prom].data.success[0].treeHeight;
        return children;
    }
}