import mongoose, { Schema, Document } from "mongoose";

export interface Category extends Document {
	id: number;
	name: string;
	childrenIds: number[];
}

const CategorySchema: Schema = new Schema({
	id: { type: Number, required: true, unique: true, index: true },
	name: { type: String, required: true },
	childrenIds: { type: [Number], required: true },
});

export default mongoose.model<Category>("Category", CategorySchema);
