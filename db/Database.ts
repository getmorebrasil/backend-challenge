import * as fs from "fs";
import * as path from 'path';
import {managers} from "./index";
import {Mongoose} from "mongoose";
import * as mongoose from "mongoose";
import {Source} from "../events/Source";
import {ManagerMap} from "../interfaces/ManagerMap";


export class Database extends Source {

    private mongoose: Mongoose;
    private managers: ManagerMap;

    constructor(config) {
        super();
        this.mongoose = mongoose;
        this.mongoose.Promise = Promise;
        this.managers = managers;

        this.mongoose.connection.on('error', (err, val) => console.log('error', err, val));

        this.hub.on('db.getManager', this.getManager.bind(this));
        this.init(config.mongodb);
    }

    private async init(config) {
        try {
            await this.mongoose.connect(`mongodb://${config.host}/${config.name}`);
            if (config.eraseDb)
                await this.databasePopulate();
            this.hub.send(this, 'database.ready', {success: true, error: false});
        } catch (err) {
            console.error(err);
            process.exit(1)
        }
    }

    async databasePopulate() {
        await this.mongoose.connection.db.dropDatabase();
        let dirPath = path.resolve('test/fixtures');
        let files = fs.readdirSync(dirPath);
        let promises = [];
        while(files.length > 0) {
            let file = require(path.join(dirPath,files.shift()));
            promises.push(this.hub.send(this, `db.${file.model}.create`, {
                succes: file.data,
                error: null
            }).promise);
        }

        await Promise.all(promises);
        promises = [];
        for (let idx in this.managers) {
            if (this.managers.hasOwnProperty(idx)) {
                promises.push(this.managers[idx].model.ensureIndexes());
            }
        }

        await Promise.all(promises);
    }

    async destroy() {
        try {
            await this.mongoose.connection.close();
        } catch (err) {
            console.error(err);
            process.exit(1);
        }
    }

    getManager(msg) {
        if (msg.source === this.id) return;

        let manager = msg.data.success;
        this.hub.send(this, 'db.getManagers', this.managers[manager], msg.id);
    }

}