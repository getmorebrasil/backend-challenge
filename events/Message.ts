import {MessageData} from "../interfaces/MessageData";
import * as BBPromise from "bluebird";
import {Hub} from "./Hub";
const v4 = require ("uuidv/v4");

export class Message {

    private _previousMessage: string;
    private _promise: BBPromise<any>;
    private _sourceId: string;
    private _data: MessageData;
    private _event: string;
    private _id: string;

    constructor(sourceId: string, event: string, data: MessageData, previousMessage?: string) {
        this.id = v4();
        this.data = data;
        this.sourceId = sourceId;
        this.previousMessage = previousMessage;
        this.event = event;
    }

    get promise() {
        if (this._promise) return this._promise;

        let hub = Hub.getInstance();

        let promiseHandler = null;
        this._promise = new BBPromise((resolve) => {
            promiseHandler = (msg) => {
                if (this.id === msg.previousMessage) {
                    hub.un(this.event, promiseHandler);
                    return resolve(msg);
                }
            }
        });

        hub.on(this.event, promiseHandler);
        this.promise.timeout(3000).catch((e) => {
            console.log("error", e);
            hub.un(this.event, promiseHandler);
        });

        return this._promise;
    }

    get previousMessage(): string {
        return this._previousMessage;
    }

    set previousMessage(value: string) {
        this._previousMessage = value;
    }

    get sourceId(): string {
        return this._sourceId;
    }

    set sourceId(value: string) {
        this._sourceId = value;
    }

    get data(): MessageData {
        return this._data;
    }

    set data(value: MessageData) {
        if(!value.hasOwnProperty("success") || !value.hasOwnProperty("error"))
            throw new Error(`Mensagem no formato incorreto.
                                        Esperado: {success: any, error: any}
                                        Recebido: ${JSON.stringify(value)}`);
        this._data = value;
    }

    get event(): string {
        return this._event;
    }

    set event(value: string) {
        this._event = value;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }
}