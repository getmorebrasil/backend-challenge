import * as BBPromise from "bluebird";
import {Source} from "../../events/Source";

export class BasicHandler extends Source {

    protected emitToServer(event, data): BBPromise<any> {
        return this.hub.send(this, event, {success: data, error: null}).promise;
    }

    async handlReturn(data: any) {
        //todo handleError
        return {
            success: true,
            data: data.success
        }
    }
}