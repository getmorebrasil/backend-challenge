import {model, Schema} from "mongoose";
import {BasicSchema} from "./BasicSchema";

let schemaOptions = {
    timestamp: true,
    toObject: {
        virtuals: true,
        transform: (doc, ret) => {
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    },
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
    // http:/mongoosejs.com/docs/guide.html#options
};

let Category = new Schema(Object.assign({
    name: {
        type: Schema.Types.String,
        trim: true,
        required: [true, 'name.REQUIRED']
    },

    code: {
        type: Schema.Types.Number,
        unique: true,
        required: [true, 'code.REQUIRED']
    },

    childrenCodes: {
        type: [Number],
        default: []
    },

    childrenIds: {
        type: [Schema.Types.ObjectId],
        default: []
    }

    //TODO adicionar caminho reverso (id da categoria pai) ?
}, BasicSchema), schemaOptions);

let CategoryModel = model('category', Category);
export {CategoryModel as Model};