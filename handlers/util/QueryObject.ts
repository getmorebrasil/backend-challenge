export class QueryObject {
    private _query: Object;
    private _limit: number;
    private _select: string;
    private _populate: Object;
    private _collation: Object;
    private _sort: Object;
    private _page: number;
    private _id: string;

    constructor(query?: Object, select?: string, populate?: Object, sort?: Object, collation?: Object, limit?: number, page?: number) {
        this.query = query;
        this.select = select;
        this.populate = populate || "";
        this.limit = limit || 25;
        this.page = page || 1;
        this.collation = collation || {locale: 'pt', strength: 2};
        this.sort = sort || {};
    }


    get query(): Object {
        return this._query;
    }

    set query(value: Object) {
        this._query = value;
    }

    get limit(): number {
        return this._limit;
    }

    set limit(value: number) {
        this._limit = value;
    }

    get select(): string {
        return this._select;
    }

    set select(value: string) {
        this._select = value;
    }

    get populate(): Object {
        return this._populate;
    }

    set populate(value: Object) {
        this._populate = this.handlePopulate(value);
    }

    get collation(): Object {
        return this._collation;
    }

    set collation(value: Object) {
        this._collation = value;
    }

    get sort(): Object {
        return this._sort;
    }

    set sort(value: Object) {
        this._sort = value;
    }

    get page(): number {
        return this._page;
    }

    set page(value: number) {
        this._page = value;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    private handlePopulate(value_: any) {
        if (value_.hasOwnProperty('select')) value_.select = 'id ' + value_.select;
        if(value_.hasOwnProperty('populate')) value_.populate = this.handlePopulate(value_.populate);

        return value_;
    }
}
