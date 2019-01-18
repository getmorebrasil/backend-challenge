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
        unique: true,
        required: [true, 'name.REQUIRED']
    },

    childrenIds: {
        type: [Number],
    }
}, BasicSchema), schemaOptions);

let CategoryModel = model('category', Category);
export {CategoryModel as Model};