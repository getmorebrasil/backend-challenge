import {Schema} from "mongoose";

let schema = {
    id: {
        type: Schema.Types.String,
        required: true,
        trim: true
    }
};

export {schema as BasicSchema};