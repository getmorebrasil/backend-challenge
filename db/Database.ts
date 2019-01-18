import {Mongoose} from "mongoose";
import {Source} from "../events/Source";
import {ManagerMap} from "../interfaces/ManagerMap";
import * as mongoose from "mongoose";

export class Database extends Source {

    private mongoose: Mongoose;
    private managers: ManagerMap;

    constructor(config) {
        super();
        this.mongoose = mongoose;
        this.mongoose.Promise = Promise;
        this.managers = managers;

        this.mongoose.connection.on('error', (err, val) => console.log('error', err, val));

        this.hub.on('db.getManager', this.getManager.bind(this))ç
        this.init(config.mongodb);
    }

    private async init(config) {

    }
}