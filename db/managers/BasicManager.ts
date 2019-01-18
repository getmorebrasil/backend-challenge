import {Source} from "../../events/Source";
import {Types, Model} from "mongoose";
import {error} from "util";

export abstract class BasicManager extends Source {

    abstract wireCustomListeners();

    abstract get model(): any;

    abstract get eventName(): string;

    constructor() {
        super();
        this.wiring();
    }

    wiring() {
        this.hub.on(`db${this.eventName}.read`, this.handleRead.bind(this));
        this.hub.on(`db${this.eventName}.count`, this.handleCount.bind(this));
        this.hub.on(`db${this.eventName}.create`, this.handleCreate.bind(this));
        this.hub.on(`db${this.eventName}.update`, this.handleUpdate.bind(this));
        this.hub.on(`db${this.eventName}.delete`, this.handleDelete.bind(this));
        this.hub.on(`db${this.eventName}.exists`, this.handleExists.bind(this));
        this.hub.on(`db${this.eventName}.aggregate`, this.handleAggregate.bind(this));

        this.wireCustomListeners();
    }

    answer(idMessage, event, success, error) {
        let data = {
            success: succes,
            error: error
        };

        this.hub.send(this, `db${this.eventName}.${event}`, data, idMessage);
    }

    async handleRead(msg) {
        if (msg.sourceId === this.id) return;

        this.read(msg.data.success).then((ret) => {
           this.answer(msg.id, 'read', ret, null);
        }).catch((err) => {
            this.answer(msg.id, 'read', null, error);
        });
    }

    async read(data) {
        let result: any = [];
        let limit = data.limit || 25;
        let page = data.page || 1;
        let select = data.select ? 'id ' + data.select : '';
        let populate = data.populate || '';
        let collation = data.collation || {locale: 'pt', strength: 2};
        let sort = data.sort || {};

        if (data.id && !data.query) {
            let ret = await this.model
                .findById(data._id)
                .select(select)
                .populate(populate)
                .lean()
                .exec();
            if (ret) return ret;
        } else {
            let readQuery = await BasicManager.beforeRead(data.query);
            let query = this.model
                .find(readQuery)
                .collation(collation)
                .sort(sort)
                .limit(limit)
                .select(select)
                .populate(populate)
                .skip(limit * (page - 1))
                .lean();
            result = await query.exec();
        }

        return await BasicManager.afterRead(result);
    }

    static async beforeRead(data) {
        return data;
    }

    static async afterRead(data) {
        if (Array.isArray(data)) {
            for (let i = 0; i < data.length; ++i) {
                delete data[i]._id;
            }
        } else {
            delete data._id;
        }
        return data;
    }

    async handleCount(msg): Promise<void> {
        if (msg.sourceId === this.id) return;
        let data = msg.data.success;

        let count = await this.model.count(data);
        this.answer(msg.id, "count", count, null);
    }

    async count(query): Promise<number> {
        return await this.model.count(query).exec();
    }

    handleCreate(msg) {
        if (msg.sourceId === this.id) return;

        this.create(msg.data.success).then((ret) => {
            this.answer(msg.id, "create", ret, null);
        }).catch((error) => {
            console.error(error);
            this.answer(msg.id, "create", null, error);
        });
    }

    async create(data) {
        let dataArray: any[] = await BasicManager.beforeCreate(data);
        let ret: any = await this.model.create(dataArray);
        return await BasicManager.afterCreate(ret ? Array.isArray(ret) ? ret : [ret] : []);
    }

    static async beforeCreate(data) {
        if (Array.isArray(data)) {
            for (let i = 0; i < data.length; ++i) {
                data[i]._id = data[i]._id ? new Types.ObjectId(data[i]._id) : new Types.ObjectId();
                data[i].id = data[i]._id.toString();
            }
        } else {
            data._id = data._id ? new Types.ObjectId(data._id) : new Types.ObjectId();
            data.id = data._id.toString();
        }

        return data;
    }

    static async afterCreate(data: any[]) {
        for (let i = 0; i < data.length; i++) {
            data[i] = data[i].toJSON();
        }

        return data;
    }

    async handleUpdate(msg) {
        if (msg.sourceId === this.id) return;

        this.update(msg.data.success).then((ret) => {
            this.answer(msg.id, "update", ret, null);
        }).catch((error) => {
            this.answer(msg.id, "update", null, error);
        });
    }

    async update(data) {
        let result = null;
        let options = data.options || {
            new: true,
            runValidators: true,
            select: {
                createdAt: 0,
                updatedAt: 0,
            }
        };
        let datas = await BasicManager.beforeUpdate(data);
        if (data._id && !datas.hasOwnProperty("query")) {
            result = [
                await this.model
                    .findByIdAndUpdate(datas._id, datas.update, options)
                    .populate(options.populate || {path: ''})
            ];
        } else {
            result = await this.model.update(datas.query, datas.update, options);
        }

        return await BasicManager.afterUpdate(result);
    }

    static async beforeUpdate(data) {
        return data;
    }

    static async afterUpdate(data) {
        for (let i = 0; i < data.length; i++) {
            data[i] = data[i].toJSON();
        }

        return data;
    }

    handleDelete(msg) {
        if (msg.sourceId === this.id) return;

        this.delete(msg.data.success).then((ret) => {
            this.answer(msg.id, "delete", ret, null);
        }).catch((error) => {
            this.answer(msg.id, "delete", null, error);
        });
    }

    async delete(data) {
        let result = null;

        if (data._id) {
            result = await this.model.findByIdAndRemove(data._id);
        } else {
            let datas = await BasicManager.beforeDelete(data);
            result = await this.model.remove(datas);
        }

        return await BasicManager.afterDelete(result);
    }

    static async beforeDelete(data) {
        return data;
    }

    static async afterDelete(result) {
        return result;
    }

    async handleExists(msg): Promise<void> {
        if (msg.sourceId === this.id) return;

        let query = msg.getData().success;
        let exists = await this.exists(query);

        this.answer(msg.id, "exists", exists, null);
    }

    async exists(query): Promise<boolean> {
        let count = await this.count(query);
        return count > 0;
    }

    handleAggregate(msg) {
        if (msg.sourceId === this.id) return;
        this.aggregate(msg.data.success)
            .then(ret => {
                this.answer(msg.id, 'aggregate', ret, null);
            })
            .catch(err => {
                this.answer(msg.id, 'aggregate', null, err);
            })
    }

    async aggregate(data) {
        const aggregate = await this.model.aggregate(data).cursor({}).exec();
        return await aggregate.cursor.toArray();
    }

}
