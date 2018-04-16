const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const categorySchema = mongoose.Schema({
	id : {
		type : Number,
		required : true
	},
	name : {
		type : String,
		required : true
	},
	childrenId : {
		type : [Number],
	},
});

categorySchema.plugin(mongoosePaginate);

const Category = module.exports = mongoose.model('Category', categorySchema);