import * as BBPromise from "bluebird";
import {Source} from "../../events/Source";
import {MainHandler} from "../MainHandler";
import {Util} from "./Util";

interface dataReturn {
    success: boolean,
    error?: object,
    data?: object
}

export class BasicHandler extends Source {

    protected emitToServer(event, data): BBPromise<any> {
        return this.hub.send(this, event, {success: data, error: null}).promise;
    }

    async handlReturn(model: string, errorType: string,data: any) {
        if (data.error || !data.success) {
            if(data.error.name && data.error.name == 'MongoError')
                errorType = `mongoCode${data.error.code}`;
            let err = data.error.errors ? await Util.getDbErrors(model, data.error.errors) :
                await Util.getErrorByLocale(model, errorType);

            return MainHandler.ERROR(err);
        } else {
            return MainHandler.SUCCESS(data);
        }
    }

    static ERROR(data): dataReturn{
        return {
            success: false,
            error: data,
        };
    }

    static SUCCESS(data):dataReturn {
        return {
            success: true,
            data: data.success,
        }
    }
}