import {EventEmitter2} from "eventemitter2";
import {Message} from "./Message";
import {Source} from "./Source";
import * as BBPromise from "bluebird";
import * as path from "path";

export class Hub {
    eventemitter: EventEmitter2;
    private static _instance: Hub;

    private constructor() {
        let config = require(path.resolve('config.json'));
        this.eventemitter = new EventEmitter2(config.eventConfig);
    }

    public static getInstance() {
        if (!Hub._instance)
            Hub._instance = new Hub();
        return Hub._instance;
    }

    public on (event: string, listener: Function): Hub {
        this.eventemitter.on(event, listener);
        return this;
    }

    public once(event: string, listener: Function) {
        this.eventemitter.once(event, listener);
        return this;
    }

    public un(event: string, listener: Function) {
        this.eventemitter.off(event, listener);
        return this;
    }

    public send(source: Source, event: string, data: any, previous?: string) {
        if(!source || (typeof source !== 'object' && !(source instanceof Source))) {
            throw new Error("Para enviar uma mensagem, precisa identificar uma Source de um tipo Source");
        }

        let msg = new Message(source.id, event, data, previous);
        process.nextTick(() => {
            try {
                this.eventemitter.emit(event, msg);
            } catch (err) {
                console.error("HUB destruido nao recebe dados", event, source, err);
            }
        });

        return msg;
    }

    public destroy(): BBPromise<boolean> {
        return new BBPromise<boolean>( (resolve) => {
            Hub._instance = null;
            this.eventemitter.removeAllListeners();
            this.eventemitter = null;
            resolve(true);
        });
    }

}