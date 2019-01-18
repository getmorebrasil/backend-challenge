import {EventEmitter} from "eventemitter2";
import {Message} from "./Message";
import {Source} from "./Source";
import * as path from "path";

export class Hub {
    eventemitter: EventEmitter2;
    private static _instace: Hub;

    private constructor() {
        let config = require path.resolve(config.json);
        this.eventemitter = new EventEmitter2(config.eventConfig);
    }
}