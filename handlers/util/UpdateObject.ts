export class UpdateObject {
    private _query: Object;
    private _update: Object;
    private _options: Object;
    private _id: any;

    constructor(query: string | Object, update: Object, options?: Object) {
        this.query = query;
        this.update = update;
        this.options = options;
    };


    get query(): Object {
        return this._query;
    }

    set query(value: Object) {
        if(typeof value === "string")
            this.id = value;
        else
            this._query = value;
    }

    get update(): Object {
        return this._update;
    }

    set update(value: Object) {
        this._update = {$set: value};

        if(value.hasOwnProperty("$inc") || value.hasOwnProperty("$addToSet") || value.hasOwnProperty("$pull") || value.hasOwnProperty("$push") || value.hasOwnProperty("$set") || value.hasOwnProperty("$unset"))
            this._update = value;
    }

    get options(): Object {
        return this._options;
    }

    set options(value: Object) {
        this._options = value;
    }

    get id(): any {
        return this._id;
    }

    set id(value: any) {
        this._id = value;
    }
}