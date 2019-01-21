import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from 'path';
import * as http from 'http';
import * as cors from 'cors';
import {Router} from 'express';
import {Source} from "./events/Source";
import {Database} from "./db/Database";
import {InitRest} from "./rest";

export class Application extends Source {

    private database: Database;
    private config: any;
    private http: any;
    private readonly app: any;

    constructor(pathConfig: string) {
        super();
        this.config = require(pathConfig);
        this.app = express();
        this.http = http.createServer(this.app);
        let router = Router();
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json({limit: '50mb'}));
        this.app.use(cors());

        this.http.listen(this.config.server.port, () => {
            this.hub.on('error.**', () => console.error('Hub error'));
        });

        this.hub.on('database.ready', () => new InitRest(router));

        this.hub.on('rest.ready', () => {
            this.app.use('/api', router);
            console.log(`Server rodando na porta ${this.config.server.port} \n`);
            this.hub.send(this, 'app.ready', {success: null, error: null});
        });

        this.database = new Database(this.config.db);
    }

    async destroy() {
        return await this.database.destroy();
    }


}